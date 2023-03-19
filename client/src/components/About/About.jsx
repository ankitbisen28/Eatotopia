import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnkitBisen from "../../assets/images/AnkitBisen.png";
// import Button from "react-bootstrap/Button";
import { Instagram, Github, Linkedin, Cursor } from "react-bootstrap-icons";
import { AnkitInfo } from "./AnkitInfo";

export const About = () => {
  return (
    <Container>
      <h1 className="mt-4">About Me</h1>
      <Row className="mt-5">
        <Col xs={12} sm={10} md={6} lg={4} style={{ marginBottom: "2rem" }}>
          <img
            alt="ankitbisen"
            src={AnkitBisen}
            className="rounded-circle"
            style={{ width: "250px", height: "250px" }}
          />
        </Col>
        {AnkitInfo.map((item) => (
          <Col key={item.Index} xs={12} sm={10} md={10} lg={8}>
            <h3>{item.Title}</h3>
            <p>
              {item.Discription.detail}
              <br />
              <Cursor /> : {item.Discription.pointOne}
              <br />
              <Cursor /> : {item.Discription.pointTwo}
              <br />
              <Cursor /> : {item.Discription.pointThree}
              <br />
              <Cursor /> : {item.Discription.pointFour}
            </p>
            <Row>
              <Col>
                <h6>Name : {item.Name}</h6>
              </Col>
              <Col>
                <h6>Birthday : {item.Birthday}</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Degree : {item.Degree}</h6>
              </Col>
              <Col>
                <h6>Experience : {item.Experience}</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Email : {item.Email}</h6>
              </Col>
              <Col>
                <h6>Address : {item.Address}</h6>
              </Col>
            </Row>
            {/* <Button variant="secondary">Hire Me</Button>
          <Button variant="secondary" className="mx-3">Contact Me</Button> */}
            <h4 className="mt-5">Let's Connect</h4>
            <a
              href="https://instagram.com/ankybisen"
              className="mr-2"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://github.com/ankitbisen28"
              className="mr-2"
              target="_blank"
              rel="noreferrer"
            >
              <Github />
            </a>
            <a
              href="https://linkedin.com/in/ankitbisen28"
              className="mr-2"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
