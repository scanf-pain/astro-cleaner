import { useState } from "react";

export const useCanvasZoom = (initialZoom, zoomMin, zoomMax, zoomStep) => {
  const [zoom, setZoom] = useState(initialZoom);

  /**
   * Sets zoom to initial value
   */
  const resetZoom = () => {
    setZoom(initialZoom);
  };

  /**
   * Handles the zoom-in action.
   */
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + zoomStep, zoomMax));
  };

  /**
   * Handles the zoom-out action.
   */
  const handleZoomOut = () => {
    if (zoomMin) setZoom((prevZoom) => Math.max(prevZoom - zoomStep, zoomMin));
  };

  /**
   * Handles the wheel zoom action.
   */
  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  return { zoom, setZoom, resetZoom, handleZoomIn, handleZoomOut, handleWheel };
};
