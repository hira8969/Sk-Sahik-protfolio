const { createContactMessage } = require("../models/contactModel");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactPayload(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

function createContact(req, res) {
  const errors = validateContactPayload(req.body || {});

  if (Object.keys(errors).length) {
    return res.status(422).json({ message: "Validation failed", errors });
  }

  const message = createContactMessage(req.body);
  return res.status(201).json({
    message: "Message received successfully.",
    data: message
  });
}

module.exports = { createContact };
