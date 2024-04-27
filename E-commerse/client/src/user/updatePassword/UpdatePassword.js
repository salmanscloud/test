import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../api/authAPI";
import { changePassword } from "../../api/userAPI";
import { showChangePasswordForm } from "../../redux/slices/formToggleSlice";
import {
  CloseButton,
  FormContainer,
  FormWrapper,
  Header,
  HeaderText,
  Form,
  Input,
  ConfirmButton,
} from "../signin/forms.styles";

const UpdatePassword = ({ toast }) => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: "",
  });
  const { oldPassword, newPassword, confirmPassword, error } = values;
  const dispatch = useDispatch();

  const { token, user } = isAuthenticated();

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
      const data = await changePassword(
        user.id,
        oldPassword,
        newPassword,
        confirmPassword,
        token
      );
      if (data.msg) {
        setValues({
          ...values,
          error: data.msg,
        });
      } else {
        await dispatch(showChangePasswordForm(false));
        toast.success("Password changed successfully");
      }
    } catch (error) {
      await setValues({
        ...values,
        error: error.response.data.msg,
      });
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
    <FormWrapper onClick={() => dispatch(showChangePasswordForm())}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => dispatch(showChangePasswordForm())}>
          X
        </CloseButton>
        <Header>
          <HeaderText>Change Password</HeaderText>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Old Password"
            onChange={handleChange("oldPassword")}
            type="password"
            value={oldPassword}
          />
          <Input
            placeholder="New Password"
            onChange={handleChange("newPassword")}
            type="password"
            value={newPassword}
          />
          <Input
            placeholder="Confirm Password"
            onChange={handleChange("confirmPassword")}
            type="password"
            value={confirmPassword}
          />
          <ConfirmButton onClick={(e) => handleSubmit(e)}>
            Change Password
          </ConfirmButton>
          {showError()}
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

export default UpdatePassword;
