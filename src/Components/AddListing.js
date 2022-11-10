import React, { useEffect, useContext } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";

// Contexts
import StateContext from "../Contexts/StateContext";

//Assets
import makeAndModels from "./Assets/MakeAndModels";
import locationOptions from "./Assets/LocationOptions";

// Components
import ProfileUpdate from "./ProfileUpdate";

const bodyTypeOptions = [
  {
    value: "Break",
    label: "Break",
  },
  {
    value: "Cabrio",
    label: "Cabrio",
  },
  {
    value: "Coupe",
    label: "Coupe",
  },
  {
    value: "Hatchback",
    label: "Hatchback",
  },
  {
    value: "Sedan",
    label: "Sedan",
  },
  {
    value: "SUV",
    label: "SUV",
  },
];

const engineOptions = [
  {
    value: "Petrol",
    label: "Petrol",
  },
  {
    value: "Diesel",
    label: "Diesel",
  },
  {
    value: "Electric",
    label: "Electric",
  },
];

const gearboxOptions = [
  {
    value: "Automatic",
    label: "Automatic",
  },
  {
    value: "Manual",
    label: "Manual",
  },
];

const transmissionOptions = [
  {
    value: "4x4",
    label: "4x4",
  },
  {
    value: "Rear",
    label: "Rear",
  },
  {
    value: "Front",
    label: "Front",
  },
];

const colorOptions = [
  {
    value: "Black",
    label: "Black",
  },
  {
    value: "Brown",
    label: "Brown",
  },
  {
    value: "Blue",
    label: "Blue",
  },
  {
    value: "Green",
    label: "Green",
  },
  {
    value: "Grey",
    label: "Grey",
  },
  {
    value: "Red",
    label: "Red",
  },
  {
    value: "White",
    label: "White",
  },
  {
    value: "Yellow",
    label: "Yellow",
  },
  {
    value: "Other Color",
    label: "Other Color",
  },
];

const constructionYearOptions = [
  2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
  2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
];

