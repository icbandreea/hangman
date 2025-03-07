const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const hangmanRoutes = require("./routes/hangman");
app.use("/hangman", hangmanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mock server running on http://localhost:${PORT}`));
