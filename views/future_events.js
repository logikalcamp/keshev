import React from 'react'
import Event from '../components/FutureEvent'

const arr = [
    {
        name:'אירוע עתידי',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עתידי',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עתידי',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עתידי',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עתידי',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עתידי',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עתידי',
        date:'10/12/2020',
        category:'אש'
    },
]


const FutureEvents = () => {
    return (
        <div className="p-4">
            {
                arr.map((even,index)=>{
                    return (
                        <Event even={even}/>
                    )
                })
            }
        </div>
    )
}

export default FutureEvents;