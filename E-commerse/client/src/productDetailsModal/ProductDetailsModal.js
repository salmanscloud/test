import React from "react";
import {
  ProductDetailWrapper,
  ProductDetailContainer,
  ProductDetailImg,
  ProductDetailGroup,
  ProductDetailSection,
} from "../productDetailsModal/productDetailCard.styles";
import {
  ProductTitle,
  ProductDescription,
  ProductPrice,
} from "../productCard/productCard.styles";
import { CloseButton } from "../user/signin/forms.styles";
import { addItem } from "../cart/cartHelper";

const ProductDetailsModal = ({
  product,
  productDetails,
  setProductDetails,
}) => {
  const addToCart = () => {
    addItem(product);
  };

  const photoUrl = () => {
    if (process.env.NODE_ENV === "production") {
      return "https://e-commerce5850.herokuapp.com/";
    } else return `http://localhost:8000/`;
  };

  return (
    <ProductDetailWrapper
      show={productDetails.show}
      onClick={() => setProductDetails({ ...productDetails, show: false })}
    >
      <ProductDetailContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={() => setProductDetails({ ...productDetails, show: false })}
        >
          X
        </CloseButton>
        <ProductDetailImg
          src={`${photoUrl()}${product?.photo?.filePath}`}
          alt={product.name}
        />
        <ProductDetailSection>
          <ProductDetailGroup>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice style={{ padding: "5px" }}>
              ${product.price}
            </ProductPrice>
          </ProductDetailGroup>
          <ProductDetailGroup>
            <button onClick={() => addToCart()}>Add to Cart</button>
          </ProductDetailGroup>
        </ProductDetailSection>
      </ProductDetailContainer>
    </ProductDetailWrapper>
  );
};

export default ProductDetailsModal;
