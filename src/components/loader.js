import '../css/loader.css';

const Loader = () => {
  return (
    <div className="loaderbox">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
