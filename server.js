const express = require("express");

const app = express();

app.use(express.json());

let latestCommand = "";

// Server check
app.get("/", (req, res) => {
  res.send("ESP 32 Wi-Fi voice control server is running");
});

// ===============================
// Voice app sends command here
// ===============================
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

// ===============================
// Chrome testing endpoint
// Example:
// /send?command=light1_on
// ===============================
app.get("/send", (req, res) => {

  const command = req.query.command;

  if (!command) {
    return res.json({
      success: false,
      message: "Please provide a command"
    });
  }

  latestCommand = command.toString().toLowerCase().trim();

  console.log("Chrome command received:", latestCommand);

  res.json({
    success: true,
    command: latestCommand
  });
});

// ===============================
// ESP32 gets latest command here
// ===============================
app.get("/command", (req, res) => {

  const command = latestCommand;

  // Clear command after ESP32 reads it
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
