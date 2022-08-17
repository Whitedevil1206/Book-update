import mongoose from "mongoose";
import Book from "../models/book.js";
import Subscriber from "../models/subscriber.js";
import client from "../util/redisClient.js";

export const getBooks = async (req, res) => {
  try {
    const book = await Book.find();
    client.setEx("books", 300, JSON.stringify(book));
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {
  const id = req.user.subscriber;
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    _id: new mongoose.Types.ObjectId(),
  });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(409).send("Subscriber Id is invalid");

  const sub = await Subscriber.findById(id);
  sub.books.push(newBook._id);

  try {
    await newBook.save();
    await sub.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const writeReview = async (req, res) => {
  const bookid = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(bookid))
    return res.status(404).send("Book Id not valid");

  const book = await Book.findById(bookid);
  try {
    book.reviews.push(req.body.review);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
