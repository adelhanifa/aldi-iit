import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

function TopNav({ cartState }) {
  const history = useHistory();

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand>My E-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="position-relative"
              onClick={() => history.push("/cart")}
            >
              My Cart <i className="bi bi-cart4"></i>
              {cartState.list.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-3 start-0 translate-middle"
                >
                  {cartState.list.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

TopNav.propTypes = {
  cartState: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
});

export default connect(mapStateToProps)(TopNav);
