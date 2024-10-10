import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/modal.css"

type ModalProps = {
    open: boolean,
    onClose: () => void,
    hexValue: string | undefined
}

export default function ColourModal({ open, onClose, hexValue }: ModalProps) {
    const [hslValue, setHslValue] = useState("")
    const [rgbValue, setRgbValue] = useState("")

    useEffect(() => {
        async function getColourCodes() {
            if (hexValue === undefined) return null
            else
                try {
                    const response = await fetch(`https://www.thecolorapi.com/id?hex=${hexValue.substring(1)}&format=json`)
                    const data = await response.json()
                    setHslValue(data.rgb.value)
                    setRgbValue(data.hsl.value)
                }
                catch (err) {
                    setHslValue('Unknown')
                    setRgbValue('Unknown')
                    console.error(err)
                }
        }
        getColourCodes()
    }, [hexValue])

    if (!open) return null // React doesn't like early returns (causes internal error)

    return createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal">
                <button onClick={onClose}>Close</button>
                <p>Hex code: {hexValue}</p>
                <p>RGB code: {rgbValue}</p>
                <p>HSL code: {hslValue}</p>
            </div>
        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}