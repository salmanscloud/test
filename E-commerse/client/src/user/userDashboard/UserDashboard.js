import React, { useEffect } from "react";
import { isAuthenticated } from "../../api/authAPI";
import { useSelector, useDispatch } from "react-redux";
import UpdatePassword from "../updatePassword/UpdatePassword";
import { showChangePasswordForm } from "../../redux/slices/formToggleSlice";
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
  DashboardOrderHistory,
  DashboardOrderHistoryCards,
  DashBoardOrderHistoryHeader,
} from "../adminDashboard/dashboard.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const [userOrders, setUserOrders] = React.useState([]);
  const { changePassword } = useSelector((state) => state.formToggleSlice);
  const { user } = isAuthenticated();
  const dispatch = useDispatch();

  const date = new Date(user.createdAt).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    setUserOrders(user.history);
  }, []);

  return (
    <DashboardWrapper>
      {changePassword && <UpdatePassword toast={toast} />}
      <DashboardContainer>
        <DashboardHeader>
          <DashboardLinks>
            <DashboardCard>
              <DashboardLinkGroup>
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
              <DashboardText>Member since: {date}</DashboardText>
            </DashboardCard>
          </DashboardInfo>
        </DashboardHeader>
        {userOrders.length > 0 && (
          <DashboardOrderHistory>
            <DashBoardOrderHistoryHeader>
              Order History
            </DashBoardOrderHistoryHeader>
            {userOrders.map((order, i) => (
              <DashboardOrderHistoryCards key={i}>
                <div>{order.orderId}</div>
                <div>{order.dateOrdered}</div>
                {order.order.map((item, i) => (
                  <div key={i}>
                    {item.name}
                    <div>{item.price}</div>
                    {item.count}
                  </div>
                ))}
              </DashboardOrderHistoryCards>
            ))}
          </DashboardOrderHistory>
        )}
        <ToastContainer />
      </DashboardContainer>
    </DashboardWrapper>
  );
};
export default UserDashboard;
