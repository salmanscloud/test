import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  showSignup,
  toggleBetweenSigninAndSignup,
} from "../../redux/slices/formToggleSlice";
import { signup } from "../../api/authAPI";
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
} from "../signin/forms.styles";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordCheck: "",
    error: "",
  });

  const { firstName, lastName, email, password, passwordCheck, error } = values;

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
      await setValues({ ...values, error: false });
      const data = await signup({
        firstName,
        lastName,
        email,
        password,
        passwordCheck,
      });
      if (data.msg) {
        setValues({
          ...values,
          error: data.msg,
        });
      } else {
        setValues({
          ...values,
          error: false,
        });
        dispatch(toggleBetweenSigninAndSignup());
      }
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
    <FormWrapper onClick={() => dispatch(showSignup())}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => dispatch(showSignup())}>X</CloseButton>
        <Header>
          <HeaderText>Please Sign Up</HeaderText>
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
            placeholder="First Name"
            onChange={handleChange("firstName")}
            type="text"
            className="form-control"
            value={firstName}
          />
          <Input
            placeholder="Last Name"
            onChange={handleChange("lastName")}
            type="text"
            className="form-control"
            value={lastName}
          />
          <Input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
            placeholder="password"
          />
          <Input
            onChange={handleChange("passwordCheck")}
            type="password"
            className="form-control"
            value={passwordCheck}
            placeholder="Verify password"
          />
          <ConfirmButton onClick={(e) => handleSubmit(e)}>
            Sign Up
          </ConfirmButton>
          {showError()}
          <SignupComponent>
            <SignupText>Already a member?</SignupText>
            <SignupClick
              onClick={() => dispatch(toggleBetweenSigninAndSignup())}
            >
              Sign In
            </SignupClick>
          </SignupComponent>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

export default Signup;
