import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import { Login } from "./components/Login";
import firebase from "./firebase";
import { Dashboard } from "./components/Dashboard";
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
          {user ? (
            <Route exact path="/" element={<Main user={user} />} />
          ) : (
            <Route exact path="/" element={<Login />} />
          )}
          <Route path="/user" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
