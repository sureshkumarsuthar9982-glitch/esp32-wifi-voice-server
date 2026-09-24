const express = require("express");

const app = express();

app.use(express.json());

let latestCommand = "";

// Server check
app.get("/", (req, res) => {
  res.send("ESP 32 Wi-Fi voice control server is running");
});

// Voice app sends command here
app.post("/command", (req, res) => {

  const command = req.body.command;

  console.log("Command received:", command);

  if (command) {
    latestCommand = command.toString().toLowerCase().trim();
  }

  res.json({
    success: true,
    command: latestCommand
  });
});

// ESP32 gets the latest command here
app.get("/command", (req, res) => {

  const command = latestCommand;

  // Command read hone ke baad clear kar do
  latestCommand = "";

  console.log("ESP32 command:", command);

  res.json({
    command: command
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
