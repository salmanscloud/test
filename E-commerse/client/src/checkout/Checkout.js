import React, { useState, useEffect } from "react";
import { clearCart, getCart } from "../cart/cartHelper";
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutWrapper,
  Header,
  CheckoutBody,
  CheckoutFooter,
  TotalCalculatorCard,
  TotalBox,
  TaxPriceLine,
  ItemTotalLine,
  TotalText,
  ShippingInfoCard,
  BillingInfoCard,
  BillingInput,
  MiniHeader,
  CheckBoxBox,
  ConfirmOrderButton,
} from "./checkout.styles";
import { NavItem } from "../nav/nav.styles";
import { addOrderToHistory } from "../api/userAPI";
import { isAuthenticated } from "../api/authAPI";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  const { token, user } = isAuthenticated();

  const navigate = useNavigate();

  const totalItemCost = () => {
    let total = 0;
    cartItems.map((item) => {
      return (total += item.price * item.count);
    });
    return total.toFixed(2);
  };

  const totalTaxCost = () => {
    let total = 0;
    cartItems.map((item) => {
      return (total += item.price * item.count);
    });
    let taxTotal = ((total * 9.75) / 100).toFixed(2);
    return taxTotal;
  };

  const totalCost = () => {
    let total = 0;
    cartItems.map((item) => {
      return (total += item.price * item.count);
    });
    let taxTotal = ((total * 9.75) / 100).toFixed(2);
    let totalCost = (total + parseFloat(taxTotal)).toFixed(2);
    return totalCost;
  };

  useEffect(() => {
    const cartItems = getCart();
    setCartItems(cartItems);
  }, []);

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      if (cartItems.length < 1) {
        return;
      }
      await addOrderToHistory(
        { order: cartItems, dateOrdered: new Date(), orderId: uuid() },
        user.id,
        token
      );
      toast.success("Order Placed Successfully");
      if (user.role === 0) {
        navigate(`/user/dashboard`);
      } else {
        navigate(`/admin/dashboard`);
      }
      clearCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CheckoutWrapper>
      <CheckoutContainer>
        <CheckoutHeader>
          <Header>Checkout</Header>
        </CheckoutHeader>
        <CheckoutBody>
          <ShippingInfoCard>
            <MiniHeader>Shipping</MiniHeader>
            <BillingInput
              placeholder="First Name"
              type="firstName"
              className="form-control"
            />
            <BillingInput
              placeholder="Last Name"
              type="lastName"
              className="form-control"
            />
            <BillingInput
              placeholder="Address"
              type="address"
              className="form-control"
            />
            <BillingInput
              placeholder="City/State"
              type="city/state"
              className="form-control"
            />
            <BillingInput
              placeholder="Zip Code"
              type="zip"
              className="form-control"
            />
            <CheckBoxBox>
              <input
                style={{ alignSelf: "start" }}
                placeholder="Phone Number"
                type="checkbox"
                className="form-control"
              />
              <label>Use address for billing</label>
            </CheckBoxBox>
          </ShippingInfoCard>
          <BillingInfoCard>
            <MiniHeader>Billing</MiniHeader>
            <BillingInput
              placeholder="Full name on card"
              type="text"
              className="form-control"
            />
            <BillingInput
              placeholder="Card Number"
              type="number"
              className="form-control"
            />
            <BillingInput
              placeholder="CVC"
              type="number"
              className="form-control"
            />
            <BillingInput
              placeholder="Expiration Date"
              type="date"
              className="form-control"
            />
            <BillingInput
              placeholder="Zip Code"
              type="number"
              className="form-control"
            />
          </BillingInfoCard>
          <TotalCalculatorCard>
            <TotalBox>
              <ItemTotalLine>
                <TotalText>Items({cartItems.length}):</TotalText>
                <TotalText>${totalItemCost()}</TotalText>
              </ItemTotalLine>
              <TaxPriceLine>
                <TotalText>Tax:</TotalText>
                <TotalText>+ ${totalTaxCost()}</TotalText>
              </TaxPriceLine>
              <ItemTotalLine>
                <TotalText>Total:</TotalText>
                <TotalText>${totalCost()}</TotalText>
              </ItemTotalLine>
            </TotalBox>
          </TotalCalculatorCard>
        </CheckoutBody>
        <CheckoutFooter>
          <NavItem cart={"true"} to="/cart">
            Back to Cart...
          </NavItem>
          <ConfirmOrderButton onClick={(e) => submitOrder(e)}>
            Order!
          </ConfirmOrderButton>
        </CheckoutFooter>
        <ToastContainer autoClose={2000} />
      </CheckoutContainer>
    </CheckoutWrapper>
  );
};

export default Checkout;
