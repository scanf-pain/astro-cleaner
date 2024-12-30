/**
 * Converts openCV Mat to 1 channel
 * @param cvMat opencv Mat
 */
const matToGray = (cvMat) => {
  const cv = window.cv;

  if (cvMat.channels() === 3) {
    // If it's RGB image
    cv.cvtColor(cvMat, cvMat, cv.COLOR_RGB2GRAY);
  } else if (cvMat.channels() === 4) {
    // If it has an alpha channel (RGBA)
    cv.cvtColor(cvMat, cvMat, cv.COLOR_RGBA2GRAY);
  }
};

export default matToGray;
