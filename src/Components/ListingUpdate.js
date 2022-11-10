import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

//Assets
import locationOptions from "./Assets/LocationOptions";

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

function ListingUpdate(props) {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const params = useParams();

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
    titleValue: props.listingData.title,
    descriptionValue: props.listingData.description,
    bodyTypeValue: props.listingData.body_type,
    engineValue: props.listingData.engine,
    horsePowerValue: props.listingData.horsepower,
    cylinderCapacityValue: props.listingData.cylinder_capacity,
    gearboxValue: props.listingData.gearbox,
    transmissionValue: props.listingData.transmission,
    colorValue: props.listingData.color,
    fabricationYearValue: props.listingData.fabrication_year,
    mileageValue: props.listingData.mileage,
    locationValue: props.listingData.location,
    priceValue: props.listingData.price,
    userProfile: {
      phoneNumber: "",
      bio: "",
      profilePic: "",
    },
    dataIsLoading: true,
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
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
      case "loadingDone":
        draft.dataIsLoading = false;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
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

  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateListing() {
        const formData = new FormData();
        if (state.engineValue === "Electric") {
          formData.append("seller", GlobalState.userId);
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("body_type", state.bodyTypeValue);
          formData.append("engine", state.engineValue);
          formData.append("horsepower", state.horsePowerValue);
          formData.append("cylinder_capacity", "");
          formData.append("gearbox", state.gearboxValue);
          formData.append("transmission", state.transmissionValue);
          formData.append("color", state.colorValue);
          formData.append("fabrication_year", state.fabricationYearValue);
          formData.append("mileage", state.mileageValue);
          formData.append("price", state.priceValue);
          formData.append("location", state.locationValue);
        } else {
          formData.append("seller", GlobalState.userId);
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("body_type", state.bodyTypeValue);
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
        }

        try {
          const response = await Axios.patch(
            `http://127.0.0.1:8000/api/listings/${params.id}/update/`,
            formData
          );
          console.log(response.data);
          navigate("/listings");
        } catch (e) {
          console.log(e.response);
        }
      }
      UpdateListing();
    }
  }, [state.sendRequest]);

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

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Update your Listing!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your listing!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
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
                  <option key={"nothing22"} />
                  {bodyTypeOptions.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3" style={{ paddingBottom: "1rem" }}>
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
                  <option key={"nothing1111"} value={""} />
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
                  <option key={"nothing1435"} value={""} />
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
                  <option key={"nothing10232"} value={""} />
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

export default ListingUpdate;
