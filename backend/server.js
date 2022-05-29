const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
//Replace body_parser
app.use(express.urlencoded({ extended: false }));
const { errorHandler } = require("./middleware/errorHandlerMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
// Connect to mongoDB database
connectDB();

// Allowed Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//Serve Frontend
if (process.env.NODE_ENV === "production") {
  //Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status("200").json({ message: "Welcome to the Support System API" });
  });
}
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
