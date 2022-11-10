import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Icons
import { ImLocation } from "react-icons/im";
import { AiOutlineCar } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

//Components
import ListingUpdate from "./ListingUpdate";

import commafy from "./Assets/UsefulFunctions";

function ListingDetail() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const params = useParams();

  const initialState = {
    dataIsLoading: true,
    listingInfo: "",
    sellerProfileInfo: "",
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchListingInfo":
        draft.listingInfo = action.listingObject;
        break;
      case "loadingDone":
        draft.dataIsLoading = false;
        break;
      case "catchSellerProfileInfo":
        draft.sellerProfileInfo = action.profileObject;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  // Request to get listing info
  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/listings/${params.id}/` // import useParams and do this in order to you know what..
        );
        console.log(response.data);
        dispatch({
          type: "catchListingInfo",
          listingObject: response.data,
        });
      } catch (e) {
        console.log(e.response);
      }
    }
    GetListingInfo();
  }, []);

  // Request to get seller info
  useEffect(() => {
    if (state.listingInfo) {
      async function GetProfileInfo() {
        try {
          const response = await Axios.get(
            `http://127.0.0.1:8000/api/profiles/${state.listingInfo.seller}/`
          );
          console.log(response.data);
          dispatch({
            type: "catchSellerProfileInfo",
            profileObject: response.data,
          });
          dispatch({ type: "loadingDone" });
        } catch (e) {
          console.log(e.response);
        }
      }
      GetProfileInfo();
    }
  }, [state.listingInfo]);

  const listingPictures = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.picture4,
    state.listingInfo.picture5,
  ].filter((picture) => picture != null);

  const date = new Date(state.listingInfo.date_posted);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  async function DeleteHandle() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (confirmDelete) {
      try {
        const response = await Axios.delete(
          `http://localhost:8000/api/listings/${params.id}/delete`
        );
        console.log(response.data);
        navigate("/listings");
      } catch (e) {
        console.log(e.response.data);
      }
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
      <Card
        style={{
          width: "18rem",
          height: "650px",
          width: "850px",
          margin: "auto",
        }}
      >
        <Carousel style={{ margin: "25px" }}>
          {listingPictures.map((picture) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`${picture}`}
                  alt="First slide"
                  style={{
                    width: "750px",
                    height: "550px",
                  }}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Card>
      <Card
        style={{
          width: "18rem",
          width: "850px",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <h1
                  style={{
                    marginTop: "35px",
                    fontSize: "2.5rem",
                  }}
                >
                  {state.listingInfo.title}
                </h1>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <h1
                  style={{
                    marginTop: "35px",
                    color: "#6495ED",
                    fontWeight: "bolder",
                    fontSize: "2.5rem",
                  }}
                >
                  {commafy(state.listingInfo.price)} EUR
                </h1>
              </Col>
            </Row>
            <Row>
              <h5 style={{ color: "#808080" }}>
                {state.listingInfo.fabrication_year} <strong>·</strong>{" "}
                {commafy(state.listingInfo.mileage)} Km
              </h5>
            </Row>

            <Row style={{ marginTop: "65px" }}>
              <h5>Description</h5>
            </Row>
            <Row style={{}}>
              <p>{state.listingInfo.description}</p>
            </Row>
            <Row style={{ marginTop: "15px" }}>
              <Col>
                <strong>Make: </strong>
                {state.listingInfo.make}
              </Col>
              <Col>
                <strong>Model: </strong>
                {state.listingInfo.car_model}
              </Col>
              <Col>
                <strong>Body Type: </strong>
                {state.listingInfo.body_type}
              </Col>
              <Col>
                {state.listingInfo.engine === "Electric" ? (
                  <>
                    <strong>Engine: </strong>
                    {state.listingInfo.engine}
                  </>
                ) : (
                  <>
                    <strong>Engine: </strong>
                    {state.listingInfo.cylinder_capacity}{" "}
                    {state.listingInfo.engine}
                  </>
                )}
              </Col>
            </Row>
            <Row style={{ marginTop: "15px" }}>
              <Col>
                <strong>Horse Power: </strong>
                {state.listingInfo.horsepower}
              </Col>{" "}
              <Col>
                <strong>Gearbox: </strong>
                {state.listingInfo.gearbox}
              </Col>{" "}
              <Col>
                <strong>Transmission: </strong>
                {state.listingInfo.transmission}
              </Col>{" "}
              <Col>
                <strong>Color: </strong>
                {state.listingInfo.color}
              </Col>
            </Row>
            <Row style={{ marginTop: "75px" }}>
              <Col>
                {" "}
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Tooltip>
                      See all from <strong>{state.listingInfo.location}</strong>
                    </Tooltip>
                  }
                >
                  <Button
                    variant="light"
                    style={{ color: "	#696969" }}
                    onClick={() =>
                      navigate(
                        `/listings/?location__iexact=${state.listingInfo.location}`
                      )
                    }
                  >
                    {" "}
                    <ImLocation style={{ marginBottom: "5px" }} />{" "}
                    {state.listingInfo.location}
                  </Button>
                </OverlayTrigger>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <h6 style={{ color: "#808080" }}>
                  Posted: {formattedDate} by{" "}
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip>Go to profile</Tooltip>}
                  >
                    <Button
                      variant="light"
                      style={{ marginBottom: "5px" }}
                      onClick={() =>
                        navigate(`/profile/${state.listingInfo.seller}`)
                      }
                    >
                      <BiUser /> {state.listingInfo.seller_name}
                    </Button>
                  </OverlayTrigger>
                </h6>
              </Col>
            </Row>
            {GlobalState.userId == state.listingInfo.seller ? (
              <Row style={{ marginTop: "15px" }}>
                <Col style={{ textAlign: "left" }}>
                  <ListingUpdate listingData={state.listingInfo} />
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <Button variant="danger" onClick={DeleteHandle}>
                    Delete
                  </Button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListingDetail;
