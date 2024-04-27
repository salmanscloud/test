import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../productCard/ProductCard";
import ProductDetailsModal from "../productDetailsModal/ProductDetailsModal";
import { getProductDetail, getProducts } from "./../api/userAPI";
import {
  deleteCategory,
  getCategories,
  deleteProduct,
} from "./../api/adminAPI";
import { isAuthenticated } from "../api/authAPI";
import {
  HomeWrapper,
  ProductWrapper,
  ProductContainer,
  CategoryLinks,
  HomeContainer,
  ProductCategoryTitle,
  CategoryLinksCard,
  CategoryLinksItems,
  CategoryLinkContainer,
  CategoryIcons,
  UpdateIcon,
  DeleteIcon,
} from "./home.styles";
import { showUpdateCategoryForm } from "../redux/slices/formToggleSlice";
import UpdateCategory from "./../user/updateCategory/UpdateCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProduct from "../user/updateProduct/UpdateProduct";
import ReactTooltip from "react-tooltip";

const Home = () => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [productDetails, setProductDetails] = useState({
    show: false,
    product: {},
  });
  const [categoryId, setCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const dispatch = useDispatch();

  const { signin, updateCategory, updateProduct } = useSelector(
    (state) => state.formToggleSlice
  );

  const { user, token } = isAuthenticated();

  const initialize = async () => {
    try {
      const productData = await getProducts();
      const categoryData = await getCategories();
      await setProducts(productData);
      await setCategories(categoryData);
    } catch (error) {
      console.log("initialization error", error);
    }
  };

  useEffect(() => {
    initialize();
  }, [signin, updateCategory, updateProduct]);

  const getProductDetails = async (id) => {
    try {
      const response = await getProductDetail(id);
      setProductDetails({ show: true, product: response });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const { product } = productDetails;

  const sortProductsByCategory = async (category) => {
    try {
      console.log(category);
      const productArray = await getProducts();
      const sortedProducts =
        category !== "All Products"
          ? productArray.filter((product) => product.category.name === category)
          : productArray;
      setProducts(sortedProducts);
      setCategoryName(category);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategoryForm = (id) => {
    setCategoryId(id);
    dispatch(showUpdateCategoryForm(true));
  };

  const removeCategory = async (id, token, categoryId) => {
    try {
      const response = await deleteCategory(id, token, categoryId);
      if (response.err) {
        toast.error(response.err, { autoClose: 2000 });
      } else {
        await initialize();
        toast.success("Category deleted successfully", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id, token, productId) => {
    try {
      const response = await deleteProduct(id, token, productId);
      if (response.err) {
        toast.error(response.err, { autoClose: 2000 });
      } else {
        await initialize();
        toast.success("Category deleted successfully", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeWrapper>
      {updateCategory && (
        <UpdateCategory categoryId={categoryId} toast={toast} />
      )}
      {updateProduct && <UpdateProduct productId={productId} toast={toast} />}
      <HomeContainer>
        <CategoryLinks>
          <CategoryLinksCard>
            <CategoryLinksItems
              onClick={() => sortProductsByCategory("All Products")}
              style={{ marginRight: user && user.role === 1 && "20px" }}
            >
              All Products
            </CategoryLinksItems>
            {categories &&
              categories?.map((category) => (
                <CategoryLinkContainer key={category._id}>
                  <CategoryLinksItems
                    onClick={() => sortProductsByCategory(category.name)}
                  >
                    {category.name}
                  </CategoryLinksItems>
                  <CategoryIcons>
                    {user && user.role === 1 && (
                      <>
                        <DeleteIcon
                          data-tip
                          data-for="deleteCategoryTip"
                          data-offset="{'bottom': 6}"
                          size="20px"
                          onClick={() =>
                            removeCategory(user.id, token, category._id)
                          }
                        />
                        <ReactTooltip
                          id="deleteCategoryTip"
                          place="top"
                          effect="solid"
                        >
                          Delete category
                        </ReactTooltip>
                        <UpdateIcon
                          data-tip
                          data-for="updateCategoryTip"
                          data-offset="{'bottom': 6}"
                          size="20px"
                          onClick={() => updateCategoryForm(category._id)}
                        />
                        <ReactTooltip
                          id="updateCategoryTip"
                          place="top"
                          effect="solid"
                        >
                          Update category
                        </ReactTooltip>
                      </>
                    )}
                  </CategoryIcons>
                </CategoryLinkContainer>
              ))}
          </CategoryLinksCard>
        </CategoryLinks>
        <ProductWrapper>
          <ProductCategoryTitle>
            {categoryName ? categoryName : "All Products"}
          </ProductCategoryTitle>
          <ProductContainer>
            {products &&
              products?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  getProductDetails={getProductDetails}
                  setProductId={setProductId}
                  removeProduct={removeProduct}
                />
              ))}
          </ProductContainer>
        </ProductWrapper>
        <ToastContainer autoClose={2000} />
      </HomeContainer>
      {productDetails.show && (
        <ProductDetailsModal
          product={product}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
      )}
    </HomeWrapper>
  );
};

export default Home;
