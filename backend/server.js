const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { SerialPort } = require("serialport"); // Corrected import
const { ReadlineParser } = require("@serialport/parser-readline"); // Corrected parser import

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allows React frontend to connect
    },
});

app.use(cors());
app.use(express.json());

const PORT = 5001;

console.log("🚀 Server is about to start...");

// === Serial Port Setup ===
// Change '/dev/ttyUSB0' (Linux/Mac) or 'COM3' (Windows) to your actual port
const serialPort = new SerialPort({
    path: "/dev/tty.usbserial-A5069RR4", // Update to your actual serial port
    baudRate: 115200
});
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

// === Listen for Data from the Serial Port ===
parser.on("data", (data) => {
    const message = data.trim();
    console.log(`📡 Received Serial Data: ${message}`);

    if (message === "cup_placed") {
        io.emit("cupEvent", "cup_placed"); // Send event to frontend
        console.log("🛑 Sent to frontend: cup_placed");
    }
});

// === API Route to Check If Server is Running ===
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// === Start Server ===
server.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});