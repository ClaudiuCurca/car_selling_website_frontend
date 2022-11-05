import React from "react";

// react-bootstrap
import { Stack, Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <hr style={{ marginTop: "0px" }} />
      <Container>
        <Row>
          <Col className="text-center py-3">
            {" "}
            <Stack gap={3}>
              <div>First item</div>
              <div>Second item</div>
              <div>Third item</div>
            </Stack>
          </Col>
          <Col className="text-center py-3">
            {" "}
            <Stack gap={3}>
              <div>First item</div>
              <div>Second item</div>
              <div>Third item</div>
            </Stack>
          </Col>
          <Col className="text-center py-3">
            {" "}
            <Stack gap={3}>
              <div>First item</div>
              <div>Second item</div>
              <div>Third item</div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer;
