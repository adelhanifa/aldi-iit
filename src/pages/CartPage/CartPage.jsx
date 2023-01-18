import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import CartItemDisplay from "../../components/CartItemDisplay";

function CartPage({ cartState }) {
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalPriceValue, setTotalPriceValue] = useState(0);

  useEffect(() => {
    if (totalPrice.length > 0) {
      const sum = totalPrice.reduce((pv, cv) => pv + Number(cv), 0);
      setTotalPriceValue(sum);
    }
  }, [totalPrice]);

  function handelUpdateTotalPrice(price, index) {
    const newTotalPrice = totalPrice;
    newTotalPrice[index] = price;
    setTotalPrice([...newTotalPrice]);
  }

  function handelRemoveTotalPrice(index) {
    const newTotalPrice = totalPrice;
    newTotalPrice.splice(index, 1);
    setTotalPrice([...newTotalPrice]);
  }

  return (
    <>
      <h5 className="py-3">Check your cart: </h5>

      {cartState.list.length === 0 ? (
        <Alert variant="danger">
          You have not added any product to your shopping cart. Go to home page,
          browse our products and add everything you need to cart.
        </Alert>
      ) : (
        <>
          <Table striped responsive className="cartTable">
            <thead>
              <tr>
                <th>#</th>
                <th className="w-25">Product Name</th>
                <th className="text-end">Quantity</th>
                <th className="text-end">Price</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartState.list.map((item, index) => (
                <CartItemDisplay
                  item={item}
                  index={index + 1}
                  key={item.id}
                  updateTotal={(price) => handelUpdateTotalPrice(price, index)}
                  removeTotal={() => handelRemoveTotalPrice(index)}
                />
              ))}
            </tbody>
          </Table>
          <p className="w-100 d-flex justify-content-end py-4 px-1">
            <b className="pe-5">Total price:</b>
            <span className="ps-2">{totalPriceValue.toFixed(2)}</span>
          </p>
        </>
      )}
    </>
  );
}

CartPage.propTypes = {
  cartState: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartState: state.cartReducer,
});

export default connect(mapStateToProps)(CartPage);
