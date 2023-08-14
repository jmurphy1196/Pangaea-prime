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

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(thunkGetSession());
    })();
  }, [dispatch]);

  return (
    <>
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
      </Switch>
    </>
  );
}

export default App;
