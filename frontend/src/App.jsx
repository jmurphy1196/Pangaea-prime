import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSession } from "./store/session";
import { Navigation } from "./components/Navigation";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./components/pages/LandingPage";
import { Auth } from "./components/auth/Auth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { MyAccount } from "./components/account/MyAccount";
import { ProductsPage } from "./components/pages/ProductsPage";
import { SellPage } from "./components/pages/SellPage";
import { ProductPage } from "./components/pages/ProductPage";
import { thunkGetCart } from "./store/cart";
import { CartPage } from "./components/pages/CartPage";
import { CreateOrder } from "./components/CreateOrder";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MyOrders } from "./components/MyOrders";
import { OrderPage } from "./components/pages/OrderPage";

const stripePromise = loadStripe(
  "pk_test_51I7K2nLQef5YAp3FLPhtvRil2HHtICqqjJLflNVcc9pzhQ5T4rEnDJ7pPh733MqV3Ip7x4wwfLT52manvE9771cy00Bh1pPVZl"
);

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(thunkGetSession());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      (async () => {
        await dispatch(thunkGetCart());
      })();
    }
  }, [user, dispatch]);

  return (
    <>
      <Elements stripe={stripePromise}>
        <Navigation />
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>

          <Route exact path='/signin'>
            <Auth signin />
          </Route>
          <Route exact path='/signup'>
            <Auth signup />
          </Route>
          <Route path='/products'>
            <ProductsPage />
          </Route>
          <Route exact path='/product/:productId'>
            <ProductPage />
          </Route>
          <ProtectedRoute exact path='/sell'>
            <SellPage />
          </ProtectedRoute>
          <Route exact path='/product/:productId/edit'>
            <SellPage edit />
          </Route>
          <ProtectedRoute exact path='/account'>
            <MyAccount />
          </ProtectedRoute>
          <ProtectedRoute exact path='/cart'>
            <CartPage />
          </ProtectedRoute>
          <ProtectedRoute exact path='/order'>
            <CreateOrder />
          </ProtectedRoute>
          <ProtectedRoute exact path='/orders'>
            <MyOrders />
          </ProtectedRoute>
          <ProtectedRoute exact path='/orders/:orderId'>
            <OrderPage />
          </ProtectedRoute>
        </Switch>
      </Elements>
    </>
  );
}

export default App;
