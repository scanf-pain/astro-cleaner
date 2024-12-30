/**
 * Brightness filter
 * @param cvMat opencv Mat
 * @param value number to increase brightness
 */
const matFilterBrightness = (cvMat, value) => {
  if (value !== 0) {
    cvMat.convertTo(cvMat, -1, 1, value);
  }
};

export default matFilterBrightness;
