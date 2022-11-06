import React from "react";
import { useNavigate } from "react-router-dom";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" variant="light" fixed="top" style={{ height: "65px" }}>
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ZDN Market
          </Navbar.Brand>
          <Nav>
            <Nav.Link
              style={{ marginRight: "1rem" }}
              onClick={() => navigate("/listings/")}
            >
              All Listings
            </Nav.Link>
            <Nav.Link
              style={{ marginRight: "1rem" }}
              onClick={() => navigate("/favorites/")}
            >
              Favorites (0)
            </Nav.Link>
            <Nav.Link
              style={{ marginRight: "1rem" }}
              onClick={() => navigate("/login/")}
            >
              Log In
            </Nav.Link>
            <Button variant="warning" onClick={() => navigate("/addlisting/")}>
              Add Listing
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
