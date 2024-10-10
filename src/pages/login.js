import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login.api";
import { useAuth } from "../auth/AuthProvider";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const user = {
    username: username,
    password: password,
  };

  const actualUser = JSON.stringify(user);

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      auth.loginaAction(actualUser);
      return;
    }
    alert("pleae provide a valid input");
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your email here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={handleSubmitEvent}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