function AddListing() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    titleValue: "",
    descriptionValue: "",
    bodyTypeValue: "",
    makeValue: "",
    makeIndexValue: NaN,
    modelValue: "",
    engineValue: "",
    horsePowerValue: "",
    cylinderCapacityValue: "",
    gearboxValue: "",
    transmissionValue: "",
    colorValue: "",
    fabricationYearValue: "",
    mileageValue: "",
    locationValue: "",
    priceValue: "",
    picture1Value: "",
    picture2Value: "",
    picture3Value: "",
    picture4Value: "",
    picture5Value: "",
    uploadedPictures: [],
    userProfile: {
      phoneNumber: "",
      bio: "",
      profilePic: "",
    },
    dataIsLoading: true,
    sendRequest: 0,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchTitleChange":
        draft.titleValue = action.titleChosen;
        break;
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        break;
      case "catchBodyTypeChange":
        draft.bodyTypeValue = action.bodyTypeChosen;
        break;
      case "catchMakeChange":
        draft.makeIndexValue = action.makeIndexChosen;
        draft.makeValue = action.makeChosen;
        break;
      case "catchModelChange":
        draft.modelValue = action.modelChosen;
        break;
      case "catchEngineChange":
        draft.engineValue = action.engineChosen;
        break;
      case "catchHorsePowerChange":
        draft.horsePowerValue = action.horsePowerChosen;
        break;
      case "catchCylinderCapacityChange":
        draft.cylinderCapacityValue = action.cylinderCapacityChosen;
        break;
      case "catchGearboxChange":
        draft.gearboxValue = action.gearboxChosen;
        break;
      case "catchTransmissionChange":
        draft.transmissionValue = action.transmissionChosen;
        break;
      case "catchColorChange":
        draft.colorValue = action.colorChosen;
        console.log(draft.colorValue);
        break;
      case "catchFabricationYearChange":
        draft.fabricationYearValue = action.fabricationYearChosen;
        break;
      case "catchMileageChange":
        draft.mileageValue = action.mileageChosen;
        break;
      case "catchLocationChange":
        draft.locationValue = action.locationChosen;
        break;
      case "catchPriceChange":
        draft.priceValue = action.priceChosen;
        break;
      case "catchUserProfileInfo":
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.bio = action.profileObject.bio;
        break;
      case "loadingDone":
        draft.dataIsLoading = false;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "catchUploadedPictures":
        draft.uploadedPictures = action.picturesChosen;
        break;
      case "catchPicture1Change":
        draft.picture1Value = action.picture1Chosen;
        break;
      case "catchPicture2Change":
        draft.picture2Value = action.picture2Chosen;
        break;
      case "catchPicture3Change":
        draft.picture3Value = action.picture3Chosen;
        break;
      case "catchPicture4Change":
        draft.picture4Value = action.picture4Chosen;
        break;
      case "catchPicture5Change":
        draft.picture5Value = action.picture5Chosen;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

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

  useEffect(() => {
    if (state.sendRequest) {
      async function AddListing() {
        const formData = new FormData();
        formData.append("seller", GlobalState.userId);
        formData.append("title", state.titleValue);
        formData.append("description", state.descriptionValue);
        formData.append("body_type", state.bodyTypeValue);
        formData.append("make", state.makeValue);
        formData.append("car_model", state.modelValue);
        formData.append("engine", state.engineValue);
        formData.append("horsepower", state.horsePowerValue);
        formData.append("cylinder_capacity", state.cylinderCapacityValue);
        formData.append("gearbox", state.gearboxValue);
        formData.append("transmission", state.transmissionValue);
        formData.append("color", state.colorValue);
        formData.append("fabrication_year", state.fabricationYearValue);
        formData.append("mileage", state.mileageValue);
        formData.append("price", state.priceValue);
        formData.append("location", state.locationValue);
        formData.append("picture1", state.picture1Value);
        formData.append("picture2", state.picture2Value);
        formData.append("picture3", state.picture3Value);
        formData.append("picture4", state.picture4Value);
        formData.append("picture5", state.picture5Value);
        formData.append("seller_name", GlobalState.userUsername);
        formData.append("seller_phone_number", state.userProfile.phoneNumber);
        try {
          const response = await Axios.post(
            `http://127.0.0.1:8000/api/listings/create/`,
            formData
          );
          console.log(response.data);
          navigate("/listings");
        } catch (e) {
          console.log(e.response);
        }
      }
      AddListing();
    }
  }, [state.sendRequest]);

  useEffect(() => {
    if (state.uploadedPictures[0])
      dispatch({
        type: "catchPicture1Change",
        picture1Chosen: state.uploadedPictures[0],
      });
  }, [state.uploadedPictures[0]]);

  useEffect(() => {
    if (state.uploadedPictures[1])
      dispatch({
        type: "catchPicture2Change",
        picture2Chosen: state.uploadedPictures[1],
      });
  }, [state.uploadedPictures[1]]);

  useEffect(() => {
    if (state.uploadedPictures[2])
      dispatch({
        type: "catchPicture3Change",
        picture3Chosen: state.uploadedPictures[2],
      });
  }, [state.uploadedPictures[2]]);

  useEffect(() => {
    if (state.uploadedPictures[3])
      dispatch({
        type: "catchPicture4Change",
        picture4Chosen: state.uploadedPictures[3],
      });
  }, [state.uploadedPictures[3]]);

  useEffect(() => {
    if (state.uploadedPictures[4])
      dispatch({
        type: "catchPicture5Change",
        picture5Chosen: state.uploadedPictures[4],
      });
  }, [state.uploadedPictures[4]]);

  function FormSubmit(e) {
    e.preventDefault();
    console.log("Form has been submitted");
    dispatch({ type: "changeSendRequest" });
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

  if (!GlobalState.userIsLogged) {
    return (
      <div
        style={{
          textAlign: "center",
          marginBottom: "18rem",
        }}
      >
        <h2 style={{ marginBottom: "50px", marginTop: "250px" }}>
          You must log in to add a listing!
        </h2>
        <Button
          variant="warning"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/login")}
        >
          Go to Log In page
        </Button>{" "}
      </div>
    );
  }

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
          You must update your profile in order to add a listing!
        </h2>
        <ProfileUpdate userProfile={state.userProfile} />
      </div>
    );
  }

  return (
    <>
      <h2 style={{ textAlign: "center", paddingTop: "30px" }}>
        Sell your car!
      </h2>
      <Container style={{ width: "60rem", marginBottom: "5rem" }}>
        <Form onSubmit={FormSubmit}>
          <Row>
            <Form.Group className="mb-3" style={{ paddingTop: "3rem" }}>
              <Form.Label>Title*</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter title"
                value={state.titleValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchTitleChange",
                    titleChosen: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Description of your car</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                value={state.descriptionValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchDescriptionChange",
                    descriptionChosen: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3" style={{ paddingBottom: "1rem" }}>
            <Form.Group as={Col}>
              <Form.Label>Body Type*</Form.Label>
              <Form.Select
                value={state.bodyTypeValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchBodyTypeChange",
                    bodyTypeChosen: e.target.value,
                  })
                }
              >
                <option key={"nothing11"} />
                {bodyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Make*</Form.Label>
              <Form.Select
                onChange={(e) =>
                  dispatch({
                    type: "catchMakeChange",
                    makeIndexChosen:
                      parseInt(e.target.value.split(",")[1]) !== undefined
                        ? parseInt(e.target.value.split(",")[1])
                        : "",
                    makeChosen: e.target.value.split(",")[0],
                  })
                }
              >
                <option key={"nothing"} value={["", ""]} />
                {makeAndModels.map((option, index) => (
                  <option key={option.brand} value={[option.brand, index]}>
                    {option.brand}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3" style={{ paddingBottom: "1rem" }}>
            {!isNaN(state.makeIndexValue) ? (
              <Form.Group as={Col}>
                <Form.Label>Model*</Form.Label>
                <Form.Select
                  value={state.modelValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchModelChange",
                      modelChosen: e.target.value,
                    })
                  }
                >
                  <option key={"nothing2"} />
                  {makeAndModels[state.makeIndexValue].models.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group as={Col}>
                <Form.Label>Model*</Form.Label>
                <Form.Select disabled>
                  <option></option>
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group as={Col}>
              <Form.Label>Engine*</Form.Label>
              <Form.Select
                value={state.engineValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchEngineChange",
                    engineChosen: e.target.value,
                  })
                }
              >
                <option key={"nothing3"} value={""} />
                {engineOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Horse Power*</Form.Label>
              <Form.Control
                type="number"
                placeholder="Horse Power"
                value={state.horsePowerValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchHorsePowerChange",
                    horsePowerChosen: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Cylinder Capacity*</Form.Label>
              <Form.Control
                type="number"
                disabled={
                  state.engineValue === undefined ||
                  state.engineValue === "Electric" ||
                  state.engineValue === ""
                }
                placeholder="Cylinder Capacity"
                value={state.cylinderCapacityValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchCylinderCapacityChange",
                    cylinderCapacityChosen: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Gearbox*</Form.Label>
              <Form.Select
                value={state.gearboxValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchGearboxChange",
                    gearboxChosen: e.target.value,
                  })
                }
              >
                <option key={"nothing4"} value={""} />
                {gearboxOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Transmission*</Form.Label>
              <Form.Select
                value={state.transmissionValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchTransmissionChange",
                    transmissionChosen: e.target.value,
                  })
                }
              >
                <option key={"nothing102"} value={""} />
                {transmissionOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Color*</Form.Label>
              <Form.Select
                value={state.colorValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchColorChange",
                    colorChosen: e.target.value,
                  })
                }
              >
                <option key={"nothing102"} value={""} />
                {colorOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Fabrication Year*</Form.Label>
              <Form.Select
                value={state.fabricationYearValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchFabricationYearChange",
                    fabricationYearChosen: e.target.value,
                  })
                }
              >
                <option key={"nothing102"} value={""} />
                {constructionYearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Mileage (Km)*</Form.Label>
              <Form.Control
                type="number"
                placeholder="Mileage"
                value={state.mileageValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchMileageChange",
                    mileageChosen: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Location*</Form.Label>
              <Form.Select
                value={state.locationValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchLocationChange",
                    locationChosen: e.target.value,
                  })
                }
              >
                <option key={"nothing102"} value={""} />
                {locationOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row style={{ marginBottom: "25px" }}>
            <Form.Group as={Col}>
              <Form.Label>Price*</Form.Label>
              <Form.Control
                type="number"
                placeholder="In EUR"
                value={state.priceValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchPriceChange",
                    priceChosen: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>

          <Row style={{ marginBottom: "25px" }}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Choose pictures</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) =>
                  dispatch({
                    type: "catchUploadedPictures",
                    picturesChosen: e.target.files,
                  })
                }
              />
            </Form.Group>
          </Row>

          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
              height: "50px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Add Listing
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AddListing;
