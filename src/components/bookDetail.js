import { useState } from 'react';
import styles from '../css/bookDetail.module.css';

const BookDetail = ({ click, title, author, id, description, reviews }) => {
  const [showAdding, setShowAdding] = useState('Add to Reading List');
  const [rev, setRev] = useState({
    review: '',
  });
  const [showPost, setShowPost] = useState('Post');

  const handleReview = (e) => {
    setRev({ review: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (rev.review === '' || rev.review === 'Enter your Review!') {
      setRev({
        review: 'Enter your Review!',
      });
      return;
    }
    setShowPost('Posting..');
    sendPost();
    console.log(rev);
    setRev({
      review: '',
    });
  };

  const sendPost = async () => {
    const response = await fetch(
      `https://book-update.herokuapp.com/books/review/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('jwtTok')}`,
        },
        body: JSON.stringify(rev),
      }
    );
    const data = await response.json();
    if (data._id) setShowPost('Posted');
    else if (data.message === 'Invalid Token') setShowPost('LogIn to Post');
  };

  const handleClick = () => {
    setShowAdding('Adding');
    subBook();
  };

  const subBook = async () => {
    const response = await fetch(
      `https://book-update.herokuapp.com/subscriber/addbook/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('jwtTok')}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.message === 'Book already in Reading List')
      setShowAdding('Already in List');
    else if (data._id) setShowAdding('Added');
    else if (data.message === 'Invalid Token') setShowAdding('LogIn to add');
  };

  const reviewList = reviews.map((item) => {
    return <p key={item}> -- {item}</p>;
  });

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <h4 onClick={click}>BACK</h4>
        <div className={styles.header}>
          <img
            src="https://www.law.berkeley.edu/wp-content/uploads/2018/11/book-cover-flyer-template-6bd8f9188465e443a5e161a7d0b3cf33.jpg"
            width="120px"
            height="160px"
          ></img>
          <div className={styles.text}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.author}>{author}</h3>
          </div>
        </div>
        <button onClick={handleClick}>
          {id ? showAdding : 'Added to Reading List'}
        </button>
        <div className={styles.description}>
          <h3>Description</h3>
          <p>{!description ? 'Will Be Updated Soon' : description}</p>
        </div>
        <div className={styles.review}>
          <h3>Reviews</h3>
          <textarea
            placeholder="Your Review"
            value={rev.review}
            onChange={handleReview}
          ></textarea>
          <button onClick={handlePost}>{showPost}</button>
          <div className={styles.para}>
            {reviews.length === 0
              ? ' >> Be the first one to write a Review!'
              : reviewList}
          </div>
        </div>
        <div className={styles.sg}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20 16.78c.002-1.8.003-2.812 0-4.027-.001-.417.284-.638.567-.638.246 0 .49.168.538.52.19 1.412.411 2.816.547 3.146.042.099.113.141.185.141.123 0 .244-.123.206-.284-.255-1.069-.493-2.519-.607-3.334 1.904 1.854 2.314 2.005 2.192 3.548-.089 1.129-.52 2.508.373 4.255l-2.563.893c-.062-.314-.138-.637-.226-.933-.515-1.721-1.214-1.752-1.212-3.287zm-16.567-4.665c-.246 0-.49.168-.538.52-.19 1.412-.411 2.816-.547 3.146-.042.099-.113.141-.185.141-.123 0-.244-.123-.206-.284.255-1.069.493-2.519.607-3.334-1.904 1.854-2.314 2.005-2.192 3.548.09 1.128.521 2.507-.372 4.254l2.562.894c.062-.314.138-.637.226-.933.515-1.721 1.214-1.752 1.212-3.287-.002-1.8-.003-2.812 0-4.027.001-.418-.285-.638-.567-.638zm1.567.642zm14.001 2.637c-2.354.194-4.35.62-6.001 1.245v-9.876l.057-.036c1.311-.816 3.343-1.361 5.943-1.603v7.633c-.002-.459.165-.881.469-1.186.377-.378.947-.562 1.531-.391v-8.18c-3.438.105-6.796.658-9 2.03-2.204-1.372-5.562-1.925-9-2.03v8.18c.583-.17 1.153.012 1.531.391.304.305.471.726.469 1.184v-7.631c2.6.242 4.632.788 5.943 1.604l.057.035v9.876c-1.651-.626-3.645-1.052-6-1.246v1.385c0 .234-.021.431-.046.622 2.249.193 4.372.615 6.046 1.381.638.292 1.362.291 2 0 1.675-.766 3.798-1.188 6.046-1.381-.025-.191-.046-.386-.046-.621l.001-1.385zm-12.001-2.426c1.088.299 2.122.64 3 .968v1.064c-.823-.345-1.879-.705-3-1.015v-1.017zm0-1.014c1.121.31 2.177.67 3 1.015v-1.064c-.878-.328-1.912-.669-3-.968v1.017zm0-5.09v1.017c1.121.311 2.177.67 3 1.015v-1.064c-.878-.328-1.912-.669-3-.968zm0 3.058c1.121.31 2.177.67 3 1.015v-1.063c-.878-.328-1.912-.669-3-.968v1.016zm10 4.063c-1.121.31-2.177.67-3 1.015v-1.064c.878-.328 1.912-.669 3-.968v1.017zm0-3.048c-1.088.299-2.122.64-3 .968v1.064c.823-.345 1.879-.705 3-1.015v-1.017zm-3-3.105v1.064c.823-.345 1.879-.705 3-1.015v-1.017c-1.088.299-2.122.64-3 .968zm3 1.074c-1.088.299-2.122.64-3 .968v1.064c.823-.345 1.879-.705 3-1.015v-1.017z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
