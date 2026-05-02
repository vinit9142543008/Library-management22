import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const filePath = path.join(_dirname, '../data/book.json');

const readBooks = () => {
   
    if (!fs.existsSync(filePath)) return [];
    // return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return JSON.parse(fs.readFileSync(filePath));
};

const writeBooks = (books) => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};

export const getBooks = (req, res) => {
  const books = readBooks();
  res.json(books);
};

export const addBooks = (req, res) => {
  const { title, author, price, category, quantity } = req.body;

  if (!title || !author || !price || !category || !quantity) {
    return res.status(400).json({ message: "All Fields Required" });
  }

  const books = readBooks();

  const newBooks = {
    id: Date.now(),
    title,
    author,
    category,
    price: Number(price),
    quantity: Number(quantity)
  };

  books.push(newBooks);
  writeBooks(books);

  res.status(201).json({ message: 'Book Added', book: newBooks });
};

export const updateBooks = (req, res) => {
  const { id } = req.params;
  const books = readBooks();

const index = books.findIndex(b => String(b.id) === String(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books[index] = { ...books[index], ...req.body };

  writeBooks(books);

  res.json({ message: 'Book updated', book: books[index] });
};

export const deleteBooks = (req, res) => {
  const { id } = req.params;

  const books = readBooks();

  const newBooks = books.filter(b => String(b.id ) !== String (id));

  if (books.length === newBooks.length) {
    return res.status(404).json({ message: "Book not found" });
  }

  writeBooks(newBooks);

  res.json({ message: "Book Deleted" });
};