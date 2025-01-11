import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import { GroupIcon, ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import useCanvasControl from "../hooks/canvas/useCanvasControl.js";

const Viewport = ({ sourceCanvas, disabled }) => {
  const outputCanvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ x: 0, y: 0 });

  const {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    offsetX,
    offsetY,
    resetOffset,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
  } = useCanvasControl(0, 0, 0.9);

  // --- canvas rendering ---

  // renders canvas
  useEffect(() => {
    if (outputCanvasRef.current) {
      outputCanvasRef.current.height = sourceCanvas.height;
      outputCanvasRef.current.width = sourceCanvas.width;
      const context = outputCanvasRef.current.getContext("2d");

      if (context) {
        const rx = outputCanvasRef.current.width;
        const ry = outputCanvasRef.current.height;

        const cx = outputCanvasRef.current.offsetWidth;
        const cy = outputCanvasRef.current.offsetHeight;

        const ix = outputCanvasRef.current.width;
        const iy = outputCanvasRef.current.height;

        context.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);

        context.translate(rx * 0.5, ry * 0.5); // center the image

        const imgRatio = ix / iy;

        context.scale(1, cx / imgRatio / cy); // resolution

        context.translate(offsetX, offsetY);

        context.scale(zoom, zoom);

        context.drawImage(sourceCanvas, -ix * 0.5, -iy * 0.5);
      }
    }
  }, [
    sourceCanvas,
    outputCanvasRef,
    disabled,
    zoom,
    offsetX,
    offsetY,
    canvasSize,
  ]);

  // observe canvas size change, need to trigger redraw when window size changes
  useEffect(() => {
    const canvasElement = outputCanvasRef.current;
    if (!canvasElement) return;

    const updateSize = () => {
      setCanvasSize({
        x: canvasElement.offsetWidth,
        y: canvasElement.offsetHeight,
      });
    };

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    observer.observe(canvasElement);

    updateSize();

    return () => {
      observer.disconnect();
    };
  }, []);

  // --- handles ---

  const handleReset = () => {
    resetZoom();
    resetOffset();
  };

  return (
    <section
      className={
        "viewport flex min-h-full min-w-full grow items-stretch border-1 border-blue-500"
      }
    >
      <canvas
        ref={outputCanvasRef}
        className={twMerge(
          "min-h-full min-w-full touch-none border-4 border-dashed border-red-500",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        title={"Filtered image"}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></canvas>
      <div className={"absolute bottom-10 right-10 flex items-center gap-1"}>
        <Button onClick={() => zoomOut()} isIconOnly={true} title={"Zoom out"}>
          <ZoomOutIcon className={"size-6"} />
        </Button>
        <p>{Math.round(zoom * 100)}%</p>
        <Button onClick={() => zoomIn()} isIconOnly={true} title={"Zoom in"}>
          <ZoomInIcon className={"size-6"} />
        </Button>
        <Button onClick={handleReset} isIconOnly={true} title={"Reset zoom"}>
          <GroupIcon className={"size-6"} />
        </Button>
      </div>
    </section>
  );
};

Viewport.propTypes = {
  sourceCanvas: PropTypes.instanceOf(HTMLCanvasElement).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Viewport;
