<template>
  <div class="form-widget-container">
    <el-form
      class="full-height-width widget-form"
      :label-position="labelPosition"
      :class="[customClass, layoutType + '-layout']"
      :size="size"
      :validate-on-rule-change="false"
    >
      <div
        v-if="designer.widgetList.length === 0"
        class="no-widget-hint"
      >
        {{ designerText.noWidgetHint }}
      </div>
      <div class="form-widget-list">
        <draggable
        :list="designer.widgetList"
        v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
        handle=".drag-handler"
        @end="onDragEnd"
        @add="onDragAdd"
        @update="onDragUpdate"
        :move="checkMove"
        tag="transition-group"
        :component-data="{name:'fade'}"
        item-key="id"
      >
          <template #item="{ element,index }">
           <field-element :designer="designer" :designerText="designerText" :element="element" :zhIndex="index"></field-element>
          </template>
      </draggable>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
// import './container-widget/index.js'
import { designerText } from '../designerText'

const { designer, formConfig, optionData, formJson } = defineProps({
  designer: { type: Object, default: () => { } },
  formConfig: { type: Object, default: () => { } },
  optionData: { type: Object, default: () => { } },
  formJson: { type: Object, default: () => { } },
})

const formJsonObj:any = ref(formJson)
const formModel = ref({})
const widgetRefList = ref({})
const getFormConfig:any = () => formJsonObj.formConfig
const getDesignerConfig:any = inject('getDesignerConfig')
console.log(getDesignerConfig)
provide('refList', widgetRefList)
provide('globalModel', {
  formModel: formModel,
})
provide('formConfig', formConfig)
provide('globalOptionData', optionData)
provide('getOptionData', () => optionData)
provide('getFormConfig', getFormConfig)

const labelPosition = computed(() => {
  if (!!designer.formConfig && !!designer.formConfig.labelPosition) {
    return designer.formConfig.labelPosition
  }
  return 'left'
})

const size = computed(() => {
  if (!!designer.formConfig && !!designer.formConfig.size) {
    return designer.formConfig.size
  }

  return 'medium'
})

const customClass = computed(() => {
  return formConfig.customClass || ''
})

const layoutType = computed(() => {
  return designer.getLayoutType()
})

const disableFirefoxDefaultDrop = () => {
  const isFirefox = (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1)
  if (isFirefox) {
    document.body.ondrop = function(event) {
      event.stopPropagation()
      event.preventDefault()
    }
  }
}

designer.initDesigner( !!getDesignerConfig.resetFormJson )
designer.loadPresetCssCode( getDesignerConfig.presetCssCode )
disableFirefoxDefaultDrop() /* 禁用Firefox默认拖拽搜索功能!! */
designer.registerFormWidget()

const onDragEnd = () => {
  console.log('drag end000', designer.widgetList)
}

const onDragAdd = (evt) => {
  const newIndex = evt.newIndex
  if (designer.widgetList[newIndex]) {
    designer.setSelected(designer.widgetList[newIndex])
  }

  designer.emitHistoryChange()
}

const onDragUpdate = () => { /* 在VueDraggable内拖拽组件发生位置变化时会触发update，未发生组件位置变化不会触发！！ */
  designer.emitHistoryChange()
}

const checkMove = (evt) => {
  return designer.checkWidgetMove(evt)
}
</script>

<style lang="scss" scoped>
.container-scroll-bar {
  :deep(.el-scrollbar__wrap),
  :deep(.el-scrollbar__view) {
    overflow-x: hidden;
  }
}

.form-widget-container {
  padding: 10px;
  background: #f1f2f3;

  overflow-x: hidden;
  overflow-y: auto;

  .el-form.full-height-width {
    height: 100%;
    padding: 3px;
    background: #ffffff;

    .no-widget-hint {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 18px;
      color: #999999;
    }

    .form-widget-list {
      min-height: calc(100vh - 175px);
      padding: 3px;
      :deep(.ghost){
        content: '';
        font-size: 0;
        height: 3px;
        box-sizing: border-box;
        background: $--color-primary;
        border: 2px solid $--color-primary;
        outline-width: 0;
        padding: 0;
        overflow: hidden;
      }
    }
  }

  .el-form.PC-layout {
    //
  }

  .el-form.Pad-layout {
    margin: 0 auto;
    max-width: 960px;
    border-radius: 15px;
    box-shadow: 0 0 1px 10px #495060;
  }

  .el-form.H5-layout {
    margin: 0 auto;
    width: 420px;
    border-radius: 15px;
    //border-width: 10px;
    box-shadow: 0 0 1px 10px #495060;
  }

  .el-form.widget-form :deep(.el-row) {
    padding: 2px;
    border: 1px dashed rgba(170, 170, 170, 0.75);
  }
}

.grid-cell {
  min-height: 30px;
  border-right: 1px dotted #cccccc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
