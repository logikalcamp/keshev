import React,{useEffect, useState} from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    Box,
    ButtonGroup
  } from "@chakra-ui/core"
import styled from 'styled-components'
import cx from 'classnames'

const Event = styled.div`
  position:${props=>props.days == 1 ? "unset" : "absolute"};
  width:${props=>props.days == 1 ? "unset" : (100/7*props.days) - 1.5 + "%"};
`

export const PopoverElem = ({
    event,
    dragged,
    setDragged,
    firstRow,
    lastRow ,
    isOpen,
    setOpen = () => {},
    temp,
    setTemporal,
    CreateEvent,
    days = 1
}) => {
    const initialFocusRef = React.useRef()
    const [dragging,setDragging] = useState(false)
    const [temporal,setTemp] = useState(event)
    const [defaultOpen,setDefault] = useState(event.new ? false : false)
    const ref = React.useRef()
    // let defaultOpen = ;

    useEffect(()=>{
      console.log("change",event)
      setTemp(event)
      if(event.new){
        ref.current.click()
      }
      // setDefault(true)
    },[event])

    return (
      <React.Fragment>
        {temp ? 
        <Popover
          initialFocusRef={initialFocusRef}
          placement={firstRow ? "bottom":(lastRow ? "top" :"right")}
          closeOnBlur
          defaultIsOpen={defaultOpen}

          onClose={()=>
            setTemporal([])
          }
          isLazy
        >
          <PopoverTrigger>
            <Event
            ref={ref}
              days={days}
              draggable="true"
              onDrag={(e)=>{
                setDragged(event.id)
              }}
              className={cx(" bg-white shadow-xs text-sm truncate border-gray-300 border m-1 rounded-sm  cursor-pointer",
                  {"cursor-move ": dragged!=''},
              )}>
                {event.name}
            </Event>
          </PopoverTrigger>
          <PopoverContent
          color="blue.800" bg="white" boxShadow="0 0 8px rgba(0,0,0,0.25) !important" border="0"  zIndex={2}>
            <PopoverHeader 
            
            pt={4} fontWeight="bold"  
            >
              <input
              autoFocus
              value={temporal.name == '(אין כותרת)' ? "" : temporal.name} onChange={(e)=> {
                setTemp({
                  ...temporal,
                  name:e.target.value
                })
              }} className="outline-none" type="text" placeholder={event.name}/>
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody
          //    ref={initialFocusRef}
            >

                <button 
                className="bg-orange-700"
                onClick={()=>{
                  CreateEvent(temporal)
                }}>
                  שמירה
                </button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        :
        <Popover
          initialFocusRef={initialFocusRef}
          placement={firstRow ? "bottom":(lastRow ? "top" :"right")}
          closeOnBlur
          defaultIsOpen={defaultOpen}
          onClose={()=>
            {try{
              
              setTimeout(()=>setOpen(false),1000)
            }
            catch(err){
              console.log(err)
            }}
          }
          onOpen={()=>setOpen(true)}
          // isOpen={isOpen}
          isLazy
        >
          <PopoverTrigger>
            <Event
              days={days}
              draggable="true"
              onDrag={(e)=>{
                setDragging(true)
                setDragged(event.id)
              }}
              onDragOver={(e)=>{
                // setDragging(false).
              }}
              onDragEnd= {(e)=>
              setDragging(false)
            }
              className={cx("bg-red-300 text-sm truncate border-r-8 m-1 rounded-sm border-green-500 cursor-pointer",
                  {"cursor-move ": dragged!=''},
                  {" opacity-50":dragging}

              )}>
                {event.name}
            </Event>
          </PopoverTrigger>
          <PopoverContent color="blue.800" bg="white" boxShadow="0 0 8px rgba(0,0,0,0.25) !important" border="0"  zIndex={2}>
            <PopoverHeader pt={4} fontWeight="bold"  
            >
              {event.name}
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody
          //    ref={initialFocusRef}
            >
                {event.id}
                <div>
                    asdasd
                </div>
                <div>
                    asdasdads
                </div>
            </PopoverBody>
            {/* <PopoverFooter
              border="0"
              d="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
            >
              <Box fontSize="sm">Step 2 of 4</Box>
              <ButtonGroup size="sm">
                <Button colorScheme="green">Setup Email</Button>
                <Button colorScheme="blue" ref={initialFocusRef}>
                  Next
                </Button>
              </ButtonGroup>
            </PopoverFooter> */}
          </PopoverContent>
        </Popover>  
      }
      </React.Fragment>
      
      
    )
}