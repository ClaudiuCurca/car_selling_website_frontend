import Axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        console.log(response.data);
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
    <div style={{ backgroundColor: "#F0FFFF" }}>
      {allListings.map((listing) => {
        return (
          <div
            style={{
              width: "90%",
              marginLeft: "50px",
              paddingTop: "25px",
              paddingBottom: "25px",
            }}
          >
            <Card style={{ height: "200px" }}>
              <Row>
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    src={listing.picture1}
                    style={{
                      width: "200px",
                      height: "150px",
                      marginLeft: "25px",
                      marginTop: "25px",
                    }}
                  />
                </Col>
                <Col>
                  <Card.Text
                    style={{
                      marginTop: "25px",
                      marginBottom: "0px",
                      fontWeight: "bolder",
                      fontSize: "1.7rem",
                    }}
                  >
                    {listing.title}
                  </Card.Text>
                  <Card.Text style={{ color: "#A9A9A9", fontSize: "0.9rem" }}>
                    {listing.fabrication_year}
                  </Card.Text>
                </Col>
                <Col>Hello again</Col>
              </Row>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Listings;
