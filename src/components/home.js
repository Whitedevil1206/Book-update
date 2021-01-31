import React, { useEffect, useState } from 'react';
import Book from './book';
import styles from '../css/home.module.css';
import Loader from './loader';

const Home = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    getLibrary();
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
    return <Loader />;
  } else if (library[1]) {
    return (
      <div className={styles.container}>
        <h3 className={styles.welcome}>All Books</h3>
        <div className={styles.books}>{Booklist}</div>
      </div>
    );
  }
};

export default Home;
