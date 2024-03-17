const mongoose = require('mongoose');

const scanResultSchema = new mongoose.Schema({
  url: { type: String, required: true },
  vulnerabilities: [{ 
    name: { type: String, required: true },
    severity: { type: String },
    description: { type: String },
    // Add more fields as needed
  }]
});

module.exports = mongoose.model('ScanResult', scanResultSchema);
