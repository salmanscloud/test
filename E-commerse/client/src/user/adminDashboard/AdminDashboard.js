import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  showCategoryForm,
  showChangePasswordForm,
  showProductForm,
} from "../../redux/slices/formToggleSlice";
import { isAuthenticated } from "../../api/authAPI";
import CreateCategory from "../createCategory/CreateCategory";
import CreateProduct from "../createProduct/CreateProduct";
import {
  DashboardContainer,
  DashboardInfo,
  DashboardLinks,
  DashboardWrapper,
  DashboardCard,
  DashboardLinkGroup,
  DashboardLinkItems,
  DashboardName,
  DashboardText,
  DashboardHeader,
} from "./dashboard.styles";
import UpdatePassword from "../updatePassword/UpdatePassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const { category, product, changePassword } = useSelector(
    (state) => state.formToggleSlice
  );
  const dispatch = useDispatch();

  const { user } = isAuthenticated();

  const memberSince = () => {
    const date = new Date(user.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    return date;
  };

  return (
    <DashboardWrapper>
      {category && <CreateCategory toast={toast} />}
      {product && <CreateProduct toast={toast} />}
      {changePassword && <UpdatePassword toast={toast} />}
      <DashboardContainer>
        <DashboardHeader>
          <DashboardLinks>
            <DashboardCard>
              <DashboardLinkGroup>
                <DashboardLinkItems
                  onClick={() => dispatch(showCategoryForm())}
                >
                  Create Category
                </DashboardLinkItems>
                <DashboardLinkItems onClick={() => dispatch(showProductForm())}>
                  Create Product
                </DashboardLinkItems>
                <DashboardLinkItems
                  onClick={() => dispatch(showChangePasswordForm())}
                >
                  Change Password
                </DashboardLinkItems>
              </DashboardLinkGroup>
            </DashboardCard>
          </DashboardLinks>
          <DashboardInfo>
            <DashboardCard>
              <DashboardName>
                {user.firstName} {user.lastName}
              </DashboardName>
              <DashboardText>{user.email}</DashboardText>
              <DashboardText>Member since: {memberSince()}</DashboardText>
            </DashboardCard>
          </DashboardInfo>
        </DashboardHeader>
        <ToastContainer />
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default AdminDashboard;
