/**
 * Converts openCV Mat to 3 channels in situ
 * @param cvMat opencv Mat
 */
const matTo3Ch = (cvMat) => {
  const cv = window.cv;

  if (cvMat.channels() === 1) {
    // If it's a single-channel (grayscale) image
    cv.cvtColor(cvMat, cvMat, cv.COLOR_GRAY2RGB);
  } else if (cvMat.channels() === 4) {
    // If it has an alpha channel (RGBA)
    cv.cvtColor(cvMat, cvMat, cv.COLOR_RGBA2RGB);
  }
};

export default matTo3Ch;
