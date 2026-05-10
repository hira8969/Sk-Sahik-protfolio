const { createContactMessage } = require("../models/contactModel");

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleContactRequest(req, res) {
  try {
    const raw = await readBody(req);
    const data = JSON.parse(raw || "{}");
    const errors = {};

    if (!data.name || data.name.trim().length < 2) errors.name = "Name is required.";
    if (!data.email || !isValidEmail(data.email)) errors.email = "Valid email is required.";
    if (!data.message || data.message.trim().length < 10) errors.message = "Message is too short.";

    if (Object.keys(errors).length) {
      res.writeHead(422, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Validation failed", errors }));
      return;
    }

    const message = createContactMessage(data);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Message received", data: message }));
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid contact request" }));
  }
}

module.exports = { handleContactRequest };
