import React, { useEffect, useRef, useState } from 'react';
import Book from './book';
import styles from '../css/home.module.css';
import Loader from './loader';
import imgsrc from '../test1.jpg';

const Home = () => {
  const [library, setLibrary] = useState([]);

  const quotes = [
    { qt: 'Books are a uniquely portable magic.', ah: 'Stephen King' },
    {
      qt: 'Once you learn to read, you will be forever free.',
      ah: 'Frederick Douglass',
    },
    {
      qt:
        'There are many little ways to enlarge your world.  Love of books is the best of all.',
      ah: 'Jacqueline Kennedy',
    },
    {
      qt: 'A room without books is like a body without a soul',
      ah: 'Cicero',
    },
    {
      qt: 'If you don’t like to read, you haven’t found the right book.',
      ah: 'J.K. Rowling',
    },
    {
      qt:
        'That’s the thing about books. They let you travel without moving your feet.',
      ah: 'Jhumpa Lahiri',
    },
  ];

  const [quote, setQuote] = useState(quotes[0]);
  const i = useRef(1);

  useEffect(() => {
    getLibrary();
    const timer = setInterval(() => {
      setQuote(quotes[i.current]);
      i.current = (i.current % 5) + 1;
    }, 7000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getLibrary = async () => {
    const response = await fetch('https://book-update.herokuapp.com/books/', {
      method: 'GET',
    });
    const data = await response.json();
    setLibrary(data);
  };

  const Booklist = library.map((item) => {
    return (
      <Book
        title={item.title}
        author={item.author}
        id={item._id}
        key={item._id}
        description={item.description}
        reviews={item.reviews}
      />
    );
  });

  if (!library[1]) {
    return (
      <div className="cnt">
        <div className={styles.imgbx}>
          <div className={styles.txtbx}>
            <h4>“{quote.qt}”</h4>
            <p>- {quote.ah}</p>
          </div>
          <img className={styles.image} src={imgsrc} />
        </div>
        <div className={styles.descbx}>
          <div className={styles.card}>
            <h4>Create</h4>
            <p>Create your Reading List</p>
          </div>
          <div className={styles.card}>
            <h4>Add</h4>
            <p>Add books to the library and make it bigger</p>
          </div>
          <div className={styles.card}>
            <h4>Update</h4>
            <p>Update and maintain your Reading List</p>
          </div>
        </div>
        <Loader />
      </div>
    );
  } else if (library[1]) {
    return (
      <div className={styles.container}>
        <div className={styles.imgbx}>
          <div className={styles.txtbx}>
            <h4>“{quote.qt}”</h4>
            <p>- {quote.ah}</p>
          </div>
          <img className={styles.image} src={imgsrc} />
        </div>
        <div className={styles.descbx}>
          <div className={styles.card}>
            <h4>Create</h4>
            <p>Create your Reading List</p>
          </div>
          <div className={styles.card}>
            <h4>Add</h4>
            <p>Add books to the library and make it bigger</p>
          </div>
          <div className={styles.card}>
            <h4>Update</h4>
            <p>Update and maintain your Reading List</p>
          </div>
        </div>
        <h3 className={styles.welcome}>Collection</h3>
        <div className={styles.books}>{Booklist}</div>
        <footer>
          <p>Thanks for visiting !!</p>
        </footer>
      </div>
    );
  }
};

export default Home;
