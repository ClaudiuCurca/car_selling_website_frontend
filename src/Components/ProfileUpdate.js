import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function ProfileUpdate(props) {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  // Modal and Alert
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  function handleClose() {
    setShow(false);
    navigate(0);
  }
  const handleShow = () => setShow(true);
  //

  console.log(props);

  const initialState = {
    phoneNumberValue: props.userProfile.phoneNumber,
    bioValue: props.userProfile.bio,
    uploadedPicture: [],
    profilePictureValue: props.userProfile.profilePic,
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchPhoneNumberChange":
        draft.phoneNumberValue = action.phoneNumberChosen;
        break;
      case "catchBioChange":
        draft.bioValue = action.bioChosen;
        break;
      case "catchUploadedPicture":
        draft.uploadedPicture = action.pictureChosen;
        break;
      case "catchProfilePictureChange":
        draft.profilePictureValue = action.profilePictureChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function FormSubmit(e) {
    e.preventDefault();
    dispatch({ type: "changeSendRequest" });
  }

  //useEffect to catch uploadedPicture
  useEffect(() => {
    if (state.uploadedPicture[0]) {
      dispatch({
        type: "catchProfilePictureChange",
        profilePictureChosen: state.uploadedPicture[0],
      });
    }
  }, [state.uploadedPicture[0]]);

  // use effect to send the request
  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProfile() {
        const formData = new FormData();

        if (
          typeof state.profilePictureValue === "string" ||
          state.profilePictureValue === null
        ) {
          formData.append("phone_number", state.phoneNumberValue);
          formData.append("bio", state.bioValue);
          formData.append("seller", GlobalState.userId);
        } else {
          formData.append("phone_number", state.phoneNumberValue);
          formData.append("bio", state.bioValue);
          formData.append("profile_picture", state.profilePictureValue);
          formData.append("seller", GlobalState.userId);
        }

        try {
          const response = await Axios.patch(
            `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/update/`,
            formData
          );
          console.log(response.data);
          //   navigate(0);
        } catch (e) {
          console.log(e.response);
        }
      }
      UpdateProfile();
    }
  }, [state.sendRequest]);

  //useEffect to disable alert
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShowAlert(false);
      console.log("SALUT");
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showAlert]);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Update your profile!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your profile!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={FormSubmit}>
            <Form.Label>Your phone number</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                value={state.phoneNumberValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchPhoneNumberChange",
                    phoneNumberChosen: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                value={state.bioValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchBioChange",
                    bioChosen: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Change your profile picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  dispatch({
                    type: "catchUploadedPicture",
                    pictureChosen: e.target.files,
                  })
                }
              />
              <Row style={{ marginTop: "30px" }}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    setShowAlert(true);
                  }}
                >
                  Save Changes
                </Button>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        {showAlert ? (
          <Alert variant="success">
            <Alert.Heading>Changes saved successfully!</Alert.Heading>
          </Alert>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}

export default ProfileUpdate;
