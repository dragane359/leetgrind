// server.js

const express = require('express');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes');
const app = express();
const PORT = 3000;


app.use(cors());
  
app.use(express.json());

app.use('/', flashcardRoutes);

app.get('/test', (req, res) => {
    res.send('Test route works');
  });
 
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
