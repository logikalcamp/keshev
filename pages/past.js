import React from 'react'
import Event from '../components/MissReportEvent'

const arr = [
    {
        name:'אירוע עבר',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עבר',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עבר',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עבר',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עבר',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עבר',
        date:'10/12/2020',
        category:'אש'
    },
    {
        name:'אירוע עבר',
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