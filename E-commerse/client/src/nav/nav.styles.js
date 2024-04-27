import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavWrapper = styled.div`
  background: grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 5vh;
`;

export const NavGroup = styled.ul`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin: 0;
`;

export const NavItem = styled(Link)`
  list-style: none;
  margin: 0 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
  background: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.cart ? "white" : "black")};
    color: ${(props) => (props.cart ? "black" : "white")};
  }
`;

export const NavButton = styled.button`
  border: none;
  font-family: Roboto, sans-serif;
  font-size: 15px;
  margin: 0 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`;
