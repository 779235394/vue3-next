/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 13:59:21
 */
import DForm from './DForm.vue'

// @ts-ignore
DForm.install = function(Vue: any) {
  Vue.component(DForm.name, DForm)
}

export default DForm
