import { createPortal } from "react-dom";
import { colourObject } from "../data/colourObject";
import "../styles/modal.css"

type ModalProps = {
    open: boolean,
    onClose: () => void,
    selectedColour: string
}

export default function ColourModal({ open, onClose, selectedColour }: ModalProps) {
    if (!open) return null
    const chosenColourHexCode = colourObject.find(colour => colour.colourName === selectedColour)?.hexColour

    return createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal">
                <button onClick={onClose}>Close</button>
                <p>Hex code: {chosenColourHexCode}</p>
            </div>
        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}