import React, { useState, useEffect } from "react";
import { Creators as cartActions } from "../redux/ducks/cart";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";

function CartItemDisplay({
  item,
  index,
  productsState,
  cartActions,
  updateTotal,
  removeTotal,
}) {
  const [cartItemInfo, setCartItemInfo] = useState(undefined);
  const [inputValue, setInputValue] = useState(item.quantity);
  const [inputValid, setInputValid] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const index = productsState.products.findIndex(
      (listItem) => listItem.id === item.id
    );
    if (index !== -1) {
      setCartItemInfo({ ...productsState.products[index] });
    }
  }, [item, productsState.products]);

  useEffect(() => {
    if (item.quantity && cartItemInfo && cartItemInfo.price) {
      updateTotal((item.quantity * cartItemInfo.price).toFixed(2));
    }
  }, [item.quantity, cartItemInfo]); // eslint-disable-line

  function handelInput(e) {
    setInputValid(true);
    const newValue = Number(e.target.value.replace(/\D/g, ""));
    setInputValue(newValue);
    if (
      newValue === 0 ||
      newValue > cartItemInfo.availableAmount ||
      newValue < cartItemInfo.minOrderAmount
    ) {
      setInputValid(false);
    } else {
      if (newValue !== item.quantity) {
        cartActions.updateProduct({ id: item.id, quantity: newValue });
      }
    }
  }

  function handelDelete() {
    cartActions.deleteProduct(item.id);
    removeTotal();
  }

  return (
    <>
      {cartItemInfo && (
        <>
          <tr>
            <td>{index}</td>
            <td>{cartItemInfo.name}</td>
            <td className="text-end d-flex justify-content-end">
              <InputGroup className="quantityInput" size="sm">
                <Button variant="outline-danger" onClick={() => setShow(true)}>
                  <i className="bi bi-trash"></i>
                </Button>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      Enter an Number between <strong>{cartItemInfo.minOrderAmount}</strong> and <strong>{cartItemInfo.availableAmount}</strong>.
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className="text-end"
                    aria-label="quantity"
                    value={inputValue}
                    onChange={(e) => handelInput(e)}
                    isInvalid={!inputValid}
                  />
                </OverlayTrigger>
              </InputGroup>
            </td>
            <td className="text-end">{cartItemInfo.price.toFixed(2)}</td>
            <td className="text-end">
              {(item.quantity * cartItemInfo.price).toFixed(2)}
            </td>
          </tr>

          <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            size="sm"
          >
            <Modal.Body>
              Are you sure you want to remove <b>{cartItemInfo.name}</b> from the cart?
            </Modal.Body>
            <Modal.Footer className="p-1">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShow(false)}
              >
                No
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  setShow(false);
                  handelDelete();
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

CartItemDisplay.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  updateTotal: PropTypes.func,
  removeTotal: PropTypes.func,
  productsState: PropTypes.object,
  cartActions: PropTypes.object,
};

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  cartActions: bindActionCreators(cartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItemDisplay);
