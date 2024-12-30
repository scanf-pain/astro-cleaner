/**
 * Median filter
 * @param cvMat opencv Mat
 */
const matFilterMedian = (cvMat) => {
  window.cv.medianBlur(cvMat, cvMat, 201);
};

export default matFilterMedian;
