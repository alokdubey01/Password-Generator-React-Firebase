import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import { Login } from "./components/Login";
import firebase from "./firebase";
import { Header } from "./components/Header";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      localStorage.setItem("user", user.uid);
    });
  }, []);
  
  return (
    <div className="App">
      <Router>
      {user ? <Header alt={user.displayName} src={user.photoURL} /> : ""}
        <Routes>
        <Route path='/login' element={<Login/>}/>
        {user ? (
              <Route exact path="/" element={<Main user={user} />} />
            ) : (
              <Route exact path="/" element={<Login />} />
            )}
      </Routes>
      </Router>
    </div>
  );
}

export default App;