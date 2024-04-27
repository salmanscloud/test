import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  showSignin,
  toggleBetweenSigninAndSignup,
} from "../../redux/slices/formToggleSlice";
import { setCurrentUser } from "../../redux/slices/authSlice";
import { signin, authenticate } from "../../api/authAPI";
import {
  FormContainer,
  FormWrapper,
  Header,
  HeaderText,
  Form,
  Input,
  ConfirmButton,
  SignupComponent,
  SignupText,
  SignupClick,
  CloseButton,
} from "./forms.styles";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });
  const { email, password, error } = values;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setValues({
        ...values,
        error: false,
      });
      const data = await signin({ email, password });
      if (data.msg) {
        setValues({
          ...values,
          error: data.msg,
          loading: false,
        });
      } else {
        await authenticate(data);
        await dispatch(setCurrentUser(data));
        await setValues({
          ...values,
          error: false,
        });
        await dispatch(showSignin());
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAdminDemoSignin = async (e) => {
    e.preventDefault();
    try {
      const data = await signin({
        email: "admin@admin.com",
        password: "password1",
      });
      authenticate(data);
      dispatch(setCurrentUser(data));
      dispatch(showSignin());
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUserDemoSignin = async (e) => {
    e.preventDefault();
    try {
      const data = await signin({
        email: "user@user.com",
        password: "password1",
      });
      authenticate(data);
      dispatch(setCurrentUser(data));
      dispatch(showSignin());
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const showError = () => (
    <div
      style={{
        display: error ? "" : "none",
        color: "red",
        fontSize: "0.8rem",
        marginBottom: "0.5rem",
      }}
    >
      {error}
    </div>
  );

  return (
    <FormWrapper onClick={() => dispatch(showSignin())}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => dispatch(showSignin())}>X</CloseButton>
        <Header>
          <HeaderText>Please Sign in</HeaderText>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Email address"
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
          <Input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
            placeholder="password"
          />
          <ConfirmButton onClick={(e) => handleSubmit(e)}>
            Sign In
          </ConfirmButton>
          <ConfirmButton onClick={(e) => handleAdminDemoSignin(e)}>
            Sign In as Admin
          </ConfirmButton>
          <ConfirmButton onClick={(e) => handleUserDemoSignin(e)}>
            Sign In as User
          </ConfirmButton>
          {showError()}
          <SignupComponent>
            <SignupText>Not a member?</SignupText>
            <SignupClick
              onClick={() => dispatch(toggleBetweenSigninAndSignup())}
            >
              Join Us
            </SignupClick>
          </SignupComponent>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

export default Signin;
