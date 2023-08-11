import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);
  return (
    <Route {...props}>
      {/* eslint-disable-next-line */}
      {user ? props.children : <Redirect to='signin' />}
    </Route>
  );
};
