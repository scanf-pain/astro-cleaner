import { useState } from "react";

export const useCanvasPan = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [panStart, setPanStart] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  /**
   * Handles the pointer down event for initiating drag-and-drop panning.
   */
  const handlePointerDown = (event) => {
    setIsDragging(true);
    const initialX = event.clientX - offsetX;
    const initialY = event.clientY - offsetY;
    setPanStart({ x: initialX, y: initialY });
  };

  /**
   * Handles the pointer move event for updating the image position during drag-and-drop panning.
   */
  const handlePointerMove = (event) => {
    if (isDragging && panStart) {
      event.preventDefault();

      const offsetXDelta = event.clientX - panStart.x;
      const offsetYDelta = event.clientY - panStart.y;

      setOffsetX(offsetXDelta);
      setOffsetY(offsetYDelta);
    }
  };

  /**
   * Handles the pointer up event for ending the drag-and-drop panning.
   */
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const resetOffset = () => {
    setOffsetX(0);
    setOffsetY(0);
  };

  return {
    /** x offset for canvas */ offsetX,
    /** y offset for canvas */ offsetY,
    /** is panning */ isDragging,
    resetOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
