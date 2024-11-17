import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Login from "./components/login";
import TypingTest from "./components/TypingText";
import SignUp from "./components/signup";
import Loading from "./assets/loading/Loading";
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <TypingTest /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<SignUp />} />
        {/* <Route
          path="/leaderboard"
          element={user ? <Leaderboard /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
