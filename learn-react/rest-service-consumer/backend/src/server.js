const express = require('express');
const app = express();
const port = 3009;

const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

// Enable CORS globally
app.use(cors());

// Increase the limit for JSON and URL-encoded payloads
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

app.get('/books', (req, res) => {
    try{
        res.json(books.map(b=>({id,title})));
    // res.json(books.map(b=>({id:b.id,title:b.title})));
    }catch(err){
        console.error('My Error: '+err);
        res.status(400).json({error:err.name + ':' +err.message})
    }
});

app.get('/books/:id', (req, res) => {
    const id=req.params.id;

    try{
        const book=books.find(b=>b.id===id)||null;
        if(!book){
            throw new Error({error:`Book vanadana ke boor me chala gaya: id: ${id}`})
        }
        res.json(book);
    }catch(err){
        res.status(404).json(err)
    }
   
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
