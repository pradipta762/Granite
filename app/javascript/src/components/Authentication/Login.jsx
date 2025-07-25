import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import Logger from "js-logger";
import { setToLocalStorage } from "utils/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: email.toLowerCase(),
        userId: response.data.id,
        userName: response.data.name,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default Login;
