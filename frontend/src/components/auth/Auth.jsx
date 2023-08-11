import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "../../styles/components/auth.css";
import { thunkCreateUser, thunkSetSession } from "../../store/session";

//eslint-disable-next-line
export function Auth({ signin, signup }) {
  const [credential, setCredential] = useState("");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setErrors({});
  }, [signin, signup]);
  const loginDemo = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      thunkSetSession({ credential: "Demo-lition", password: "password" })
    );
    if (res.user) history.push("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signin) {
      const res = await dispatch(thunkSetSession({ credential, password }));
      console.log("This is the res", res);
      if (res.user) history.push("/");
      if (res.errors) {
        const newErrors = {};
        newErrors.title = res.title;
        if (res.errors.credential) newErrors.credential = res.errors.credential;
        setErrors(newErrors);
      }
    } else {
      const res = await dispatch(
        thunkCreateUser({ email, username, password, firstName, lastName })
      );

      //   TODO DRY THIS UP
      if (res.user) history.push("/");
      if (res.errors) {
        const newErrors = {};
        newErrors.title = res.title;
        if (res.errors.username) newErrors.username = res.errors.username;
        if (res.errors.email) newErrors.email = res.errors.email;
        if (res.errors.password) newErrors.password = res.errors.password;
        if (res.errors.firstName) newErrors.firstName = res.errors.firstName;
        if (res.errors.lastName) newErrors.lastName = res.errors.lastName;
        setErrors(newErrors);
      }
    }
  };
  const signinFormGroups = (
    <>
      <div className='auth__form__group'>
        <label className={`${errors.credential && "errors"}`}>
          Email or Username
        </label>
        <input type='text' onChange={(e) => setCredential(e.target.value)} />
      </div>
      <div className='auth__form__group'>
        <label className={`${errors.credential && "errors"}`}>Password</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
      </div>
    </>
  );
  const signupFormGroups = (
    <>
      <div className='auth__form__group'>
        <label>Email</label>
        <input type='email' onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='auth__form__group'>
        <label className={`${errors.username && "errors"}`}>Username</label>
        <input type='text' onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className='auth__form__group'>
        <label>Password</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='auth__form__group'>
        <label>First name</label>
        <input type='text' onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className='auth__form__group'>
        <label>Last name</label>
        <input type='text' onChange={(e) => setLastName(e.target.value)} />
      </div>
    </>
  );
  console.log("errors", errors);
  return (
    <div className='auth-page'>
      <div className='auth-page__logo'>
        <img src='/images/pangaea-logo-black.png' alt='' />
      </div>
      <form className='auth__form' onSubmit={handleSubmit}>
        <h1 className='auth__form__header'>{signin ? "Sign in" : "Sign up"}</h1>
        {errors && <span className='errors'>{errors.title}</span>}
        {signin && signinFormGroups}
        {signup && signupFormGroups}
        {signin && (
          <button className='auth__form__demo' onClick={loginDemo}>
            Demo user
          </button>
        )}
        <button className='auth__form__submit' type='submit'>
          {signin ? "Signin" : "Signup"}
        </button>
      </form>
      <div className='auth-page__account'>
        <div className='auth-page__border'>
          <div className='auth-page__border-left'></div>
          <span>{signin ? "New to Pangaea?" : "Have an account? "}</span>
          <div className='auth-page__border-right'></div>
        </div>
        <Link to={signin ? "/signup" : "/signin"}>
          {signin ? "Create your account" : "Signin"}
        </Link>
      </div>
    </div>
  );
}
