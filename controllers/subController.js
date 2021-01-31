import mongoose from 'mongoose';
import Subscriber from '../models/subscriber.js';
import Book from '../models/book.js';

export const getSub = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addSub = async (req, res) => {
  const subsb = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    _id: new mongoose.Types.ObjectId(),
  });

  try {
    await subsb.save();
    res.status(201).json(subsb);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const subBook = async (req, res) => {
  const id = req.user.subscriber;
  const bookid = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No subscriber with that id');

  if (!mongoose.Types.ObjectId.isValid(bookid))
    return res.status(404).send('No book with the given Id');

  const sub = await Subscriber.findById(id);
  if (sub.books.includes(bookid))
    return res.status(409).json({ message: 'Book already in Reading List' });

  sub.books.push(bookid);
  try {
    await sub.save();
    res.status(201).json(sub);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const unsubBook = async (req, res) => {
  const id = req.user.subscriber;
  const bookid = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No subscriber with that id');

  if (!mongoose.Types.ObjectId.isValid(bookid))
    return res.status(404).send('No book with the given Id');

  const sub = await Subscriber.findById(id);

  try {
    const booksList = sub.books.filter(
      (item) => item.toString() !== bookid.toString()
    );
    sub.books = booksList;
    await sub.save();

    res.status(201).json(sub);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getBooks = async (req, res) => {
  const id = req.user.subscriber;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No subscriber with that id');

  try {
    const sub = await Subscriber.findById(id).populate('books');
    res.status(201).json(sub.books);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
