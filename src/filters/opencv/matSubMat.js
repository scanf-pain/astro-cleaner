/**
 * Subtract second matrice from first matrice and save result in destMat
 * @param cvMat1 opencv Mat
 * @param cvMat2 opencv Mat
 * @param destMat opencv Mat
 */
const matSubMat = (cvMat1, cvMat2, destMat) => {
  const cv = window.cv;
  const mask = new cv.Mat();
  cv.subtract(cvMat1, cvMat2, destMat, mask, -1);
  mask.delete();
};

export default matSubMat;
