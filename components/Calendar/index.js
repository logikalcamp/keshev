import React,{useEffect, useState} from 'react'
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import Locale from 'dayjs/locale/he' // import locale
import isoWeek from 'dayjs/plugin/isoWeek'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import cx from "classnames";
// import {SimplePopover} from './EventPopOver'
import { v4 as uuidv4 } from 'uuid';
import {PopoverElem} from './Popover'
import {useSelector} from 'react-redux'

dayjs.extend(isoWeek)
dayjs.extend(isLeapYear) // use plugin
dayjs.extend(customParseFormat)
dayjs.extend(weekday)


dayjs.locale(Locale) // use locale

const hebdays = [
    'יום א׳',
    'יום ב׳',
    'יום ג׳',
    'יום ד׳',
    'יום ה׳',
    'יום ו׳',
    'שבת',
]

const hebmonth = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];


let events_state = [
    {
        id:'1',
        name:'יום הכשרה בטיחות באש',
        scheduledTo:'29/10/2020',
        category:'אש',
        event_type:'יום הכשרה',
        group_id:'1'
    },
    {
        id:'2',
        name:'יום הכשרה בטיחות בגובה',
        scheduledTo:'28/10/2020',
        category:'אש',
        event_type:'יום הכשרה',
        group_id:'1'
    },
    {
        id:'3',
        name:'יום הכשרה בטיחות באש',
        scheduledTo:'02/11/2020',
        category:'אש',
        event_type:'יום הכשרה',
        group_id:'1'
    },
    {
        id:'4',
        name:'כנס עבודה ',
        scheduledTo:'30/10/2020',
        category:'אש',
        event_type:'יום הכשרה',
        group_id:'1'
    }
]
export const ClendarGrid = () => {
    const calendar = useSelector((state)=>state.calendar)

    return (
        <React.Fragment>
            <CalendarTable nextMonth={calendar.nextMonth} previousMonth={calendar.previousMonth} month={calendar.currentDate.month()} year={calendar.currentDate.year()}/>
        </React.Fragment>
    )
}


