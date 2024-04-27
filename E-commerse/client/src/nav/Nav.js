import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSignin, showSignup } from "../redux/slices/formToggleSlice";
import { isAuthenticated, signout } from "./../api/authAPI";
import { NavWrapper, NavGroup, NavItem, NavButton } from "./nav.styles";
import Signin from "../user/signin/Signin";
import Signup from "../user/signup/Signup";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signin, signup } = useSelector((state) => state.formToggleSlice);

  return (
    <NavWrapper>
      {signin && <Signin />}
      {signup && <Signup />}
      <NavGroup>
        <NavItem to="/">Home</NavItem>
      </NavGroup>
      <NavGroup>
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <NavItem to="/admin/dashboard">
            {isAuthenticated().user.firstName}
          </NavItem>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <NavItem to="/user/dashboard">
            {isAuthenticated().user.firstName}
          </NavItem>
        )}

        {!isAuthenticated() && (
          <NavButton onClick={() => dispatch(showSignin())}>Sign In</NavButton>
        )}
        {!isAuthenticated() && (
          <NavButton onClick={() => dispatch(showSignup())}>Sign Up</NavButton>
        )}

        {isAuthenticated() && (
          <NavButton onClick={() => signout(() => navigate("/"))}>
            Log Out
          </NavButton>
        )}

        <NavItem to="/cart">Cart</NavItem>
      </NavGroup>
    </NavWrapper>
  );
};

export default Nav;
