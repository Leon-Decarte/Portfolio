import { useEffect } from "react";
import { initFluid } from "smokey-fluid-cursor";

const FluidCursor = () => {
    useEffect(() => {
        initFluid({});
    }, []);

    return (
        <canvas
            id="smokey-fluid-canvas"
            className="fixed inset-0 z-[9999] pointer-events-none"
        />
    );
};

export default FluidCursor;