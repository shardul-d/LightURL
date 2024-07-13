const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'url_shortener'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.post('/shorten', (req, res) => {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();

    const query = 'INSERT INTO urls (short_code, long_url) VALUES (?, ?)';
    db.query(query, [shortCode, longUrl], (err, result) => {
        if (err) throw err;
        res.send(`Shortened URL: http://localhost:${port}/${shortCode}`);
    });
});

app.get('/:shortCode', (req, res) => {
    const shortCode = req.params.shortCode;

    const query = 'SELECT long_url FROM urls WHERE short_code = ?';
    db.query(query, [shortCode], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.redirect(result[0].long_url);
        } else {
            res.send('URL not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
