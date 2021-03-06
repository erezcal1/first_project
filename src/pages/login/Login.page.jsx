/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import axios from "axios";
import Joi from "joi-browser";
import loginSchema from "../../validation/login.validation";
import { toast } from "react-toastify";
// import { authActions } from "../../store/auth";
// https://www.npmjs.com/package/jwt-decode
// import jwt_decode from "jwt-decode";
import { useHistory, useLocation } from "react-router-dom";
import useAfterLogin from "../../hooks/useafterLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show_Err_Msg, setShowErrMsg] = useState(false);

  // const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const afterLogin = useAfterLogin();

  useEffect(() => {
    console.log(location);
    if (location.state && location.state.email && location.state.password) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, []);

  useEffect(() => {
    console.log(email);
  }, [email]);

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      location.state &&
      location.state.email &&
      location.state.password
    ) {
      handle_Submit();
    }
  }, [email, password]);

  const handle_Email_Change = (event) => {
    setEmail(event.target.value);
  };
  const handle_Password_Change = (event) => {
    setPassword(event.target.value);
  };
  const handle_Submit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validated_Value = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validated_Value;
    if (error) {
      //invalid email or password
      //https://fkhadra.github.io/react-toastify/introduction/
      toast.error("🦄 Invalid Email Or Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios
        .post("/auth", {
          email,
          password,
        })
        .then(({ data }) => {
          // localStorage.setItem("token", data.token);
          // dispatch(authActions.login()); //update redux state
          setShowErrMsg(false);
          // dispatch(authActions.updateUserData(jwt_decode(data.token)));
          // useAfterLogin(data.token);
          afterLogin(data.token);
          history.push("/dashboard"); //navigate to another page
        })
        .catch((err) => {
          setShowErrMsg(true);
          console.log("error from axios", err);
        });
    }
  };

  return (
    <form onSubmit={handle_Submit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={handle_Email_Change}
        />
        {/* if state */}
        {!email && (
          <div id="emailHelp" className="form-text">
            please enter your email address
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={handle_Password_Change}
        />
        {password.length < 6 && (
          <div id="emailHelp" className="form-text">
            please enter your password with at least 6 digits
          </div>
        )}
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      {show_Err_Msg && (
        <div className="alert alert-danger" role="alert">
          Email or Password is incorrect
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default LoginPage;
