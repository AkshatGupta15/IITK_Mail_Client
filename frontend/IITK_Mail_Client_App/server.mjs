import express from 'express';
import { promises as fs } from 'fs';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the listed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the Content-Type header
  next();
});

app.post('/update-json', async (req, res) => {
  try {
    const jsonData = await fs.readFile('Mails.json', 'utf-8');
    const existingData = JSON.parse(jsonData);
    existingData.push(req.body);
    await fs.writeFile('Mails.json', JSON.stringify(existingData));
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating JSON file:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
