import React from "react";
import MainDesktop from '../layouts/main-desktop'
import EventsView from '../layouts/events-view'

const Main = () => {
  return (
    <React.Fragment>
      <div className="w-full h-full hidden md:block">
        <MainDesktop/>
      </div>
      <div className="w-full h-full block md:hidden">
        <EventsView/>
      </div>
    </React.Fragment>
  )
};

export default Main;
