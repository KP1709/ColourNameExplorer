// Both lists are inline so the colour name matches the hex value
import { colourNames } from "./colourNamesList";
import { colourHexadecimals } from "./colourHexList";

type ColourObjectType = {
    hexColour: string,
    colourName: string
}

// Combining colour names and hex list into object
function createColourObject(){
    let colourObject:ColourObjectType[] = []
    colourNames.map((value, index) => {
        const hexColourValue = colourHexadecimals[index]

        const newColourObject: ColourObjectType = {
            hexColour: hexColourValue,
            colourName: value.toLowerCase()
        }

        colourObject.push(newColourObject) 
    })

    return colourObject
}

export const colourObject = createColourObject()