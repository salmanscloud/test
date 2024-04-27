import styled from "styled-components";

export const DashboardWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  min-height: 95vh;
  background-color: white;
  background-cover: fill;
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 60%;
  margin: 20px 0;
`;

export const DashboardLinks = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 30%;
`;

export const DashboardInfo = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 60%;
`;

export const DashboardCard = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 80%;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid black;
`;

export const DashboardLinkGroup = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const DashboardLinkItems = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-box: box-sizing;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const DashboardName = styled.h3`
  margin: 0 0 10px 0;
`;

export const DashboardText = styled.p`
  margin: 0 0 10px 0;
`;

export const DashboardHeader = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  width: 100%;
`;

export const DashboardOrderHistory = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  border: 1px solid black;
`;

export const DashBoardOrderHistoryHeader = styled.h2`
  margin: 10px;
`;

export const DashboardOrderHistoryCards = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
  border: 1px solid black;
`;
