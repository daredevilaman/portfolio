const express = require('express');
const fileUpload = require('express-fileupload');
const mammoth = require('mammoth');
const path = require('path');

const app = express();
const port = 3000;

app.use(fileUpload());
app.use(express.static('public'));

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).send('No files were uploaded.');
  }

  const resume = req.files.resume;

  mammoth.extractRawText({ buffer: resume.data })
    .then((result) => {
      const resumeText = result.value;
      res.send(resumeText);
    })
    .catch((err) => {
      console.error('Error processing file:', err);
      res.status(500).send('Error processing file.');
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
