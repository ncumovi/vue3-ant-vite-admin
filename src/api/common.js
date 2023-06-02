import request from "@/utils/request";
import { getPreService } from "@/utils/commonBusi.js";
const preService = getPreService();

/**
 * 
 * @param {*} params 
 * @returns 
 * @description  获取公共key
 */
export function getPublicKey(params) {
  return request({
    url: preService + "/api/user/getKey",
    method: "get",
    params,
  });
}

