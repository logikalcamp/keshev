import React from "react";
import MainDesktop from '../layouts/main-desktop'
import EventsView from '../layouts/events-view'
import TasksScheduler from '../layouts/tasks-scheduler'

const Main = () => {
  return (
    <React.Fragment>
      <TasksScheduler/>
      {/* <div className="w-full h-full hidden md:block">
        <MainDesktop/>
      </div>
      <div className="w-full h-full block md:hidden">
        <EventsView/>
      </div> */}
    </React.Fragment>
  )
};

export default Main;
