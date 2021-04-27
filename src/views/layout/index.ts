/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:45:24
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-27 17:03:57
 */
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
export const state = reactive({
  text: 111,
})
const store = useStore()
const sidebar:any = computed(() => store.getters['layout/sidebar'])
export const classObj = computed(() => {
  return {
    hideSidebar: sidebar.opened,
    openSidebar: !sidebar.opened,
    withoutAnimation: sidebar.withoutAnimation,
  }
})
