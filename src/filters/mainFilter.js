import matTo3Ch from "./opencv/matTo3Ch.js";
import matFilterBrightness from "./opencv/matFilterBrightness.js";
import matSubMat from "./opencv/matSubMat.js";
import matFilterMedian from "./opencv/matFilterMedian.js";
import matFilterContrast from "./opencv/matFilterContrast.js";
import matFilterGamma from "./opencv/matFilterGamma.js";

const filterCanvas = (srcCanvas, destCanvas, filters) => {
  const cv = window.cv;
  const srcImg = cv.imread(srcCanvas);

  matTo3Ch(srcImg);

  const filtered = srcImg.clone();

  // main filter
  matFilterMedian(filtered);

  matFilterContrast(filtered, filters.intensity);

  matSubMat(srcImg, filtered, filtered);

  // additional filters
  matFilterBrightness(filtered, filters.brightness);

  matFilterContrast(filtered, filters.contrast);

  matFilterGamma(filtered, filters.gamma);

  cv.imshow(destCanvas, filtered);

  srcImg.delete();
  filtered.delete();
};

export default filterCanvas;
