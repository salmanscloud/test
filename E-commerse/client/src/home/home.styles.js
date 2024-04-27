import styled from "styled-components";
import { BsTrash, BsRecycle, BsCheckLg, BsXCircle } from "react-icons/bs";

export const HomeWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  background-cover: fill;
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  margin: 30px 30px;
`;

export const CategoryLinks = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  min-width: 20%;
`;

export const ProductCategoryTitle = styled.h1`
  padding: 8px;
  margin: 5px;
  border-bottom: 1px solid #ccc;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 80%;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

export const CategoryLinksCard = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 10px;
  min-width: 60%;
`;

export const CategoryLinksItems = styled.h4`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-box: box-sizing;
  cursor: pointer;
  margin: 0;
  min-width: 100%;
  &:hover {
    text-decoration: underline;
  }
`;

export const CategoryLinkContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-box: box-sizing;
  min-width: 100%;
`;

export const CategoryIcons = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  height: 100%;
`;

export const UpdateIcon = styled(BsRecycle)`
color: green;
cursor: pointer;
margin: 3px 5px;
padding: 2px;
font-size: 1.3rem;
&:hover {
    border: 1px solid grey;
    border-radius: 5px;
`;

export const DeleteIcon = styled(BsTrash)`
  color: red;
  cursor: pointer;
  margin: 3px 5px;
  padding: 2px;
  font-size: 1.3rem;
  &:hover {
    border: 1px solid grey;
    border-radius: 5px;
  }
`;

export const InStockIcon = styled(BsCheckLg)`
  color: green;
  cursor: pointer;
  margin: 0px 5px;
  padding: 2px;
  font-size: 1.3rem;
`;

export const CancelIcon = styled(BsXCircle)`
  color: red;
  cursor: pointer;
  margin: 0px 5px;
  padding: 2px;
  font-size: 1.3rem;
  &:hover {
    border: 1px solid grey;
    border-radius: 5px;
  }
`;
