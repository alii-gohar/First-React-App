import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Post from "./Components/Post/Post";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import ViewPosts from "./Components/viewPosts";
import Navbar from "./Components/Navbar";
import Protected from "./Components/Protected";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="viewposts"
            element={<Protected Components={ViewPosts} />}
          />
          <Route path="home" element={<Protected Components={ViewPosts} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
