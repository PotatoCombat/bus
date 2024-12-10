const express = require('express'); //testing
const cors = require('cors');
const fs = require('fs');

const app = express()
const port = 3000

// Use CORS middleware to allow requests from specific origins
app.use(cors({
  origin: 'http://localhost:8081', // Allow requests only from this origin
  methods: ['GET'], // Optionally specify allowed methods
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bus10', (req, res) => {
    let path = 'data/mta_1706.csv';
    let data = 'ERROR2';
    fs.open(path, 'r', (err, fd) => {
        if (err) throw err;
        const buffer = Buffer.alloc(100);
        fs.read(fd, buffer, 0, buffer.length, 0, (err, bytes) => {
            if (err) throw err;
            res.send(buffer.toString('utf8'));
            fs.close(fd, (err) => {
                if (err) throw err;
            })
        })
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


