import styled from "styled-components";

export const FormWrapper = styled.div`
  z-index: 10;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: rgb(51, 51, 51, 0.8);
  background-cover: fill;
`;

export const FormContainer = styled.div`
  background: white;
  z-index: 1;
  position: absolute;
  border-radius: 15px;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;

export const HeaderText = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const Input = styled.input`
  width: 100%;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
`;

export const SelectInput = styled.select`
  width: 104.5%;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
`;

export const ConfirmButton = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignupComponent = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const SignupText = styled.p`
  font-size: 0.8em;
  color: #ccc;
  margin-right: 5px;
`;

export const SignupClick = styled.p`
  font-size: 0.8em;
  color: black;
  cursor: pointer;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
`;
