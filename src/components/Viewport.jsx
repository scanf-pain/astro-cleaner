import { useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";
import { useCanvasPan } from "../hooks/canvas/useCanvasPan.js";
import { useCanvasZoom } from "../hooks/canvas/useCanvasZoom.js";
import { twMerge } from "tailwind-merge";
import { GroupIcon, ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";

const Viewport = ({ sourceCanvas, disabled }) => {
  const outputCanvasRef = useRef(null);

  const {
    offsetX,
    offsetY,
    isDragging,
    resetOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useCanvasPan();

  const { zoom, resetZoom, handleWheel, handleZoomOut, handleZoomIn } =
    useCanvasZoom(1, 0.1, 100, 0.1);

  // --- canvas rendering ---

  const zoomCanvas = (context, zoom) => {
    context.scale(zoom, zoom);
  };

  useEffect(() => {
    if (outputCanvasRef && sourceCanvas) {
      outputCanvasRef.current.height = sourceCanvas.height;
      outputCanvasRef.current.width = sourceCanvas.width;
      const context = outputCanvasRef.current.getContext("2d");

      if (context) {
        const zoomedWidth = outputCanvasRef.current.width * zoom;
        const zoomedHeight = outputCanvasRef.current.height * zoom;
        const translateX = (outputCanvasRef.current.width - zoomedWidth) / 2;
        const translateY = (outputCanvasRef.current.height - zoomedHeight) / 2;

        console.log("rendering canvas");
        context.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
        context.translate(translateX + offsetX, translateY + offsetY);
        zoomCanvas(context, zoom);
        context.drawImage(sourceCanvas, 0, 0);
      }
    }
  }, [sourceCanvas, outputCanvasRef, disabled, zoom, offsetX, offsetY]);

  // --- handles ---

  const handleReset = () => {
    resetZoom();
    resetOffset();
  };

  return (
    <section
      className={
        "viewport flex h-full w-full flex-initial grow items-center justify-center self-center overflow-clip p-4"
      }
    >
      <canvas
        ref={outputCanvasRef}
        className={twMerge(
          "h-full w-full",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        title={"Filtered image"}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      <div className={"absolute bottom-10 right-10 flex items-center gap-1"}>
        <Button onClick={handleZoomOut} isIconOnly={true} title={"Zoom out"}>
          <ZoomOutIcon className={"size-6"} />
        </Button>
        <p>{Math.round(zoom * 100)}%</p>
        <Button onClick={handleZoomIn} isIconOnly={true} title={"Zoom in"}>
          <ZoomInIcon className={"size-6"} />
        </Button>
        <Button onClick={handleReset} isIconOnly={true} title={"Reset zoom"}>
          <GroupIcon className={"size-6"} />
        </Button>
      </div>
      <div
        className={"absolute bottom-0 h-4 w-full bg-content1 md:hidden"}
      ></div>
    </section>
  );
};

Viewport.propTypes = {
  sourceCanvas: PropTypes.instanceOf(HTMLCanvasElement).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Viewport;
