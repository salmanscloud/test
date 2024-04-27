import React from "react";
import { useDispatch } from "react-redux";
import {
  ProductCardContainer,
  ProductTitle,
  ProductImage,
  ProductDescription,
  ProductPrice,
  ProductImageContainer,
  AddToCart,
  ProductFooter,
  ProductIcons,
} from "../productCard/productCard.styles";
import {
  UpdateIcon,
  DeleteIcon,
  InStockIcon,
  CancelIcon,
} from "../home/home.styles";
import { addItem } from "../cart/cartHelper";
import { isAuthenticated } from "../api/authAPI";
import { showUpdateProductForm } from "../redux/slices/formToggleSlice";
import ReactTooltip from "react-tooltip";

const ProductCard = ({
  product,
  getProductDetails,
  setProductId,
  removeProduct,
}) => {
  const addToCart = () => {
    addItem(product);
  };
  const dispatch = useDispatch();

  const { user, token } = isAuthenticated();

  const updateProductForm = (id) => {
    dispatch(showUpdateProductForm());
    setProductId(id);
  };

  const photoUrl = () => {
    if (process.env.NODE_ENV === "production") {
      return "https://e-commerce5850.herokuapp.com/";
    } else return `http://localhost:8000/`;
  };

  return (
    <ProductCardContainer>
      <ProductImageContainer onClick={() => getProductDetails(product._id)}>
        <ProductImage
          src={`${photoUrl()}${product.photo.filePath}`}
          alt={product.name}
        />
      </ProductImageContainer>
      <ProductTitle onClick={() => getProductDetails(product._id)}>
        {product.name}
      </ProductTitle>
      <ProductDescription onClick={() => getProductDetails(product._id)}>
        {product.description}
      </ProductDescription>
      <ProductFooter>
        <ProductPrice>${product.price}</ProductPrice>
        <AddToCart onClick={() => addToCart()}>
          {product.quantity >= 1 && user && user.role === 0 && (
            <>
              <InStockIcon
                data-tip
                data-for="inStockTip"
                data-offset="{'bottom': 6}"
              />
              <ReactTooltip
                delayShow={100}
                delayHide={100}
                id="inStockTip"
                place="top"
                effect="solid"
                backgroundColor="green"
              >
                In Stock
              </ReactTooltip>
            </>
          )}
          Add to cart
        </AddToCart>
      </ProductFooter>
      {user && user.role === 1 && (
        <ProductIcons>
          <>
            <UpdateIcon
              data-tip
              data-for="updateProductTip"
              data-offset="{'bottom': 6}"
              onClick={() => updateProductForm(product._id)}
            />
            <ReactTooltip
              delayShow={100}
              delayHide={100}
              id="updateProductTip"
              place="top"
              effect="solid"
            >
              Update product
            </ReactTooltip>
          </>

          <>
            <DeleteIcon
              data-tip
              data-for="deleteProductTip"
              data-offset="{'bottom': 6}"
              onClick={() => removeProduct(user.id, token, product._id)}
            />
            <ReactTooltip
              delayShow={100}
              delayHide={100}
              id="deleteProductTip"
              place="top"
              effect="solid"
            >
              Delete Product
            </ReactTooltip>
          </>
          {product.quantity >= 1 ? (
            <>
              <InStockIcon
                data-tip
                data-for="inStockTip"
                data-offset="{'bottom': 6}"
              />
              <ReactTooltip
                delayShow={100}
                delayHide={100}
                id="inStockTip"
                place="top"
                effect="solid"
                backgroundColor="green"
              >
                In Stock
              </ReactTooltip>
            </>
          ) : (
            <>
              <CancelIcon
                data-tip
                data-for="cancelTip"
                data-offset="{'bottom': 6}"
              />
              <ReactTooltip
                delayShow={100}
                delayHide={100}
                id="cancelTip"
                place="top"
                effect="solid"
                backgroundColor="red"
              >
                Out of Stock
              </ReactTooltip>
            </>
          )}
        </ProductIcons>
      )}
    </ProductCardContainer>
  );
};

export default ProductCard;
