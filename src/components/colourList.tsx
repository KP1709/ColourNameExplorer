import { memo } from "react"
import { v4 as uuid } from "uuid"
import { colourObject } from "../data/colourObject"
import "../styles/colourList.css"

type ColourList = { enteredColour: string, isLoading: boolean }

function ColourList({ enteredColour, isLoading }: ColourList) {
    const queriedColours = colourObject.filter(colour => colour.colourName.toLowerCase().includes(enteredColour, 0))
    return (
        <ul style={{opacity: isLoading ? 0.5 : 1}}>
            {queriedColours.map(colours =>
                <li key={uuid()}>{colours.colourName}
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill={colours.hexColour} d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
                    </svg>
                </li>
            )}
        </ul>
    )
}

export default memo(ColourList)

