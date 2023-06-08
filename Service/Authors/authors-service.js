const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let authors = [
    { id: 1, name: 'Author 1' },
    { id: 2, name: 'Author 2' },
    { id: 3, name: 'Author 3' },
    { id: 4, name: 'Author 4' },
    { id: 5, name: 'Author 5' },
];

app.get('/authors', (req, res) => {
    res.json(authors);
});

app.get('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(author => author.id === id);

    if (author) {
        res.json(author);
    } else {
        res.status(404).json({ error: 'Author not found' });
    }
});

const port = 3001

app.listen(port, () => {
    console.log(`Authors service is running on port : ${port}`);
});