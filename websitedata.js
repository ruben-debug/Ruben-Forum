const axios = require('axios');
const crypto = require('crypto');

// Enter your webhook secret token here
const secret = 'websitedata';

// Enter the URL of the website you want to check for changes
const websiteUrl = 'https://ruben-debug.github.io/Ruben-Forum/';

// Enter the URL of the webhook payload
const webhookUrl = 'https://ruben-debug.github.io/Ruben-Forum/websitedata.js';

// Hash function to generate the HMAC signature for the webhook payload
function generateHash(data, secret) {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}

// Function to check the website for changes
async function checkWebsite() {
  const response = await axios.get(websiteUrl);
  // Do something with the response to check for changes
}

// Function to trigger the script when the webhook is received
async function handleWebhook(payload, signature) {
  // Verify the HMAC signature
  const hash = generateHash(payload, secret);
  if (hash !== signature) {
    console.error('Invalid signature');
    return;
  }
  // Check the website for changes
  await checkWebsite();
}

// Set up a webhook listener
const http = require('http');
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const signature = req.headers['x-hub-signature'];
      handleWebhook(body, signature).catch(error => {
        console.error(error);
      });
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});
server.listen(3000);
