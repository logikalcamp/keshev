import React from 'react'

const FutureEvent = ({even}) => {
    return (
        <div className="p-4 shadow-xs my-2">
            {even.name}
        </div>
    )
}

export default FutureEvent