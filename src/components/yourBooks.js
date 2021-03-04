import React, { useEffect, useState } from 'react';
import styles from '../css/yourBooks.module.css';
import AddBookForm from './addBookForm';
import RlBooks from './rlBooks';
import Loader from './loader';
import { Redirect } from 'react-router-dom';

const YourBooks = () => {
  const [subscribedBooks, setSubscribedBooks] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwtTok'));

  useEffect(() => {
    if (token) {
      getBooks();
    }
  }, []);

  const getBooks = async () => {
    const response = await fetch(
      'https://book-update.herokuapp.com/subscriber/allbooks',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('jwtTok')}`,
        },
      }
    );
    const dataReceived = await response.json();
    setSubscribedBooks(dataReceived);
  };

  let SubscribedBooksList = [];

  if (subscribedBooks[0]) {
    SubscribedBooksList = subscribedBooks.map((item) => {
      return (
        <RlBooks
          title={item.title}
          author={item.author}
          id={item._id}
          key={item._id}
          description={item.description}
          reviews={item.reviews}
        />
      );
    });
  }

  if (!token) {
    return <Redirect to="/login" />;
  } else if (!subscribedBooks) {
    return <Loader />;
  } else if (subscribedBooks) {
    return (
      <div className={styles.container}>
        <h5>Reading List</h5>
        {SubscribedBooksList}
        <div className={styles.bform}>
          <AddBookForm />
        </div>
        <footer>
          <p>Thanks for visiting !!</p>
        </footer>
      </div>
    );
  }
};

export default YourBooks;
