import { useState } from "react";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nevbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Signup } from "./components/Signup/Signup";
import { CardProvider } from "./ContextReducer/ContextReducer";
import { MyOrder } from "./components/myOrder/MyOrder";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { About } from "./components/About/About";

function App() {
  const loggedIn = () => toast("You Logged in");
  const loggedOut = () => toast("You Logged Out");

  const [search, setSearch] = useState("");

  return (
    <>
      <CardProvider>
        <Router>
          <Nevbar loggedOut={loggedOut}/>
          <ToastContainer />
          <div>
            <Routes>
              <Route exact path="/" element={<Home search={search} setSearch={setSearch}/>} />
              <Route exact path="/login" element={<Login loggedIn={loggedIn} />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/myOrder" element={<MyOrder />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </CardProvider>
      <Footer />
    </>
  );
}

export default App;
