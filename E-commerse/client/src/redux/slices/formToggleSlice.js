import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signin: false,
  signup: false,
  category: false,
  product: false,
  changePassword: false,
  updateCategory: false,
  updateProduct: false,
};

export const formToggleSlice = createSlice({
  name: "formToggle",
  initialState,
  reducers: {
    toggleBetweenSigninAndSignup: (state) => {
      state.signin = !state.signin;
      state.signup = !state.signup;
    },
    showSignin: (state) => {
      state.signin = !state.signin;
    },
    showSignup: (state) => {
      state.signup = !state.signup;
    },
    showCategoryForm: (state) => {
      state.category = !state.category;
    },
    showProductForm: (state) => {
      state.product = !state.product;
    },
    showChangePasswordForm: (state) => {
      state.changePassword = !state.changePassword;
    },
    showUpdateCategoryForm: (state) => {
      state.updateCategory = !state.updateCategory;
    },
    showUpdateProductForm: (state) => {
      state.updateProduct = !state.updateProduct;
    },
  },
});

export const {
  toggleBetweenSigninAndSignup,
  showSignin,
  showSignup,
  showCategoryForm,
  showProductForm,
  showChangePasswordForm,
  showUpdateCategoryForm,
  showUpdateProductForm,
} = formToggleSlice.actions;

export default formToggleSlice.reducer;
