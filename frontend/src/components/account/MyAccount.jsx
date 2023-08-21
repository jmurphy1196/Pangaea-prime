import "../../styles/components/myAccount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkRemoveSession } from "../../store/session";

export function MyAccount() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  if (!user) return false;
  return (
    <div className='my-account'>
      <header className='my-account__heading'>
        <h1>
          My Account
          <FontAwesomeIcon icon={faUser} />
        </h1>
      </header>
      <div className='my-account__links'>
        <ul>
          <li>
            <Link to={`/products?usrId=${user.id}`}>
              My Products <FontAwesomeIcon icon={faCaretRight} />
            </Link>
          </li>
          <li>
            <Link to='/orders'>
              My Orders <FontAwesomeIcon icon={faCaretRight} />{" "}
            </Link>
          </li>
          <li>
            <Link onClick={async () => await dispatch(thunkRemoveSession())}>
              Sign Out <FontAwesomeIcon icon={faCaretRight} />{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
