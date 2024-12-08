import matTo3Ch from "./opencv/matTo3Ch.js";
import matFilterMedian from "./opencv/matFilterMedian.js";
import matFilterBrightness from "./opencv/matFilterBrightness.js";
import matSubMat from "./opencv/matSubMat.js";

const filterCanvas = (srcCanvas, destCanvas, filters) => {
  const cv = window.cv;

  const srcImg = cv.imread(srcCanvas);

  matTo3Ch(srcImg);

  const filtered = srcImg.clone();

  matFilterMedian(filtered);

  matFilterBrightness(filtered, filters.intensiy);

  matSubMat(srcImg, filtered, filtered);

  matFilterBrightness(filtered, filters.brightness);

  cv.imshow(destCanvas, filtered);

  srcImg.delete();
  filtered.delete();
};

export default filterCanvas;
