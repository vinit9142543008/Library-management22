import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken"; 
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const borrowPath = path.join(__dirname, "../data/borrow.json");
const bookPath = path.join(__dirname, "../data/book.json");

const read = (file) => {
  try {
    if (!fs.existsSync(file)) return [];
    const data = fs.readFileSync(file, "utfs-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("READ ERROR:", err);
    return [];
  }
};

const write = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));


export const borrowBook = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET_KEY");

    const studentId = decoded.id; // ✅ take from token
    const { bookId } = req.body;

    const borrows = read(borrowPath);
    const books = read(bookPath);

   
    const alreadyBorrowed = borrows.find(
      (b) =>
        b.studentId == studentId &&
        b.bookId == bookId &&
        !b.returnDate
    );

    if (alreadyBorrowed) {
      return res.status(400).json({
        message: "You already borrowed this book. Return first!",
      });
    }

    
    const active = borrows.filter(
      (b) => b.studentId == studentId && !b.returnDate
    );

    if (active.length >= 3) {
      return res.status(400).json({ message: "Max 3 books allowed" });
    }

    
    const book = books.find((b) => b.id == bookId);

    if (!book || book.quantity <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // ✅ create borrow
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 10);

    const newBorrow = {
      id: Date.now(),
      studentId,
      bookId,
      borrowDate,
      dueDate,
      returnDate: null,
      fine: 0,
    };

    borrows.push(newBorrow);
    book.quantity -= 1;

    write(borrowPath, borrows);
    write(bookPath, books);

    res.json({ message: "Book borrowed", data: newBorrow });

  } catch (err) {
    console.error("BORROW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const returnBook = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET_KEY");

    const { borrowId } = req.body;

    const borrows = read(borrowPath);
    const books = read(bookPath);

    const borrow = borrows.find((b) => b.id == borrowId);

    if (!borrow) {
      return res.status(404).json({ message: "Borrow not found" });
    }

    // ❌ student can only return own book
    if (
      decoded.role === "student" &&
      borrow.studentId != decoded.id
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (borrow.returnDate) {
      return res.status(400).json({ message: "Already returned" });
    }

    const returnDate = new Date();
    borrow.returnDate = returnDate;

    const dueDate = new Date(borrow.dueDate);

    let fine = 0;

    if (returnDate > dueDate) {
      const diff = returnDate - dueDate;
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      fine = days * 50;
    }

    borrow.fine = fine;

    
    const book = books.find((b) => b.id == borrow.bookId);
    if (book) book.quantity += 1;

    write(borrowPath, borrows);
    write(bookPath, books);

    res.json({
      message: "Book returned",
      fine,
    });

  } catch (err) {
    console.error("RETURN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getBorrow = (req, res) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET_KEY");

    const borrows = read(borrowPath);

    if (decoded.role === "admin") {
      return res.json(borrows);
    }

    const myBorrows = borrows.filter(
      (b) => b.studentId == decoded.id
    );

    res.json(myBorrows);

  } catch (err) {
    console.error("GET BORROW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};