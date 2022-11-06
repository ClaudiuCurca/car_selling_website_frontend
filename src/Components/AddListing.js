import React, { useEffect } from "react";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useImmerReducer } from "use-immer";

//Assets
import makeAndModels from "./Assets/MakeAndModels";
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

const fuelOptions = [
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
  const initialState = {
    titleValue: "",
    descriptionValue: "",
    bodyTypeValue: "",
    makeIndexValue: NaN,
    makeChosen: "",
    modelIndexValue: "",
    engineValue: "",
    horsePowerValue: "",
    cylinderCapacityValue: "",
    gearboxValue: "",
    transmissionValue: "",
    colorValue: "",
    fabricationYearValue: "",
    mileage: "",
    location: "",
    price: "",
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchTitleChange":
        draft.titleValue = action.titleChosen;
        break;
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        console.log(draft.descriptionValue);
        break;
      case "catchBodyTypeChange":
        draft.bodyTypeValue = action.bodyTypeChosen;
        console.log(draft.bodyTypeValue);
        break;
      case "catchMakeChange":
        draft.makeIndexValue = action.makeIndexChosen;
        draft.makeValue = action.makeChosen;
        break;
      case "catchModelChange":
        draft.modelIndexValue = action.modelChosen;
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
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
  return (
    <>
      <h2 style={{ textAlign: "center", paddingTop: "30px" }}>
        Sell your car!
      </h2>
      <Container style={{ width: "60rem", marginBottom: "5rem" }}>
        <Form>
          <Row>
            <Form.Group className="mb-3" style={{ paddingTop: "3rem" }}>
              <Form.Label>Title*</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter title"
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
                defaultValue=""
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
                defaultValue=""
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
                  defaultValue=""
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
                <Form.Select disabled defaultValue="">
                  <option></option>
                </Form.Select>
              </Form.Group>
            )}
            <Form.Group as={Col}>
              <Form.Label>Engine*</Form.Label>
              <Form.Select
                defaultValue=""
                onChange={(e) =>
                  dispatch({
                    type: "catchEngineChange",
                    engineChosen: e.target.value,
                  })
                }
              >
                <option key={"nothing3"} />
                {fuelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
                onChange={(e) =>
                  dispatch({
                    type: "catchHorsePowerChange",
                    horsePowerChosen: e.target.value,
                  })
                }
              />
            </Form.Group>

            {state.engineValue === "" || state.engineValue === "Electric" ? (
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Cylinder Capacity*</Form.Label>
                <Form.Control
                  disabled
                  type="number"
                  placeholder="Cylinder Capacity"
                />
              </Form.Group>
            ) : (
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Cylinder Capacity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Cylinder Capacity"
                  onChange={(e) =>
                    dispatch({
                      type: "catchCylinderCapacityChange",
                      cylinderCapacityChosen: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}

            <Form.Group as={Col}>
              <Form.Label>Gearbox*</Form.Label>
              <Form.Select
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
                onChange={(e) =>
                  dispatch({
                    type: "catchColorChange",
                    colorChangeChosen: e.target.value,
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
                defaultValue=""
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
              <Form.Select defaultValue="">
                <option
                  key={"nothing102"}
                  value={""}
                  onChange={(e) =>
                    dispatch({
                      type: "catchLocationChange",
                      locationChosen: e.target.value,
                    })
                  }
                />
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
      </Container>
    </>
  );
}

export default AddListing;
