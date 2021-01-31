import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import YourBooks from './components/yourBooks';
import Login from './components/login';
import Home from './components/home';
import Loader from './components/loader';
import Register from './components/register';
import { useState } from 'react';
import Profile from './components/profile';

function App() {
  const [tok, setTok] = useState(() => {
    return localStorage.getItem('jwtTok');
  });
  return (
    <div className="App">
      <NavBar token={tok} />
      <Switch>
        <Route exact path="/yb" component={YourBooks} />
        <Route exact path="/login">
          <Login setTok={setTok} />
        </Route>
        <Route exact path="/profile">
          <Profile setTok={setTok} />
        </Route>
        <Route exact path="/" component={Home} />
        <Route exact path="/loader" component={Loader} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
