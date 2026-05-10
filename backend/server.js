const path = require("path");
const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const frontendRoot = path.join(__dirname, "..");

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", contactRoutes);

app.use(express.static(frontendRoot, {
  extensions: ["html"],
  setHeaders(res, filePath) {
    if (filePath.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-store");
    }
  }
}));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "portfolio-backend" });
});

app.use((req, res) => {
  res.sendFile(path.join(frontendRoot, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Portfolio app running at http://localhost:${PORT}`);
});
