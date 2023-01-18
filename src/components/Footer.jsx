import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Footer() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="text-muted">
          &copy;2023 Copyright Adel Hanifa
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Footer;
