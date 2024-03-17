// const express = require('express');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const axios = require('axios');

// const ScanResult = require('../models/ScanResult');

// // // Nessus API keys
// // const accessKey = '41768c800075b5a8464fcd66549bc1a734134c587008dea10d4c19db0806d1fd';
// // const secretKey = '6798affe2f74d0cb977bc7aa962611fd350290e7f9afa3ae43807b94e7aef87d';



// // router.post('/scan',
// //   body('url').isURL(),
// //   async (req, res) => {
// //     try {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         console.log('Validation errors:', errors.array());
// //         return res.status(400).json({ errors: errors.array() });
// //       }

// //       const { url } = req.body;
// //       console.log('Received URL:', url);

// //       // Make request to Nessus API for scanning vulnerabilities
// //       const scanResponse = await axios.post(
// //         'https://cloud.tenable.com/scans',
// //         {
// //           targets: [url],
// //           // Optional parameters
// //           settings: {
// //             name: 'Scan for ' + url,
// //             description: 'Scan for vulnerabilities in ' + url,
// //             text_targets: url
// //           }
// //         },
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'X-ApiKeys': `accessKey=${accessKey};secretKey=${secretKey}`
// //           }
// //         }
// //       );

// //       console.log('Scan response:', scanResponse.data);

// //       // Extract scan ID from the response
// //       const scanId = scanResponse.data.scan.id;
// //       console.log('Scan ID:', scanId);

// //       // Save scan ID to the database
// //       const newScanResult = new ScanResult({ url, scanId });
// //       await newScanResult.save();

// //       res.status(201).json({ message: 'Scan initiated successfully', scanId });
// //     } catch (error) {
// //       console.error('Error initiating scan:', error);
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   }
// // );

// module.exports = router;


const express = require('express');
const router = express.Router();
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const ScanResult = require('../models/ScanResult');

// Route to initiate a scan for a given URL
router.post('/scan', async (req, res) => {
  const { url } = req.body;

  try {
    // Construct the payload for starting a scan
    const payload = {
      targets: [
        { url: url }
      ],
      overrides: {
        ignore_blackout_period: true,
        scan_profile: 'lightning',
        reduced_scopes: []
      }
    };

    // Call Probely API to start the scan
    const probelyAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJldSIsImp0aSI6IjNUTHJpekFQOUNaZyJ9.AVreaFlk9Rm4BwZUnfK4NIST3Jwt8Clx1VIy7sCVlRI';
    const probelyResponse = await axios.post('https://api.probely.com/scans/bulk/start/', payload, {
      headers: {
        'Authorization': `JWT ${probelyAuthToken}`,
        'Content-Type': 'application/json'
      }
    });

    // Store scan results in MongoDB
    const scanId = probelyResponse.data.id; // Assuming the response contains the scan ID
    const newScanResult = new ScanResult({
      url: url,
      scanId: scanId // Store the scan ID in the database
    });
    await newScanResult.save();

    res.status(200).json({ message: 'Scan initiated successfully', scanId: newScanResult._id });
  } catch (error) {
    console.error('Error initiating scan:', error.response.data);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get scan results for a given scan ID
router.get('/scan/:id/results', async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve scan results from MongoDB based on scan ID
    const scanResult = await ScanResult.findById(id);
    if (!scanResult) {
      return res.status(404).json({ error: 'Scan result not found' });
    }

    res.status(200).json(scanResult);
  } catch (error) {
    console.error('Error retrieving scan results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


function generateVulnerabilities() {
  const vulnerabilities = [
    'SQL Injection',
    'Cross-Site Scripting (XSS)',
    'Remote Code Execution (RCE)',
    'Broken Authentication',
    'Sensitive Data Exposure',
    'XML External Entity (XXE) Injection',
    'Insecure Deserialization',
    'Security Misconfiguration',
    'Broken Access Control',
    'Cross-Site Request Forgery (CSRF)',
    'Using Components with Known Vulnerabilities',
    'Insufficient Logging & Monitoring'
    // Add more vulnerabilities as needed
  ];
  const selectedVulnerabilities = vulnerabilities.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 2) + 8);

  return selectedVulnerabilities;
}

router.post('/scanvuln', async (req, res) => {
  const { url } = req.body;

  try {
    const scanId = uuidv4();
    // Generate mock vulnerabilities
    const vulnerabilities = generateVulnerabilities();

    // You can store the vulnerabilities in the database if needed

    res.status(200).json({ message: 'Scan initiated successfully', scanId , vulnerabilities });
  } catch (error) {
    console.error('Error initiating scan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/scanvuln/:id/results', async (req, res) => {
  const { id } = req.params;

  // For the purpose of this example, we're not storing scan results in the database
  // Instead, we'll return a mock response indicating that the scan was completed

  try {
    res.status(200).json({ message: 'Scan completed', scanId: id });
  } catch (error) {
    console.error('Error retrieving scan results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;