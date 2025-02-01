const express = require("express");
const path = require("path");
const cors = require("cors");

const serverV1Router = require("./routes/v1");
const serverV2Router = require("./routes/v2");

const app = express();

// Enable CORS globally
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Serve static files from "assets" directory
app.use(express.static("assets"));

// Mount the content route
// app.use("/api", contentDetailsForAPIRoutesV1);
app.use("/v1", serverV1Router);
app.use("/v2", serverV2Router);

app.get("/", (req, res) => res.render('home'));

// // 404 Handler (This should be the last middleware)
// app.use((req, res) => {
//   res.status(404).render("404");
// });

// 404 Handler (This should be the last middleware)
app.use((req, res) => {
  if (req.accepts("html")) {
    // If the request expects an HTML response, render 404.ejs
    res.status(404).render("404");
  } else {
    // If the request is for JSON (API call), send a JSON response
    res.status(404).json({ message: "The requested resource not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
