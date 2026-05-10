const messages = [];

function createContactMessage({ name, email, message }) {
  const record = {
    id: cryptoRandomId(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  messages.push(record);
  return record;
}

function cryptoRandomId() {
  return `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

module.exports = { createContactMessage, messages };