const CalendarTable = ({ month, year }) => {
    const tmonth = month+1;
    const [dragged,setDragged] = useState('')
    const [events,setEvents] = useState(events_state)
    const [longEvents,setLongEvents] = useState([])
    const [temporalEvent,setTemporal] = useState([])
    const [multipleDayEvent,setMultiple] = useState([])
    const [isPopoverOpen,setIsPopoverOpen] = useState(false)
    const [isOpen,setOpen] = useState(false)
    const [mouseDown,setMouseDown] = useState('')
    const [mouseUp,setMouseUp] = useState('')
    const [isMouse,setMouse] = useState(false)


    let date = ''
    if(tmonth.toString().length == 1){
        date = "0"+tmonth + "/" + year;
    }
    else{
        date = tmonth + "/" + year;
    }

    const lng = dayjs("01/"+date,'DD/MM/YYYY').daysInMonth();

    let first_day = "01/"+date
    let nextMonth_days= dayjs("01/"+date,"DD/MM/YYYY").daysInMonth()
    let last_day = nextMonth_days + "/" + dayjs("01/"+date,"DD/MM/YYYY").format("MM/YYYY")

    let coun = 0;
    let d = [];
  
    for (let m = 0; m < 6; m++) {
      let dd = [];
      for (let n = 0; n < 7; n++) {
        dd.push('');
      }
      d.push(dd);
    }

    let row = 0;
    for (let days = 1;days<=lng;days++){
        let dayTo = days
        if(dayTo.toString().length == 1){
            dayTo = "0"+days
        }
        let where = dayjs(dayTo+ "/"+date,'DD/MM/YYYY').isoWeekday()
        if(where == 7){
            where = 1
            if(days!=1){
                row ++
            }
        }else{
            where = where +1
        }
        d[row][where-1] = {
            number:days,
            date:dayTo+"/"+date
        }
    }
    if(row == 4){
        d.pop()
    }

    let counterback = 1
    for (let i = 6; i>= 0 ; i--){
        if(d[0][i] == ''){
            d[0][i] = {
                number :dayjs(first_day,"DD/MM/YYYY").subtract(counterback,"day").date(),
                date:dayjs(first_day,"DD/MM/YYYY").subtract(counterback,"day").format("DD/MM/YYYY"),
                past:true,           
            }
            counterback++
        }
    }

    let counternext = 1
    for (let i = 0; i<7 ; i++){
        if(d[d.length-1][i] == ''){
            d[d.length-1][i] = {
                number: dayjs(last_day,"DD/MM/YYYY").add(counternext,"day").date(),
                date:dayjs(last_day,"DD/MM/YYYY").add(counternext,"day").format("DD/MM/YYYY"),
                future:true,
            }
            counternext ++
        }
    }

    const CreateEvent = (newEvent) => {
        let state = [...events]
        delete newEvent.new
        state.push(newEvent)
        setEvents(state)
        setTemporal([])
    }
    const createLongEvent = (val) => {
        let levents = [...events]
        delete val.new
        levents.push(val)
        setEvents(levents)
        setMultiple([])
    }

    useEffect(()=>{
        if(mouseUp!='' && mouseDown !='' && temporalEvent.length == 0){
            if(mouseUp==mouseDown){
                setMouseUp('')
                setMouseDown('')
            }else{
                // alert("should be new event")
                let newMultipleEvent = {
                    scheduledTo:mouseDown,
                    endDate:mouseUp,
                    id:uuidv4(),
                    name:'(אין כותרת)',
                    // new:true,
                    days:dayjs(mouseUp,"DD/MM/YYYY").diff(dayjs(mouseDown,"DD/MM/YYYY"),"day")+1
                }
                setMultiple([newMultipleEvent])
            }
        }
    },[mouseUp])
    useEffect(()=>{
        if(temporalEvent.length != 0){
            setMouseDown('')
        }
    },[mouseDown])

    const handleMouseUp = () => {
        if(mouseDown != mouseUp){
            let newMultipleEvent = {
                scheduledTo:mouseDown,
                endDate:mouseUp,
                id:uuidv4(),
                name:'(אין כותרת)',
                new:true,
                days:dayjs(mouseUp,"DD/MM/YYYY").diff(dayjs(mouseDown,"DD/MM/YYYY"),"day")+1
            }
            console.log(newMultipleEvent)
            setMultiple([newMultipleEvent])
            setMouseDown('')
            setMouseDown('')
        }else{

        }
    }
    useEffect(()=>{
        setDragged('')
        setMouseDown('')
        setMouseUp('')
    },[events])

    return (
        <React.Fragment>
            <table className="w-full h-full">
            <tbody className="flex flex-col w-full h-full relative">
                {d.map((row, i) => (
                    <tr key={i} className={cx(
                        "flex w-full flex-grow  relative h-10 ",
                        {
                            "border-gray-500 border-b" : i!=d.length-1
                        }
                    )}>
                        {row.map((day, j) => {
                            return (
                            <td 
                            onMouseDown={()=>{
                                // setMouse(true)
                                if(dragged == ''){
                                    setMouseDown(day.date)
                                }
                                // oneSecondTimer = setTimeout(function() {
                                //     console.log("start painting")
                                // }, 3000);
                            }}
                            onMouseOver={()=>{
                                if(dragged == ''){
                                    setMouseUp(day.date)
                                }
                            }}
                            onMouseUp={(e)=>{
                                console.log(e)
                                console.log(dragged)
                                if(dragged == ''){
                                    handleMouseUp()
                                }
                                // setMouse(false)
                            }}
                            element_container="true"
                            onClick={(e)=>{
                                setMouseDown('')
                                // console.log(e.target)
                                // console.log(e.target.getAttribute('element_container'))
                                if(e.target.getAttribute('element_container')){
                                    // console.log(isOpen)
                                    if(!isOpen){
                                        // console.log("boom")
                                        let newEvents = [...temporalEvent]
                                        newEvents.push({
                                            id:uuidv4(),
                                            name:'(אין כותרת)',
                                            new:true,
                                            scheduledTo:day.date,
                                            category:'',
                                            event_type:'',
                                            group_id:''
                                        })
                                        setTemporal(newEvents)
                                    }
                                }
                            }}
                            key={j}
                            // id={`${day.number}/${month+1}/${year}`}
                            id={day.date}
                            onDragOver={(e)=>e.preventDefault()}
                            onDrop={(e)=>{
                                console.log("dropped ",dragged)
                                if(e.target.tagName == 'TD'){
                                    let index = events.findIndex((event)=>event.id == dragged)
                                    if(index != -1){
                                        let newEvents = [...events]
                                        newEvents[index].scheduledTo = e.target.id 
                                        setEvents(newEvents)
                                    }else{
                                        
                                    }
                                }else{
                                    let element = e.target.parentElement
                                    console.log(element)
                                    if(element.tagName == 'TD'){
                                        let index = events.findIndex((event)=>event.id == dragged)
                                        if(index != -1){
                                            let newEvents = [...events]
                                            newEvents[index].scheduledTo = element.id
                                            setEvents(newEvents)
                                        }
                                    }else{
                                        let element2 = element.parentElement
                                        console.log(element2)
                                        if(element2.tagName == 'TD'){
                                            let index = events.findIndex((event)=>event.id == dragged)
                                            if(index != -1){
                                                let newEvents = [...events]
                                                newEvents[index].scheduledTo = element2.id
                                                setEvents(newEvents)
                                            }
                                        }
                                    }
                                }
                                // setDragged('')
                            }}

                            className={cx(
                                "flex flex-col w-1/7 h-full text-center ",
                                {
                                    "border-gray-500 border-l": j!=6,
                                    " bg-gray-200" : day.past,
                                    " bg-opacity-25 bg-blue-300":day.future
                                }
                            )
                            }>
                                <label className="text-gray-600 text-xs">
                                    {i == 0 && hebdays[j]}
                                </label>
                                <label className="text-gray-900 text-xs my-1">
                                    <span className="rounded-2xl py-1 px-2 hover:bg-gray-300">
                                        {day.number != 0 && day.number!= 1 && day.number}
                                        {day.number == 1 && `${day.number} ב${hebmonth[dayjs(day.date,"DD/MM/YYYY").month()]}` }
                                    </span>
                                </label>
                                <div>
                                    
                                    {
                                        events.filter((event)=>event.scheduledTo == day.date).map((event,index)=>{
                                            return(
                                                // <SimplePopover 
                                                //     key={i}
                                                //     draggable="true"
                                                //     setDragged={setDragged}
                                                //     dragged={dragged}
                                                //     // onDrag={setDragged}
                                                //     className={cx("bg-red-300 text-sm truncate border-r-8 m-1 rounded-sm border-green-500",
                                                //         {"cursor-move": dragged!=''}
                                                //     )}
                                                //     event={event}
                                                // />
                                                // <div
                                                // key={i}
                                                // draggable="true"
                                                // onDrag={(e)=>setDragged(event.id)}
                                                // className={cx("bg-red-300 text-sm truncate border-r-8 m-1 rounded-sm border-green-500",
                                                //     {"cursor-move": dragged!=''}
                                                // )}>
                                                //     {event.name}
                                                // </div>
                                                <PopoverElem 
                                                    days={event.days || 1}
                                                    key={index}
                                                    event={event}
                                                    setDragged={setDragged}
                                                    dragged={dragged}
                                                    lastRow={i == d.length -1}
                                                    firstRow={i==0}
                                                    isOpen={isOpen}
                                                    setOpen={setOpen}
                                                />
                                            )
                                        })
                                    }
                                    {
                                        temporalEvent.filter((event)=>event.scheduledTo == day.date).map((event,index)=>{
                                            return (
                                                <PopoverElem
                                                temp={true}
                                                key={index}
                                                event={event}
                                                lastRow={i == d.length-1}
                                                firstRow={i==0}
                                                setTemporal={setTemporal}
                                                CreateEvent={CreateEvent}
                                                />
                                            )
                                        })
                                    }
                                    {
                                        longEvents.filter((event) => event.scheduledTo == day.date).map((event,index)=>{
                                            return (
                                                <PopoverElem
                                                    days={event.days}
                                                    temp={false}
                                                    key={index}
                                                    setDragged={setDragged}
                                                    dragged={dragged}
                                                    isOpen={isOpen}
                                                    setOpen={setOpen}
                                                    event={event}
                                                    lastRow={i == d.length-1}
                                                    firstRow={i==0}
                                                    setTemporal={setMultiple}
                                                    CreateEvent={createLongEvent}
                                                />
                                            )
                                        })
                                    }
                                    {
                                        multipleDayEvent.filter((event) => event.scheduledTo == day.date).map((event,index)=>{
                                            return (
                                                <PopoverElem
                                                    days={event.days}
                                                    temp={true}
                                                    key={index}
                                                    event={event}
                                                    lastRow={i == d.length-1}
                                                    firstRow={i==0}
                                                    setTemporal={setMultiple}
                                                    CreateEvent={createLongEvent}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
            </table>

        </React.Fragment>
    );
  };
  