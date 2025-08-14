const fs = require('fs');
const path = require('path');
require('dotenv').config();

const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const CFG = {
    HTTP_PORT: process.env.HTTP_PORT,
    HTTPS_PORT: process.env.HTTPS_PORT,
    FPS: process.env.FPS,
    TITLE: process.env.TITLE,
    RESOLUTION: process.env.RESOLUTION,
    ID_text: process.env.ID_text
};

const http_port = CFG.HTTP_PORT;
const https_port = CFG.HTTPS_PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.raw({type: "image/jpeg", limit: "5mb"}));
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=0; includeSubDomains');
    next();
});

const frames = new Map();

app.get('/cam/:id', (req, res) => {
    let id = req.params.id;
    let interval;

    if(frames.has(id)) {
        res.writeHead(200, {
            "Content-Type": "multipart/x-mixed-replace; boundary=frame",
            "Cache-Control": "no-cache",
            "Connection": "close",
            "Pragma": "no-cache"
        });

        interval = setInterval(() => {
            let frame = frames.get(id);
            if(frame) {
                res.write(`--frame\r\n`);
                res.write(`Content-Type: image/jpeg\r\n\r\n`);
                res.write(frame);
                res.write(`\r\n`);
            } else {
                res.write('--frame\r\n');
                res.write('Content-Type: text/plain\r\n\r\n');
                res.end('404: Stream is stopped\r\n--frame--\r\n');
                return;
            }
        }, 1000 / CFG.FPS);
    } else {
        res.status(404).send('No stream for this id');
    }
});

app.post("/upload/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if(!frames.has(id)) console.log(`start: ${id}`);

    frames.set(id, body);

    let interval = setInterval(() => {
        if(body == frames.get(id)) {
            frames.delete(id);
            console.log(`stop: ${id}`);
        }
        clearInterval(interval);
    }, 5000);

    res.sendStatus(200);
});

app.get("/", (req, res) => {
    res.sendFile('public/cam.html', {root: __dirname});
});

app.get("/cfg", (req, res) => {
    res.send(CFG);
});

const options = {
    key: fs.readFileSync("./ssl/key.pem"),
    cert: fs.readFileSync("./ssl/cert.pem")
};

http.createServer(app).listen(http_port, () => {
    console.log(`GWebcam listening on http port ${http_port}`);
});

https.createServer(options, app).listen(https_port, () => {
    console.log(`GWebcam listening on https port ${https_port}`);
});