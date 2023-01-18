import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as productsActions } from "../../redux/ducks/products";

import Welcome from "../../components/Welcome";
import ProductDisplay from "../../components/ProductDisplay";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

function ProductsPage({ productsState, productsActions }) {
  useEffect(() => {
    if (productsState.products.length === 0 && productsState.error === false)
      productsActions.getproducts();
  }, [productsActions, productsState.error, productsState.products.length]);

  return (
    <>
      <Welcome />

      {productsState.error && !productsState.isLoading && (
        <Alert variant="danger">Error: {productsState.errorMSG}</Alert>
      )}

      <h5 className="py-3">Browse our products: </h5>

      {productsState.products &&
        productsState.products.length === 0 &&
        !productsState.isLoading && (
          <Alert variant="danger">
            No proud found .... Please come back later.
          </Alert>
        )}

      {productsState.products && productsState.products.length > 0 && (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4 mb-5">
          {productsState.products.map((item) => (
            <ProductDisplay item={item} key={item.id} />
          ))}
        </Row>
      )}
    </>
  );
}

ProductsPage.propTypes = {
  productsState: PropTypes.object,
  productsActions: PropTypes.object,
};

const mapStateToProps = (state) => ({
  productsState: state.productsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  productsActions: bindActionCreators(productsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
