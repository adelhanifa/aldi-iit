import React, { useState, useEffect } from "react";
import { Creators as cartActions } from "../redux/ducks/cart";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Ratio from "react-bootstrap/Ratio";
import Button from "react-bootstrap/Button";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

function ProductDisplay({ item, cartState, cartActions }) {
  const initialCartItem = { id: item.id, quantity: 0 };
  const [cartItem, setCartItem] = useState(initialCartItem);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const index = cartState.list.findIndex((listItem) => listItem.id === item.id);
    if (index !== -1) {
      setCartItem({ ...cartState.list[index] });
    }
  }, [cartState.list, item]);

  function addToCart() {
    if (cartItem.quantity === 0) {
      cartActions.addProduct({ id: item.id, quantity: item.minOrderAmount });
    } else {
      cartActions.updateProduct({
        id: item.id,
        quantity: cartItem.quantity + 1,
      });
    }
    setShow(true);
  }

  return (
    <Col>
      <Card
        className={`position-relative ${
          item.availableAmount - cartItem.quantity === 0 &&
          "opacity-50 position-relative"
        }`}
      >
        <ToastContainer className="p-1" position={"bottom-center"}>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={1000}
            autohide
            bg={"info"}
          >
            <Toast.Body>Added to cart</Toast.Body>
          </Toast>
        </ToastContainer>

        <Card.Header>
          <Ratio aspectRatio={"4x3"}>
            <Card.Img variant="top" src={item.image} />
          </Ratio>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <b>{item.name}</b>
          </Card.Title>
          <Card.Text className="d-flex justify-content-between">
            Quantity Available: <span>{item.availableAmount - cartItem.quantity}</span>
          </Card.Text>
          <Card.Text className="d-flex justify-content-between">
            Minimum Order Quantity: <span>{item.minOrderAmount}</span>
          </Card.Text>
          <Card.Text className="d-flex justify-content-between">
            Price: <span>{item.price.toFixed(2)}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {item.availableAmount - cartItem.quantity === 0 ? (
            <Button className="w-100" variant="danger" disabled>
              Sold Out
            </Button>
          ) : (
            <Button
              className="w-100"
              variant="success"
              onClick={() => addToCart()}
            >
              <i className="bi bi-cart-plus"></i> Add To Cart
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Col>
  );
}

ProductDisplay.propTypes = {
  item: PropTypes.object,
  cartState: PropTypes.object,
  cartActions: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  cartActions: bindActionCreators(cartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
