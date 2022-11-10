import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import Axios from "axios";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

// Contexts
import DispatchContext from "../Contexts/DispatchContext";
import StateContext from "../Contexts/StateContext";

function Login() {
  const navigate = useNavigate();

  const GlobalDispatch = useContext(DispatchContext);
  const GlobalState = useContext(StateContext);

  const initialState = {
    usernameValue: "",
    passwordValue: "",
    sendRequest: 0,
    token: "",
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen;
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "catchToken":
        draft.token = action.tokenValue;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function FormSubmit(e) {
    e.preventDefault();
    console.log("The form has been submitted");
    dispatch({ type: "changeSendRequest" });
  }
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();

      async function LogIn() {
        try {
          const response = await Axios.post(
            "http://localhost:8000/api-auth-djoser/token/login/",
            {
              username: state.usernameValue,
              password: state.passwordValue,
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          dispatch({
            type: "catchToken",
            tokenValue: response.data.auth_token,
          });
          // THIS SENDS DATA TO THE GLOBAL STATE
          GlobalDispatch({
            type: "catchToken",
            tokenValue: response.data.auth_token,
          });
        } catch (error) {
          console.log(error.response);
        }
      }
      LogIn();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  // Get user info
  useEffect(() => {
    if (state.token !== "") {
      const source = Axios.CancelToken.source();

      async function GetUserInfo() {
        try {
          const response = await Axios.get(
            "http://localhost:8000/api-auth-djoser/users/me/",
            {
              headers: { Authorization: "Token ".concat(state.token) },
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          GlobalDispatch({
            type: "userSignsIn",
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            idInfo: response.data.id,
          });
          navigate("/");
        } catch (error) {
          console.log(error.response);
        }
      }
      GetUserInfo();
      return () => {
        source.cancel();
      };
    }
  }, [state.token]);

  return (
    <Container
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
        width: "40rem",
        height: "26rem",
      }}
    >
      <Form onSubmit={FormSubmit}>
        <Form.Group className="mb-3" style={{ paddingTop: "3rem" }}>
          <Form.Label value={state.usernameValue}>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={(e) =>
              dispatch({
                type: "catchUsernameChange",
                usernameChosen: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" style={{ paddingBottom: "" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={state.passwordValue}
            onChange={(e) =>
              dispatch({
                type: "catchPasswordChange",
                passwordChosen: e.target.value,
              })
            }
          />
        </Form.Group>
        <Button
          variant="warning"
          type="submit"
          style={{ width: "100%", marginBottom: "4rem" }}
        >
          Log In
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
