import styled from "styled-components";

export const ProductDetailWrapper = styled.div`
  z-index: 10;
  display: ${(props) => (props.show ? "flex" : "none")};
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

export const ProductDetailContainer = styled.div`
  background: white;
  z-index: 1;
  position: absolute;
  border-radius: 15px;
  padding: 20px;
  max-height: 500px;
  max-width: 960px;
  display: flex;
`;

export const ProductDetailImg = styled.img`
  width: 50%;
  height: 100%;
  border-radius: 5px;
  padding: 5px;
`;

export const ProductDetailSection = styled.div`
  display: flex;
  flex-flow: column;
  padding: 5px;
  justify-content: space-between;
  width: 100%;
`;

export const ProductDetailGroup = styled.div`
  display: flex;
  flex-flow: ${(props) => (props.row ? "row" : "column")};
  padding: 5px;
  justify-content: ${(props) => (props.row ? "space-between" : "center")};
  width: 100%;
`;
