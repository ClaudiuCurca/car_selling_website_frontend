import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Listings from "./Components/Listings";
import AddListing from "./Components/AddListing";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ paddingTop: "65px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/listings/" element={<Listings />} />
          <Route path="/addlisting/" element={<AddListing />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
