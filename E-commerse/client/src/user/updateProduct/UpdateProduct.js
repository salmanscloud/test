import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showUpdateProductForm } from "../../redux/slices/formToggleSlice";
import { getCategories, updateProduct } from "../../api/adminAPI";
import { isAuthenticated } from "../../api/authAPI";
import {
  FormContainer,
  FormWrapper,
  Header,
  HeaderText,
  Form,
  Input,
  ConfirmButton,
  CloseButton,
  SelectInput,
} from "../signin/forms.styles";

const UpdateProduct = ({ productId, toast }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    error: "",
    formData: "",
    photo: "",
  });
  const { name, description, price, categories, quantity, error, formData } =
    values;

  const dispatch = useDispatch();

  const { user, token } = isAuthenticated();

  const initialize = async () => {
    try {
      const data = await getCategories();
      await setValues({
        ...values,
        categories: data,
        formData: new FormData(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setValues({
        ...values,
        error: false,
      });
      const data = await updateProduct(formData, user.id, token, productId);
      if (data.msg) {
        setValues({
          ...values,
          error: data.msg,
        });
      } else {
        await dispatch(showUpdateProductForm(false));
        toast.success("Product updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showError = () => (
    <div
      style={{
        display: error ? "" : "none",
        color: "red",
        fontSize: "0.8rem",
        marginBottom: "0.5rem",
      }}
    >
      {error}
    </div>
  );

  return (
    <FormWrapper onClick={() => dispatch(showUpdateProductForm())}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => dispatch(showUpdateProductForm())}>
          X
        </CloseButton>
        <Header>
          <HeaderText>Update Product</HeaderText>
        </Header>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            onChange={handleChange("name")}
            type="text"
            value={name}
          />
          <Input
            placeholder="Description"
            onChange={handleChange("description")}
            type="text"
            value={description}
          />
          <Input
            placeholder="0.00"
            onChange={handleChange("price")}
            type="number"
            value={price}
          />
          <SelectInput
            onChange={handleChange("category")}
            className="form-control"
          >
            <option>Select Category</option>
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </SelectInput>
          <Input
            placeholder="Quantity"
            onChange={handleChange("quantity")}
            type="number"
            value={quantity}
          />
          <Input
            placeholder="Photo"
            onChange={handleChange("photo")}
            type="file"
          />
          <ConfirmButton onClick={(e) => handleSubmit(e)}>Update</ConfirmButton>
          {showError()}
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

export default UpdateProduct;
