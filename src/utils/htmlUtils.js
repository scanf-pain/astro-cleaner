const createCanvas = (title) => {
  const canvas = document.createElement("canvas");
  // canvas.title = title;
  canvas.id = title;
  // canvas.className = className;
  return canvas;
};

const loadUrlImgToCanvas = (canvas, url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
};

const saveCanvas = (canvas) => {
  const link = document.createElement("a");
  link.download = "canvas-image.png";
  link.href = canvas.toDataURL();
  link.click();
};

export { createCanvas, loadUrlImgToCanvas, saveCanvas };
