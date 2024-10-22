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
                setHslValue('Loading HSL value ...')
                setRgbValue('Loading RGB value ...')
            try {
                const response = await fetch(`https://www.thecolorapi.com/id?hex=${hexValue.substring(1)}&format=json`)
                const data = await response.json()
                setHslValue(data.hsl.value)
                setRgbValue(data.rgb.value)
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
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill={hexValue} d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
                </svg>
                <p>Hex code: {hexValue}</p>
                <p>RGB code: {rgbValue}</p>
                <p>HSL code: {hslValue}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}