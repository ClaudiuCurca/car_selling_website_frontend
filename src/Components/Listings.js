import Axios from "axios";
import React, { useEffect, useState } from "react";
import { ImLocation } from "react-icons/im";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// react-bootstrap
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import commafy from "./Assets/UsefulFunctions";

function Listings() {
  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await Axios.get(
          "http://localhost:8000/api/listings/",
          { cancelToken: source.token }
        );
        // console.log(response.data);
        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    GetAllListings();
    return () => {
      source.cancel();
    };
  }, []);

  if (dataIsLoading === true) {
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
    <div style={{ backgroundColor: "		#F5F5F5" }}>
      {allListings.map((listing) => {
        return (
          <div
            style={{
              width: "75%",
              margin: "auto",
              paddingTop: "25px",
              paddingBottom: "25px",
            }}
          >
            <Card style={{ height: "200px" }}>
              <Row>
                <Col xs={9}>
                  {" "}
                  <Card.Img
                    variant="top"
                    src={listing.picture1}
                    style={{
                      width: "210px",
                      height: "150px",
                      marginLeft: "25px",
                      marginTop: "25px",
                    }}
                  />
                </Col>
                <Col
                  style={{
                    position: "absolute",
                    marginLeft: "250px",
                    width: "30rem",
                  }}
                >
                  <Card.Text
                    style={{
                      marginTop: "25px",
                      marginBottom: "0px",
                      fontWeight: "bolder",
                      fontSize: "1.7rem",
                      width: "20rem",
                      marginRight: "0px",
                    }}
                  >
                    {listing.title}
                  </Card.Text>
                  <Card.Text style={{ color: "	#696969", fontSize: "1rem" }}>
                    {listing.fabrication_year} · {listing.cylinder_capacity}{" "}
                    {listing.engine} · {listing.gearbox} ·{" "}
                    {listing.transmission === "4x4"
                      ? listing.transmission
                      : `${listing.transmission} wheel drive`}{" "}
                    · {commafy(listing.mileage)} Km
                  </Card.Text>
                  <Card.Text
                    style={{
                      marginTop: "45px",
                      width: "30rem",
                      marginRight: "0px",
                    }}
                  >
                    <>
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip>
                            See all from <strong>{listing.location}</strong>.
                          </Tooltip>
                        }
                      >
                        <Button variant="light" style={{ color: "	#696969" }}>
                          {" "}
                          <ImLocation style={{ marginBottom: "5px" }} />{" "}
                          {listing.location}
                        </Button>
                      </OverlayTrigger>
                    </>
                  </Card.Text>
                </Col>
                <Col style={{ textAlign: "right", marginRight: "25px" }}>
                  <Card.Text
                    style={{
                      marginTop: "25px",
                      color: "#6495ED",
                      fontWeight: "bolder",
                      fontSize: "1.5rem",
                    }}
                  >
                    {commafy(listing.price)} EUR
                  </Card.Text>
                  <Button
                    variant="light  "
                    style={{ marginTop: "60px", backgroundColor: "	#87CEFA" }}
                  >
                    Add to favorites{" "}
                    <AiOutlineHeart style={{ marginBottom: "3px" }} />
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Listings;
