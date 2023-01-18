import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";

import TopNav from "../components/TopNav";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import CartPage from "../pages/CartPage/CartPage";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="App">
      <TopNav />

      <main>
        <Container className="mainContainer">
          <Switch>
            <Route exact path="/" component={ProductsPage} />
            <Route exact path="/cart" component={CartPage} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default App;
