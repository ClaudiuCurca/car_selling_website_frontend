import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// react-bootstrap
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// Components
import ProfileUpdate from "./ProfileUpdate";

function Profile() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    userProfile: {
      phoneNumber: "",
      bio: "",
      profilePic: "",
    },
    dataIsLoading: true,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.bio = action.profileObject.bio;
        break;
      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        );
        console.log(response.data);
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) {
        console.log(e.response);
      }
    }
    GetProfileInfo();
  }, []);

  function WelcomeDisplay() {
    if (
      state.userProfile.phoneNumber === null ||
      state.userProfile.phoneNumber === ""
    ) {
      return (
        <div
          style={{
            textAlign: "center",
            marginBottom: "18rem",
          }}
        >
          <h2 style={{ marginBottom: "50px", marginTop: "250px" }}>
            You must update your profile!
          </h2>
          <ProfileUpdate userProfile={state.userProfile} />
        </div>
      );
    } else {
      return (
        <>
          <Card
            style={{
              width: "45%",
              margin: "auto",
            }}
          >
            {state.userProfile.profilePic !== "" &&
            state.userProfile.profilePic !== null ? (
              <Card.Img
                variant="top"
                src={state.userProfile.profilePic}
                style={{
                  width: "200px",
                  height: "200px",
                  marginLeft: "30px",
                  marginTop: "30px",
                }}
              />
            ) : (
              <Card.Img
                variant="top"
                src={defaultProfilePicture}
                style={{
                  width: "200px",
                  height: "200px",
                  marginLeft: "30px",
                  marginTop: "30px",
                }}
              />
            )}
            <Card.Body>
              <Card.Title style={{ marginTop: "50px" }}>
                <h2 style={{ fontWeight: "bolder" }}>Bio</h2>
              </Card.Title>
              <Card.Text style={{ marginTop: "20px", fontSize: "1.2rem" }}>
                {state.userProfile.bio}
              </Card.Text>
              <Card.Text style={{ marginTop: "20px", fontSize: "1.2rem" }}>
                <strong>Phone number: </strong>
                {state.userProfile.phoneNumber}
              </Card.Text>
              <Row style={{ marginTop: "20px" }}>
                <Col style={{ textAlign: "left" }}>
                  <Button variant="primary">See Listings</Button>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <ProfileUpdate userProfile={state.userProfile} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      );
    }
  }

  if (state.dataIsLoading === true) {
    return (
      <div
        style={{
          width: "100px",
          height: "100px",
          paddingTop: "10rem",
          paddingBottom: "10rem",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "auto",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "		#F5F5F5",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <div>{WelcomeDisplay()}</div>
    </div>
  );
}

export default Profile;
