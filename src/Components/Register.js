import React from "react";
import { useNavigate } from "react-router-dom";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Register() {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
        width: "40rem",
        height: "40rem",
      }}
    >
      <Form>
        <Form.Group className="mb-3" style={{ paddingTop: "3rem" }}>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="number" placeholder="Phone number" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email adress</Form.Label>
          <Form.Control type="email" placeholder="Email adress" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          style={{ width: "100%", marginBottom: "4rem" }}
        >
          Register
        </Button>
      </Form>
      <h5 style={{ width: "100%" }}>
        You have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login/")}
        >
          Log In!
        </span>{" "}
      </h5>
    </Container>
  );
}

export default Register;
