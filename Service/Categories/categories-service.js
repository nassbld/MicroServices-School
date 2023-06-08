const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let categories = [

    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5' },

];

app.get('/categories', async (req, res) => {
    res.json(categories);
});

app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(category => category.id === id);

    if (category) {
        res.json(category);
    } else {
        res.status(404).json({ error: 'Category not found' });
    }
});

const port = 3002

app.listen(port, () => {
    console.log(`Categories service is running on port : ${port}`);
});