# **GWebcam (GWC-server)**

GWebcam addon allows players to stream their webcams to others on the server. This README will guide you through installation, usage, and developer instructions.

---

## 📥 Installation

**Note:**

1. **Local use (localhost)**  
   If you plan to use it locally, you’ll need to connect all players using the GWebcam addon to the same network.  
   This can be done via apps like **Radmin VPN** or **ZeroTier**.  
   Alternatively, you can open the required ports specified in the `".env"` configuration file.

2. **Server use**  
   If you’re a server developer and decide to use the GWebcam addon, you’ll need to host **GWC-server** on your server.  
   All you need to do is run the appropriate executable for your hosting’s operating system.

---

### Main installation

The installation is done via the **Releases** tab. Follow these steps:

1. Download **GWC-server** for your OS.
2. Extract the archive to any folder on your computer.
3. Run the executable file (e.g., `GWC-Server-win.exe`).
4. Install the **GWebcam** addon.
5. From the server console, enter the command:

`gwc_domain "your domain"`


**"your domain"** — the domain or IP address where **GWC-server** is running.

* For local use — `localhost` (`127.0.0.1`) or the IPv4 address from Radmin VPN or similar services.
* For server use — your hosting’s IP address.

**Example:**

`gwc_domain "82.91.149.83"`


From this point, your addon is ready to use.

---

## 🖥 Usage

**GWebcam** provides a convenient UI in the **Utilities** section of the Q-Menu, under the **GWC** category.

The interface has 3 main buttons:

1. **Start stream** — provides a link to start streaming your webcam.  
   *Important:* Open this link in any browser that supports webcam streaming (Steam overlay browser is not supported).
2. **Connect to Stream** — prompts you to enter the ID you get from the webcam streaming page.
3. **Disconnect from Stream** — stops your stream.

---

## 🛠 For developers

If you want to modify **GWC-server** in any way — go ahead!  
Any contributions are welcome.
