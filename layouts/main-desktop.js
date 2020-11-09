import React from "react";
import styled from "styled-components";
import { CalendarHeader } from "../components/CalendarHeader";
import { FilterSidebar } from "../containers/FilterSidebar";
import { Header } from "../containers/Header";
import { LeftPane } from "../containers/LeftPane";
import { LeftSidebar } from "../containers/LeftSidebar";
import { Calednar } from '../containers/Calendar'
import {ClendarGrid} from '../components/Calendar'
import { Assignment } from "../components/sideBar/Assignment";
import { AssignmentComponent } from "../components/sideBar";

const HeaderDiv = styled.div`
  width: 100%;
  height: 50px;
  border: 3px solid red;
  margin: 0.5rem;
  flex-grow: 1;
`;

const MiddleLayer = styled.div`
  height: 500px;
  display: flex;
  flex-grow: 10;
`;

const Middle = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  flex-grow: 10;
  border: 3px solid red;
  margin: 0.5rem;
`;

const Page = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SideMenu = styled.div`
  height: 500px;
  width: 200px;
  border: 3px solid red;
  margin: 0.5rem;
`;

const Main = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    //page
    <div className="flex items-start justify-start">
      <div className="flex flex-col flex-wrap h-screen w-full flex-grow-0">
        {/* header */}
        <Header>
          <CalendarHeader></CalendarHeader>
        </Header>
        {/* right section second line */}
        <div className=" w-full flex flex-grow">
          <FilterSidebar></FilterSidebar>
          <Calednar>
            <ClendarGrid/>
          </Calednar>
          <LeftSidebar isOpen={isOpen} setIsOpen={setIsOpen}></LeftSidebar>
        </div>
      </div>
      {isOpen && (
        <LeftPane>
          <AssignmentComponent />
        </LeftPane>
      )}
    </div>
  );
};

export default Main;
