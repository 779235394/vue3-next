<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-02-25 17:48:47
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-03-11 11:19:51
-->
<template>
  <el-container class="main-container">
    <el-aside class="side-panel">
      <widgetPanel :designer="designer"></widgetPanel>
    </el-aside>
    <el-container class="center-layout-container">
      <el-main class="form-widget-main">
        <el-scrollbar class="container-scroll-bar">
          <formWidget :designer="designer" :form-config="designer.formConfig"></formWidget>
        </el-scrollbar>
      </el-main>
    </el-container>
    <el-aside>
      <setting-panel
        :designer="designer"
        :selected-widget="designer.selectedWidget"
        :form-config="designer.formConfig"
        @edit-event-handler="editHangler"
      />
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import { createDesigner } from './designer'
const designer: any = ref(createDesigner())
const designerConfig = ref({
  type: Object,
  default: () => {
    return {
      languageMenu: true, // 是否显示语言切换菜单
      externalLink: true, // 是否显示GitHub、文档等外部链接
      formTemplates: true, // 是否显示表单模板
      eventCollapse: true, // 是否显示组件事件属性折叠面板
      clearDesignerButton: true, // 是否显示清空设计器按钮
      previewFormButton: true, // 是否显示预览表单按钮
      importJsonButton: true, // 是否显示导入JSON按钮
      exportJsonButton: true, // 是否显示导出JSON器按钮
      exportCodeButton: true, // 是否显示导出代码按钮
      generateSFCButton: true, // 是否显示生成SFC按钮

      presetCssCode: '', // 设计器预设CSS样式代码

      resetFormJson: false, // 是否在设计器初始化时将表单内容重置为空
    }
  },
})
const editHangler = (eventName, eventParams) => {
  console.log(eventName, eventParams)
}
provide('getDesignerConfig', designerConfig)
</script>

<style lang="scss" scoped>
.el-container.main-container {
  height: 100%;
  :deep(aside) {
    /* 防止aside样式被外部样式覆盖！！ */
    margin: 0;
    padding: 0;
    background: inherit;
  }
  .el-aside.side-panel {
    width: 260px !important;
    overflow-y: hidden;
  }
  .el-container.center-layout-container {
    min-width: 680px;
    border-left: 2px dotted #ebeef5;
    border-right: 2px dotted #ebeef5;
    .el-main.form-widget-main {
      padding: 0 !important;
      position: relative;
      overflow-x: hidden;
      margin: 0;
    }
  }
}
</style>
