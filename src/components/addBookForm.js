import { useState } from 'react';
import styles from '../css/addBookForm.module.css';

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
  });

  const [addStatus, setAddStatus] = useState('Add Book');
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    setBookData({
      ...bookData,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddStatus('Adding...');
    console.log(bookData);
    addaBook();
    setBookData({
      title: '',
      author: '',
      description: '',
    });
  };

  const addaBook = async () => {
    const response = await fetch(
      'https://book-update.herokuapp.com/books/add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('jwtTok')}`,
        },
        body: JSON.stringify(bookData),
      }
    );
    const data = await response.json();
    if (data._id) setAddStatus('Book Added');
    console.log(data);
    if (!data._id) {
      setShowError(data.message);
      setAddStatus('Add Book');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.area}>
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.area}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            placeholder="Enter author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.area}>
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Optional"
            name="description"
            value={bookData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">{addStatus}</button>
        {showError && <p>{showError}</p>}
      </form>
    </div>
  );
};

export default AddBookForm;
