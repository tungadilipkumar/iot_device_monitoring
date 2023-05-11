// Import required modules
const http = require('http');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;


// Create server
http.createServer((req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // If root URL is requested, return website.html file
  if (req.url === '/') {
    fs.readFile('./public/website.html', 'utf8', (err, data) => {
      if (err) throw err;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  }
  // If /dilip.jfif URL is requested, return dilip.jfif file
  else if (req.url.endsWith('/dilip.jfif')) {
    fs.readFile('./public/dilip.jfif', (err, data) => {
      if (err) throw err;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(data);
    });
  }
  // If /api URL is requested, connect to the MongoDB database and retrieve data
  else if (req.url === '/api') {
    console.log('Connecting to MongoDB...');
    const client = new MongoClient('mongodb+srv://tungadilipkumar678:HB0LAnQSZkqNDT2P@dilip-cluster-zero.rtcqjw7.mongodb.net', { useNewUrlParser: true });

    // Create an async function to retrieve data from the database and send a response to the client
    (async (req, res) => {
      await client.connect();
      console.log('Connected to MongoDB...');

      // Connect to the specified database and collection
      const db = client.db('iot');
      const collection = db.collection('iotdevices');

      // Retrieve data from the collection
      const docs = await collection.find({}).toArray();

      // Convert retrieved data to JSON format and save it to a file named db.json
      const docs_to_json = JSON.stringify(docs, null, 2);
      fs.writeFile('./public/db.json', docs_to_json, 'utf8', (err) => {
        if (err) throw err;
        console.log('db.json file has been saved!');
      });

      // Set response headers and send the retrieved data as a JSON object to the client
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(docs_to_json);
    })(req,res);
  }
  // If none of the above URLs are requested, return 404 Not Found error
  else {
    res.statusCode = 404;
    res.end();
  }
}).listen(3000, () => {
  console.log(`Server running at 3000`);
});
