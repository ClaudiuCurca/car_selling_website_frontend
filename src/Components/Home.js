import Axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

// Components
import Search from "./Search";

import commafy from "./Assets/UsefulFunctions";

function Home() {
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
    <div>
      <h2 style={{ textAlign: "center", paddingTop: "30px" }}>
        What car are you looking for?
      </h2>
      <Search />
      <hr style={{ padding: "0px", marginTop: "25px", marginBottom: "0px" }} />
      <div
        style={{
          backgroundColor: "#F0F8FF",
          paddingBottom: "1rem",
          paddingTop: "1rem",
        }}
      >
        {" "}
        <h2
          style={{
            paddingBottom: "2rem",
            textAlign: "center",
            paddingTop: "10px",
          }}
        >
          Latest Listings
        </h2>
        <Row style={{ marginRight: "0px" }}>
          {" "}
          {allListings.slice(0, 7).map((listing) => {
            return (
              <Card
                style={{
                  width: "16rem",
                  cursor: "pointer",
                  marginLeft: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Card.Img
                  variant="top"
                  src={listing.picture1}
                  style={{
                    width: "230px",
                    height: "150px",
                    margin: "0 auto",
                    marginTop: "10px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Text>
                    {listing.fabrication_year} · {listing.cylinder_capacity}{" "}
                    {listing.engine} · {listing.gearbox} ·{" "}
                    {listing.transmission === "4x4"
                      ? listing.transmission
                      : `${listing.transmission} wheel drive`}{" "}
                    · {commafy(listing.mileage)} Km
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bolder" }}>
                    {commafy(listing.price)} EUR
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Home;
