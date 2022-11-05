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

const constructionYearOptions = [
  2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
  2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
];
function Search() {
  const initialState = {
    brandIndexValue: NaN,
    brandValue: "",
    minConstructionYearValue: "",
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchBrandIndexChange":
        draft.brandIndexValue = action.brandIndexChosen;
        draft.brandValue = action.brandChosen;
        break;
      case "catchMinConstructionYearChange":
        draft.minConstructionYearValue = action.minConstructionYearChosen;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
  return (
    <Container style={{ width: "60rem" }}>
      <Form>
        <Row className="mb-3" style={{ paddingBottom: "1rem" }}>
          <Form.Group as={Col}>
            <Form.Label>Body Type</Form.Label>
            <Form.Select defaultValue="">
              <option />
              {bodyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Make</Form.Label>
            <Form.Select
              defaultValue=""
              onChange={(e) =>
                dispatch({
                  type: "catchBrandIndexChange",
                  brandIndexChosen:
                    parseInt(e.target.value.split(",")[1]) !== undefined
                      ? parseInt(e.target.value.split(",")[1])
                      : "",
                  brandChosen: e.target.value.split(",")[0],
                })
              }
            >
              <option value={["", ""]} />
              {makeAndModels.map((option, index) => (
                <option key={option.brand} value={[option.brand, index]}>
                  {option.brand}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3" style={{ paddingBottom: "1rem" }}>
          {" "}
          {!isNaN(state.brandIndexValue) ? (
            <Form.Group as={Col}>
              <Form.Label>Model</Form.Label>
              <Form.Select defaultValue="">
                <option />
                {makeAndModels[state.brandIndexValue].models.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          ) : (
            <Form.Group as={Col}>
              <Form.Label>Model</Form.Label>
              <Form.Select disabled defaultValue="">
                <option></option>
              </Form.Select>
            </Form.Group>
          )}
          <Form.Group as={Col}>
            <Form.Label>Engine</Form.Label>
            <Form.Select defaultValue="">
              <option />
              {fuelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3" style={{ paddingBottom: "1rem" }}>
          <Form.Group as={Col}>
            <Form.Label>Minimum price</Form.Label>
            <Form.Control type="number" placeholder="Starting from..." />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Maximum price</Form.Label>
            <Form.Control type="number" placeholder="Under..." />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Minimum fabrication year</Form.Label>
            <Form.Select
              defaultValue=""
              onChange={(e) =>
                dispatch({
                  type: "catchMinConstructionYearChange",
                  minConstructionYearChosen: e.target.value,
                })
              }
            >
              <option value={""} />
              {constructionYearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {state.minConstructionYearValue < 2022 &&
          state.minConstructionYearValue >= 2000 ? (
            <Form.Group as={Col}>
              <Form.Label>Maximum fabrication year</Form.Label>
              <Form.Select defaultValue="">
                <option value={""} />
                {constructionYearOptions
                  .slice(0, 2022 - state.minConstructionYearValue + 1)
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          ) : (
            <Form.Group as={Col}>
              <Form.Label>Maximum fabrication year</Form.Label>
              <Form.Select disabled defaultValue="">
                <option></option>
              </Form.Select>
            </Form.Group>
          )}
        </Row>

        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Search
        </Button>
      </Form>
    </Container>
  );
}

export default Search;
