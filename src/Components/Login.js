import React from "react";
import { useNavigate } from "react-router-dom";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Login() {
  const navigate = useNavigate();
  return (
    <Container
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
        width: "40rem",
        height: "26rem",
      }}
    >
      <Form>
        <Form.Group className="mb-3" style={{ paddingTop: "3rem" }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" style={{ paddingBottom: "" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button
          variant="warning"
          type="submit"
          style={{ width: "100%", marginBottom: "4rem" }}
        >
          Autentificare
        </Button>
      </Form>
      <h5 style={{ width: "100%" }}>
        You don't have an account yet?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register/")}
        >
          Register Here!
        </span>{" "}
      </h5>
    </Container>
  );
}

export default Login;
