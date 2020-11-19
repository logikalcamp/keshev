import React,{useState} from "react";
import FutureEvents from '../views/future_events'
import MissingReportEvent from '../views/missing_reports'
import cx from 'classnames'

const Main = () => {
  const [tabs,setTabs] = useState(1)
  return (
    <React.Fragment>
      {/* <div className="flex">
        <input placeholder="חיפוש " type="text" className="p-1 w-full m-1 border border-gray-800"/>
      </div>
      <div className="flex w-full justify-evenly">
        <button className={cx("w-full text-center mx-2 p-1 cursor-pointer outline-no focus:outline-no",
        {" border-b-2 border-red-600":tabs==1}
        )} onClick={()=>setTabs(1)}>אירועים עתידיים</button>
        <button className={cx("w-full text-center mx-2 p-1 cursor-pointer outline-no focus:outline-no",
        {" border-b-2 border-red-600":tabs==2}
        )} onClick={()=>setTabs(2)}>אירועים שעברו</button>
      </div> */}
      {/* {
        tabs == 1 ? 
        
        :
        <MissingReportEvent/>
      } */}
        <FutureEvents/>

    </React.Fragment>
  )
};
export default Main;

