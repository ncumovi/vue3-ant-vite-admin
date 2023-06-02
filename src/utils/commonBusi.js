// 公共业务方法
/**
 *
 * @param {*} arr
 * @param {*} key
 * @returns
 * @description 从数组对象获取key值组成的数组
 */
export const getDataFromArr = (arr, key) => {
  if (!arr || !arr.length) {
    return;
  }
  return arr.map((o) => o && o[key]);
};

export const getPreService = () => {
  return "service";
};
