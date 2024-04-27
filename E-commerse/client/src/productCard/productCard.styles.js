import styled from "styled-components";

export const ProductCardContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  cursor: pointer;
  height: 400px;
  width: 300px;
  margin: 20px 30px;
  padding: 8px;
  &:hover {
    border: 1px solid grey;
    box-shadow: 0px 0px 10px grey;
    border-radius: 10px;
  }
`;

export const ProductTitle = styled.h1`
  padding: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
`;

export const ProductDescription = styled.p`
  padding: 5px;
  font-size: 1rem;
  margin: 0;
`;

export const ProductPrice = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const ProductImageContainer = styled.div``;

export const ProductFooter = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const ProductIcons = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
  height: 30px;
`;

export const AddToCart = styled.button`
  font-size: 1rem;
  padding: 5px;
  margin: 0;
  border: none;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: white;
  &:hover {
    transform: scale(1.01);
    border: 1px solid grey;
    border-radius: 10px;
    border-box: box-sizing;
  }
`;
