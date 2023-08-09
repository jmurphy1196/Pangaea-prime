import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSession } from "./store/session";
import { Navigation } from "./components/Navigation";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./components/pages/LandingPage";

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
      </Switch>
    </>
  );
}

export default App;
