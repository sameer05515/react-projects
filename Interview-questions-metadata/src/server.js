const express = require("express");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const redoc = require("redoc-express");

const serverV1Router = require("./routes/v1");
const serverV2Router = require("./routes/v2");
const swaggerSpec = require("./config/swagger");

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

// Swagger JSON endpoint - MUST be defined BEFORE Swagger UI route
// Otherwise Swagger UI middleware will intercept this request
app.get("/api-docs/swagger.json", (req, res) => {
  try {
    // Ensure we're sending valid JSON with proper content type
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Cache-Control", "no-cache");
    // Use res.json() to ensure proper JSON formatting
    res.json(swaggerSpec);
  } catch (error) {
    console.error("Error serving swagger.json:", error);
    res.status(500).json({ error: "Failed to generate API specification" });
  }
});

// Swagger UI documentation - Must come AFTER the JSON endpoint
// Swagger UI uses the spec directly, so it doesn't need the JSON endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Interview Questions Metadata API Documentation",
}));

// Redocly documentation
app.get(
  "/docs",
  redoc({
    title: "Interview Questions Metadata API Documentation",
    specUrl: "/api-docs/swagger.json",
    nonce: "", // optional, for CSP
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: "#32329f",
          },
        },
      },
    },
  })
);

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
