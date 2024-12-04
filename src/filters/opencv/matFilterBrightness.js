/**
 * Brightness by multiplication
 * @param cvMat opencv Mat
 * @param multiplier number to multiply brightness
 */
const matFilterBrightness = (cvMat, multiplier) => {
  if (multiplier !== 1) {
    cvMat.convertTo(cvMat, -1, multiplier, 0);
  }
};

export default matFilterBrightness;
