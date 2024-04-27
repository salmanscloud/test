import styled from "styled-components";

export const CartWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  min-height: 95vh;
  background-color: white;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 60%;
  margin: 20px 0;
  border: 1px solid black;
`;

export const CartHeader = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid black;
`;

export const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 10px;
`;

export const CartTotal = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 10px;
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

export const CartItemCard = styled.div`
  display: flex;
  flex-flow: row;
  padding: 10px;
`;

export const CartItemImg = styled.img`
  align-self: center;
  min-width: 100px;
  max-width: 100px;
  min-height: 100px;
  max-height: 100px;
  padding-right: 5px;
`;

export const CartItemDetails = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px;
  border-left: 1px solid black;
`;

export const CartItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 5px 0;
`;

export const CartItemDescription = styled.p`
  font-size: 1rem;
  margin: 0 0 5px 0;
`;

export const CartItemPrice = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const CartItemQuantity = styled.input`
  width: 35px;
  height: 25px;
  font-size: 1rem;
  margin: 2px 5px;
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 0 5px;
`;

export const CartTotalContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-left: 1px solid black;
`;

export const CartDetailsContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  justify-content: space-between;
`;

export const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 2px;
  font-weight: bold;
  cursor: pointer;
`;

export const CartUpdateOptions = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
`;
