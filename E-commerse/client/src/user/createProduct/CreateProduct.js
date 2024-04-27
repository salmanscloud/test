import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showProductForm } from "../../redux/slices/formToggleSlice";
import { getCategories } from "../../api/adminAPI";
import { isAuthenticated } from "../../api/authAPI";
import { createProduct } from "../../api/adminAPI";
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

const CreateProduct = ({ toast }) => {
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

  const { token, user } = isAuthenticated();

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
      const data = await createProduct(formData, user.id, token);
      if (data.msg) {
        setValues({
          ...values,
          error: data.msg,
        });
      } else {
        await dispatch(showProductForm(false));
        toast.success("Product added successfully");
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
    <FormWrapper onClick={() => dispatch(showProductForm())}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => dispatch(showProductForm())}>X</CloseButton>
        <Header>
          <HeaderText>Add Product</HeaderText>
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
          <ConfirmButton onClick={(e) => handleSubmit(e)}>Create</ConfirmButton>
          {showError()}
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

export default CreateProduct;
