import React from 'react'

const FutureEvent = ({even}) => {
    return (
        <div className="p-2 shadow-xs my-2 flex flex-col">
            {even.name}
            <label>miss</label>
        </div>
    )
}

export default FutureEvent