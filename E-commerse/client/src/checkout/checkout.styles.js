import styled from "styled-components";

export const CheckoutWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 95vh;
  background-color: white;
`;

export const CheckoutContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 60%;
  height: 80%;
  margin: 20px 0;
  border: 1px solid grey;
  border-radius: 10px;
`;

export const CheckoutHeader = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid grey;
`;

export const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 10px;
`;

export const MiniHeader = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin: 5px 0;
`;

export const CheckoutBody = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin: 20px;
`;

export const CheckoutFooter = styled.div`
  width: 100%;
  padding: 5px 0px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCalculatorCard = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

export const TotalBox = styled.div`
  display: flex;
  flex-flow: column;
  width: 300px;
`;

export const ItemTotalLine = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

export const TaxPriceLine = styled(ItemTotalLine)`
  border-bottom: 1px solid black;
`;

export const TotalText = styled.p`
  font-weight: bold;
  margin: 0;
`;

export const ShippingInfoCard = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 30%;
  border: 1px solid grey;
  border-radius: 5px;
`;

export const BillingInput = styled.input`
  width: 80%;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  margin: 5px 0;
`;

export const CheckBoxBox = styled.div`
  width: 80%;
  display: flex;
  flex-flow: row;
  algin-items: center;
  margin-bottom: 5px;
`;

export const BillingInfoCard = styled(ShippingInfoCard)``;

export const ConfirmOrderButton = styled.button`
  border-radius: 5px;
  border: 1px solid grey;
  color: black;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  padding: 2px 4px;
  margin: 0px 8px;
`;
