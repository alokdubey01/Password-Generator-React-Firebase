import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import { Login } from "./components/Login";
import firebase from "./firebase";
import { Header } from "./components/Header";

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      localStorage.setItem("user", user.uid);
      setLoading(false);
    });
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div style={{ background: "#222", height: "100vh", width: "100wh" }}>
          <div id="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
          </div>
        </div>
      ) : (
        <Router>
          {user ? <Header alt={user.displayName} src={user.photoURL} /> : ""}
          <Routes>
            {user ? (
              <Route exact path="/" element={<Main user={user} />} />
            ) : (
              <Route exact path="/" element={<Login />} />
            )}
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
