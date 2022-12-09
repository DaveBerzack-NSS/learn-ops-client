import React, { useState } from "react"

export const GlobeIcon = ({ tip }) => {
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
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            style={{ cursor: "pointer", marginLeft: "0.33rem", height: "1rem" }}
            viewBox="0 0 24 24">
            <g fill="none">
            <path d="M12 1.998c5.524 0 10.002 4.478 10.002 10.002c0 .391-.023.777-.067 1.157a5.518 5.518 0 0 0-1.434-1.058V12c0-.689-.081-1.359-.236-2h-3.358c.05.518.08 1.05.09 1.591c-.529.098-1.031.27-1.496.508V12c0-.691-.036-1.36-.104-2.001H8.603a18.968 18.968 0 0 0 .135 5h4.137a5.464 5.464 0 0 0-.352 1.5H9.06c.652 2.415 1.786 4.002 2.94 4.002c.454 0 .906-.247 1.326-.694c.361.616.832 1.222 1.399 1.818c-.867.245-1.781.376-2.726.376C6.476 22.001 2 17.523 2 12C1.999 6.476 6.476 1.998 12 1.998zM7.508 16.5H4.786a8.532 8.532 0 0 0 4.094 3.41c-.522-.82-.953-1.846-1.27-3.015l-.102-.395zm-.414-6.501H3.736l-.005.017A8.523 8.523 0 0 0 3.5 12c0 1.056.192 2.067.544 3h3.173A20.3 20.3 0 0 1 7 12c0-.684.032-1.354.095-2.001zm1.787-5.91l-.023.008A8.531 8.531 0 0 0 4.25 8.5h3.048c.314-1.752.86-3.278 1.583-4.41zm3.12-.591l-.117.005C10.62 3.62 9.397 5.621 8.83 8.5h6.342c-.566-2.87-1.783-4.869-3.045-4.995L12 3.498zm3.12.59l.106.175c.67 1.112 1.177 2.572 1.475 4.237h3.048a8.533 8.533 0 0 0-4.339-4.29l-.29-.121zM22.5 17a4.5 4.5 0 0 0-9 0c0 1.863 1.419 3.815 4.2 5.9a.5.5 0 0 0 .6 0c2.78-2.085 4.2-4.037 4.2-5.9zm-6 0a1.5 1.5 0 1 1 2.999 0a1.5 1.5 0 0 1-3 0z" fill="currentColor"></path>
            </g>
        </svg>
    </span>
}
