import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import subRoute from './routes/subscriber.js';
import bookRoute from './routes/books.js';
import userRoute from './routes/user.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/subscriber', subRoute);
app.use('/books', bookRoute);
app.use('/user', userRoute);
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hello you are in the API' });
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
