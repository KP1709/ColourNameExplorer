import { lazy, Suspense, useDeferredValue, useState } from "react";
import "../styles/colourExplorer.css"
const ColourList = lazy(() => import("./colourList"))
import Loading from "./loadingFallback";

export default function colourExplorer() {
    const [enteredColour, setEnteredColor] = useState<string>("")
    const deferredEnteredColour = useDeferredValue(enteredColour)
    const isLoading = enteredColour !== deferredEnteredColour

    return (
        <main>
            <label htmlFor="colourName">Colour name:</label>
            <input type="text"
                id="colourName"
                name="colourName"
                value={enteredColour}
                onChange={(e) => setEnteredColor(e.target.value.toLowerCase())}
                placeholder="apricot"
            />
            <Suspense fallback={<Loading />}>
                <ColourList enteredColour={deferredEnteredColour} isLoading={isLoading} />
            </Suspense>
        </main>
    )
}