import React, { useState } from 'react';
import styles from '../css/book.module.css';
import BookDetail from './bookDetail';

const Book = ({ title, author, id, description, reviews }) => {
  const [detail, setDetail] = useState(false);
  const handleClick = () => {
    setDetail(detail ? false : true);
  };

  if (!detail) {
    return (
      <div className={styles.container}>
        <img
          src="https://www.law.berkeley.edu/wp-content/uploads/2018/11/book-cover-flyer-template-6bd8f9188465e443a5e161a7d0b3cf33.jpg"
          width="120px"
          height="160px"
          onClick={handleClick}
        ></img>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.author}>{author}</h4>
      </div>
    );
  }
  if (detail) {
    return (
      <div className="clicked">
        <BookDetail
          click={handleClick}
          title={title}
          author={author}
          id={id}
          description={description}
          reviews={reviews}
        />
      </div>
    );
  }
};

export default Book;
