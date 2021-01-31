import styles from '../css/rlBooks.module.css';
import { useState } from 'react';
import BookDetail from './bookDetail';
import divider from '../divider.svg';

const RlBooks = ({ title, author, id, description, reviews }) => {
  const [detail, setDetail] = useState(false);
  const handleClick = () => {
    setDetail(detail ? false : true);
  };

  const [showRemove, setShowRemove] = useState('Remove');

  const handleRemove = () => {
    unSub();
    setShowRemove('Removing..');
  };

  const unSub = async () => {
    const response = await fetch(
      `https://book-update.herokuapp.com/subscriber/removebook/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('jwtTok')}`,
        },
      }
    );
    const data = await response.json();
    if (data._id) setShowRemove('Removed');
  };

  if (showRemove === 'Removed') {
    return <div className="nothing"></div>;
  } else if (!detail) {
    return (
      <div className={styles.box}>
        <div className={styles.container}>
          <img
            src="https://www.law.berkeley.edu/wp-content/uploads/2018/11/book-cover-flyer-template-6bd8f9188465e443a5e161a7d0b3cf33.jpg"
            width="110px"
            height="140px"
            onClick={handleClick}
          ></img>
          <div className={styles.text}>
            <h3 className={styles.title}>{title}</h3>
            <h4 className={styles.author}>{author}</h4>
            <button onClick={handleRemove}>{showRemove}</button>
          </div>
        </div>
        <img
          className={styles.divider}
          src={divider}
          width="200px"
          height="20px"
        ></img>
      </div>
    );
  } else if (detail) {
    return (
      <div className="clicked">
        <BookDetail
          click={handleClick}
          title={title}
          author={author}
          description={description}
          reviews={reviews}
          id={id}
        />
      </div>
    );
  }
};

export default RlBooks;
