const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let books = [
    { id: 1, title: 'Book 1', authorId: 1, categoryId: 1 },
    { id: 2, title: 'Book 2', authorId: 2, categoryId: 2 },
    { id: 3, title: 'Book 3', authorId: 3, categoryId: 3 },
    { id: 4, title: 'Book 4', authorId: 4, categoryId: 4 },
    { id: 5, title: 'Book 5', authorId: 5, categoryId: 5 },
];


app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);

    if (book) {
        try {
            const authorResponse = await axios.get('http://localhost:3001/authors/' + book.authorId);
            const categoryResponse = await axios.get('http://localhost:3002/categories/' + book.categoryId);
            const author = authorResponse.data;
            const category = categoryResponse.data;

            const bookDetails = {
                id: book.id,
                title: book.title,
                author: author.name,
                category: category.name,
            };

            res.json(bookDetails);

        } catch (error) {
            res.status(500).json({ error: 'Erreur while fetching the book' });
        }
    } else {
        res.status(404).json({ error: 'Book not found' });
    }

});

const port = 3000
app.listen(port, () => {
    console.log('Books service is running on port : ' + port + '...');
});