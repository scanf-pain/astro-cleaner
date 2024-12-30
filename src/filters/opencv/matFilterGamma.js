/**
 * Gamma correction filter
 * @param cvMat opencv Mat
 * @param gamma
 */
const matFilterGamma = (cvMat, gamma) => {
  const cv = window.cv;

  const lut = new cv.Mat();
  lut.create(1, 256, cv.CV_8UC1);

  for (let i = 0; i < 256; i++) {
    lut.data[i] = Math.min(255, Math.max(0, 255 * Math.pow(i / 255, gamma)));
  }

  cv.LUT(cvMat, lut, cvMat);

  lut.delete();
};

export default matFilterGamma;
