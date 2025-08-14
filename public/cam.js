window.addEventListener('load', async function() {
    cfgRes = await fetch('/cfg');
    CFG = await cfgRes.json();
    
    document.title = CFG.TITLE;

    id_text = document.getElementById('id');
    video = document.getElementById('video');

    stream = await navigator.mediaDevices.getUserMedia({video: {width: CFG.RESOLUTION, height: CFG.RESOLUTION, frameRate: {ideal: CFG.FPS, max: CFG.FPS}}, audio: false});
    
    video.srcObject = stream;
    video.play();

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    let id = crypto.randomUUID();
    id_text.innerText = CFG.ID_text + id;

    setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(blob => {
            fetch("/upload/" + id, {
                method: "POST",
                headers: {"Content-Type": "image/jpeg"},
                body: blob
            });
        }, "image/jpeg");
    }, 1000 / CFG.FPS);
});