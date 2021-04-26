/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 17:38:16
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 17:38:24
 */

/**
 * @param {string} path
 * @return {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
