import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

//Contexts
import StateContext from "../Contexts/StateContext";
import DispatchContext from "../Contexts/DispatchContext";

function Header() {
  const navigate = useNavigate();

  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);

  async function HandleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      try {
        const response = await Axios.post(
          "http://localhost:8000/api-auth-djoser/token/logout",
          GlobalState.userToken,
          { headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
        );
        console.log(response);
        GlobalDispatch({ type: "logout" });
        navigate("/");
      } catch (e) {
        console.log(e.response);
      }
    }
  }

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
              My listings
            </Nav.Link>

            {GlobalState.userIsLogged ? (
              <NavDropdown
                id="nav-dropdown"
                title={GlobalState.userUsername}
                menuVariant="light"
                style={{ marginRight: "1rem" }}
              >
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  My profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={HandleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                style={{ marginRight: "1rem" }}
                onClick={() => navigate("/login/")}
              >
                Log In
              </Nav.Link>
            )}

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
