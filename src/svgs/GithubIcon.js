import React, { useState } from "react"

export const GithubIcon = ({ tip, position, clickFunction }) => {
    const [visible, setVisible] = useState(false)
    const [delayHandler, setDelayHandler] = useState(null)

    const handleMouseEnter = event => {
        setDelayHandler(setTimeout(() => {
            setVisible(true)
        }, 750))
    }

    const handleMouseLeave = () => {
        setVisible(false)
        clearTimeout(delayHandler)
    }

    const displayTip = () => {
        return <div className="tooltip">{tip}</div>
    }

    return <span style={{ position: "relative" }}>
        {visible ? displayTip() : ""}

        <svg xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clickFunction}
            className="svg svg--large"
            viewBox="0 0 480 512">
            <path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1s10.9-55.1 36.7-55.1s36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95c-37.9 76.6-142.1 74.8-216.7 74.8c-75.8 0-186.2 2.7-225.6-74.8c-14.6-29-20.2-63.1-20.2-95c0-41.9 13.9-81.5 41.5-113.6c-5.2-15.8-7.7-32.4-7.7-48.8c0-21.5 4.9-32.3 14.6-51.8c45.3 0 74.3 9 108.8 36c29-6.9 58.8-10 88.7-10c27 0 54.2 2.9 80.4 9.2c34-26.7 63-35.2 107.8-35.2c9.8 19.5 14.6 30.3 14.6 51.8c0 16.4-2.6 32.7-7.7 48.2c27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6c-18.9 0-37 3.4-56 6c-14.9 2.3-29.8 3.2-45.1 3.2c-15.2 0-30.1-.9-45.1-3.2c-18.7-2.6-37-6-56-6c-46.8 0-73.5 38.7-73.5 82.6c0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1s36.7-34.2 36.7-55.1s-10.9-55.1-36.7-55.1z" fill="currentColor"></path>
        </svg>
    </span>
}
