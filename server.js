const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ESP32 WiFi Voice Server is running");
});

app.post("/command", (req, res) => {
  const command = req.body.command;

  console.log("Command received:", command);

  res.json({
    success: true,
    command: command
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
