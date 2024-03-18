
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const ScanResult = require('../model/scanResult');

router.post('/scan', async (req, res) => {
  const { url } = req.body;

  try {
    // First, make a GET request to retrieve targets
    const probelyAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJldSIsImp0aSI6IjNUTHJpekFQOUNaZyJ9.AVreaFlk9Rm4BwZUnfK4NIST3Jwt8Clx1VIy7sCVlRI';
    const probelyTargetsResponse = await axios.get('https://api.probely.com/targets/', {
      headers: {
        'Authorization': `JWT ${probelyAuthToken}`,
        'Content-Type': 'application/json'
      }
    });

    // Check if the URL matches any target
    const targets = probelyTargetsResponse.data.results;
    const matchingTarget = targets.find(target => target.site.url === url);

    if (!matchingTarget) {
      return res.status(404).json({ error: 'Target not found in Probely' });
    }

    const targetId = matchingTarget.id;

    // Now, make a GET request to retrieve findings for the target
    const probelyFindingsResponse = await axios.get(`https://api.probely.com/targets/${targetId}/findings`, {
      headers: {
        'Authorization': `JWT ${probelyAuthToken}`,
        'Content-Type': 'application/json'
      }
    });

    const findings = probelyFindingsResponse.data.results.map(result => ({
      name: result.definition.name,
      description: result.definition.desc.split('\n')[0],
      fix: result.fix.split('\r\n\r\n').slice(0, 2).join('\n')
    }));

    res.status(200).json({ findings });
  } catch (error) {
    console.error('Error initiating scan:', error.response.data);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to initiate a scan for a given URL
// router.post('/scan', async (req, res) => {
//   const { url } = req.body;

//   try {
//     // Construct the payload for starting a scan
//     const payload = {
//       targets: [
//         { url: url }
//       ],
//       overrides: {
//         ignore_blackout_period: true,
//         scan_profile: 'lightning',
//         reduced_scopes: []
//       }
//     };

//     // Call Probely API to start the scan
//     const probelyAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJldSIsImp0aSI6IjNUTHJpekFQOUNaZyJ9.AVreaFlk9Rm4BwZUnfK4NIST3Jwt8Clx1VIy7sCVlRI';
//     const probelyResponse = await axios.post('https://api.probely.com/scans/bulk/start/', payload, {
//       headers: {
//         'Authorization': `JWT ${probelyAuthToken}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     // Store scan results in MongoDB
//     const scanId = probelyResponse.data.id; // Assuming the response contains the scan ID
//     const newScanResult = new ScanResult({
//       url: url,
//       scanId: scanId // Store the scan ID in the database
//     });
//     await newScanResult.save();

//     res.status(200).json({ message: 'Scan initiated successfully', scanId: newScanResult._id });
//   } catch (error) {
//     console.error('Error initiating scan:', error.response.data);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to get scan results for a given scan ID
// router.get('/scan/:id/results', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Retrieve scan results from MongoDB based on scan ID
//     const scanResult = await ScanResult.findById(id);
//     if (!scanResult) {
//       return res.status(404).json({ error: 'Scan result not found' });
//     }

//     res.status(200).json(scanResult);
//   } catch (error) {
//     console.error('Error retrieving scan results:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// function generateVulnerabilities() {
//   const vulnerabilities = [
//     'SQL Injection',
//     'Cross-Site Scripting (XSS)',
//     'Remote Code Execution (RCE)',
//     'Broken Authentication',
//     'Sensitive Data Exposure',
//     'XML External Entity (XXE) Injection',
//     'Insecure Deserialization',
//     'Security Misconfiguration',
//     'Broken Access Control',
//     'Cross-Site Request Forgery (CSRF)',
//     'Using Components with Known Vulnerabilities',
//     'Insufficient Logging & Monitoring'
//     // Add more vulnerabilities as needed
//   ];
//   const selectedVulnerabilities = vulnerabilities.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 2) + 8);

//   return selectedVulnerabilities;
// }

// router.post('/scanvuln', async (req, res) => {
//   const { url } = req.body;

//   try {
//     const scanId = uuidv4();
//     // Generate mock vulnerabilities
//     const vulnerabilities = generateVulnerabilities();

//     // You can store the vulnerabilities in the database if needed

//     res.status(200).json({ message: 'Scan initiated successfully', scanId , vulnerabilities });
//   } catch (error) {
//     console.error('Error initiating scan:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.get('/scanvuln/:id/results', async (req, res) => {
//   const { id } = req.params;

//   // For the purpose of this example, we're not storing scan results in the database
//   // Instead, we'll return a mock response indicating that the scan was completed

//   try {
//     res.status(200).json({ message: 'Scan completed', scanId: id });
//   } catch (error) {
//     console.error('Error retrieving scan results:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

module.exports = router;