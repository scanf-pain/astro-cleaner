import { useState } from "react";

/**
 * Hook for Html canvas that manages panning and zooming with a mouse or touch
 * @param initialx initial x offset, default 0
 * @param initialy initial y offset, default 0
 * @param initialZoom initial zoom value, default 1
 * @param zoomMin minimal zoom value, default 0.1
 * @param zoomMax max zoom value, default 10
 * @param zoomStep zoom step, default 0.1 ( doesn't work for touch )
 */
const useCanvasControl = (
  initialx = 0,
  initialy = 0,
  initialZoom = 1,
  zoomMin = 0.1,
  zoomMax = 10,
  zoomStep = 0.1,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [panStart, setPanStart] = useState(null);
  const [offsetX, setOffsetX] = useState(initialx);
  const [offsetY, setOffsetY] = useState(initialy);

  const [zoom, setZoom] = useState(initialZoom);

  const [lastDistance, setLastDistance] = useState(0); // For pinch zoom
  /**
   * Sets zoom to initial value
   */
  const resetZoom = () => {
    setZoom(initialZoom);
  };

  /**
   * Sets panning to initial offset
   */
  const resetOffset = () => {
    setOffsetX(initialx);
    setOffsetY(initialy);
  };

  /**
   * Handles the zoom-in action.
   */
  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + zoomStep, zoomMax));
  };

  /**
   * Handles the zoom-out action.
   */
  const zoomOut = () => {
    if (zoomMin) setZoom((prevZoom) => Math.max(prevZoom - zoomStep, zoomMin));
  };

  /**
   * Handles the wheel zoom action.
   */
  const handleWheel = (event) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  /**
   * Handles the pointer down event for initiating drag-and-drop panning.
   */
  const handlePointerDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    const initialX = event.clientX - offsetX;
    const initialY = event.clientY - offsetY;
    setPanStart({ x: initialX, y: initialY });
  };

  /**
   * Handles the pointer move event for updating the image position during drag-and-drop panning.
   */
  const handlePointerMove = (event) => {
    event.preventDefault();
    if (isDragging && panStart) {
      const dx = event.clientX - panStart.x;
      const dy = event.clientY - panStart.y;

      setOffsetX(dx);
      setOffsetY(dy);
    }
  };

  /**
   * Handles the pointer up event for ending the drag-and-drop panning.
   */
  const handlePointerUp = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  /**
   * Calculate distance between 2 touches
   * @param touch1 event touch 1
   * @param touch2 event touch 2
   * @returns {number} distance
   */
  const getTouchDistance = (touch1, touch2) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  /**
   * Handles start of touch, for zooming or panning
   */
  const handleTouchStart = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      // Single touch for panning
      setIsDragging(true);
      const initialX = e.touches[0].clientX - offsetX;
      const initialY = e.touches[0].clientY - offsetY;
      setPanStart({ x: initialX, y: initialY });
    } else if (e.touches.length === 2) {
      // Multi-touch for zooming
      setIsDragging(false);
      const dist = getTouchDistance(e.touches[0], e.touches[1]);
      setLastDistance(dist);
    }
  };

  /**
   * Handles touch move, panning for dragging 1 finger, zooming for pinch
   */
  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      // Single touch for panning
      const dx = e.touches[0].clientX - panStart.x;
      const dy = e.touches[0].clientY - panStart.y;
      // setStartX(e.touches[0].clientX);
      // setStartY(e.touches[0].clientY);
      setOffsetX(dx);
      setOffsetY(dy);
    } else if (e.touches.length === 2) {
      // Multi-touch for zooming
      const dist = getTouchDistance(e.touches[0], e.touches[1]);
      const zoomFactor = dist / lastDistance;
      setLastDistance(dist);
      setZoom((prevScale) =>
        Math.min(Math.max(prevScale * zoomFactor, 0.5), zoomMax),
      );
    }
  };

  /**
   * Handles touch end
   */
  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) setIsDragging(false);
  };

  return {
    /** x offset for canvas */ offsetX,
    /** y offset for canvas */ offsetY,
    /** is panning */ isDragging,
    resetOffset,
    /** zoom value */ zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useCanvasControl;
