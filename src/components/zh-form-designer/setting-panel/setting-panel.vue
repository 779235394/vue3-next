<template>
  <el-container class="panel-container">
    <el-tabs :active-name="activeTab" style="width:100%; overflow: hidden">
      <el-tab-pane v-if="designer" :label="designerText.hint.formSetting" name="2">
        <el-scrollbar class="setting-scrollbar" :style="{ height: scrollerHeight }">
          <form-setting :designerText="designerText" :designer="designer" :form-config="formConfig"></form-setting>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <div
      v-if="showWidgetEventDialogFlag"
      class
      v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']"
    >
      <el-dialog
        :title="designerText.setting.editWidgetEventHandler"
        v-model="showWidgetEventDialogFlag"
        :show-close="true"
        custom-class="drag-dialog small-padding-dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
      >
        <el-alert type="info" :closable="false" :title="eventHeader"></el-alert>
        <codeEditor :mode="'javascript'" :readonly="false" v-model="eventHandlerCode" ref="ecEditor"></codeEditor>
        <el-alert type="info" :closable="false" title="}"></el-alert>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showWidgetEventDialogFlag = false">{{ designerText.hint.cancel }}</el-button>
            <el-button type="primary" @click="saveEventHandler">{{ designerText.hint.confirm }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import {
  addWindowResizeHandler,
} from '@/utils/util'
// import Mitt from 'mitt'
import { designerText } from '../designer-text'
import { ElMessage } from 'element-plus'
// const vueInstance = new Mitt()
const props = defineProps({
  designer: { type: Object, default: () => null },
  formConfig: { type: Object, default: () => {} },
  selectedWidget: { type: Object, default: () => { } },
})
// const getDesignerConfig = inject('getDesignerConfig')
const { designer } = props
const { formConfig, selectedWidget } = toRefs(props)
const scrollerHeight:any = ref(0)
const activeTab = ref('2')
const showWidgetEventDialogFlag = ref(false)
const eventHandlerCode = ref('')
const eventHeader = ref('')
// const designerConfig = ref(getDesignerConfig)
// const widgetActiveCollapseNames = ref(['1', '3']) // ['1', '2', '3'],
// const formActiveCollapseNames = ref(['1', '2'])

const curEventName:any = ref('')
const ecEditor = ref()
// const subFormChildWidgetFlag = ref(false)

// const optionModel:any = computed({
//   get() {
//     return selectedWidget.options
//   },

//   set(newValue) {
//     selectedWidget.options = newValue
//   },
// })

onBeforeMount(() => {
  // vueInstance.on('editEventHandler', (eventParams) => {
  //   editEventHandler(eventParams[0], eventParams[1])
  // })

  designer.handleEvent('form-css-updated', (cssClassList) => {
    designer.setCssClassList(cssClassList)
  })
})
onMounted(() => {
  // if (!designer.selectedWidget) {
  //   activeTab.value = '2'
  // } else {
  //   activeTab.value = '1'
  // }

  scrollerHeight.value = window.innerHeight - 200 + 'px'
  addWindowResizeHandler(() => {
    nextTick(() => {
      scrollerHeight.value = window.innerHeight - 200 + 'px'
      // console.log(this.scrollerHeight)
    })
  })
  watch(() => selectedWidget.value.options, () => {
    designer.saveCurrentHistoryStep()
  }, { deep: true })
  watch(formConfig, (old1, new1) => {
    console.log(old1, new1, 777)
    designer.saveCurrentHistoryStep()
  }, { deep: true })
})

// const showEventCollapse = (() => {
//   if (designerConfig['eventCollapse'] === undefined) {
//     return true
//   }

//   return !!designerConfig['eventCollapse']
// })

// const hasPropEditor = ((propName, editorName) => {
//   if (!editorName) {
//     return false
//   }

//   let originalPropName = propName.replace(selectedWidget.type + '-', '')  //去掉组件名称前缀-，如果有的话！！
//   return designer.hasConfig(selectedWidget, originalPropName)
// })

// const getPropEditor = (propName, editorName)=>{
//   let originalPropName = propName.replace(selectedWidget.type + '-', '')  //去掉组件名称前缀-，如果有的话！！
//   let ownPropEditorName = `${selectedWidget.type}-${originalPropName}-editor`
//   //console.log(ownPropEditorName, this.$options.components[ownPropEditorName])
//   if (!!vueInstance.options.components[ownPropEditorName]) {  //局部注册的属性编辑器组件
//     return ownPropEditorName
//   }

//   //return !!this.$root.$options.components[ownPropEditorName] ? ownPropEditorName : editorName  //Vue2全局注册的属性编辑器组件
//   return !!this.$root.$.appContext.components[ownPropEditorName] ? ownPropEditorName : editorName  //Vue3全局注册的属性编辑器组件
// },

// const showCollapse = ((propsObj) => {
//   let result = false

//   for (let propName in propsObj) {
//     if (!propsObj.hasOwnProperty(propName)) {
//       continue
//     }

//     if (hasPropEditor(propName, propsObj[propName])) {
//       result = true
//       break
//     }
//   }

//   return result
// })

// const editEventHandler = ((eventName, eventParams) => {
//   //debugger

//   curEventName.value = eventName
//   eventHeader.value = `${optionModel.name}.${eventName}(${eventParams.join(', ')}) {`
//   eventHandlerCode.value = selectedWidget.options[eventName] || ''

//   // 设置字段校验函数示例代码
//   if ((eventName === 'onValidate') && (!optionModel['onValidate'])) {
//     eventHandlerCode.value = "  /* sample code */\n  /*\n  if ((value > 100) || (value < 0)) {\n    callback(new Error('error message'))  //fail\n  } else {\n    callback();  //pass\n  }\n  */"
//   }

//   showWidgetEventDialogFlag.value = true
// })

const saveEventHandler = () => {
  const codeHints = ecEditor.value.getEditorAnnotations()
  let syntaxErrorFlag = false
  if (!!codeHints && (codeHints.length > 0)) {
    codeHints.forEach((chItem) => {
      if (chItem.type === 'error') {
        syntaxErrorFlag = true
      }
    })

    if (syntaxErrorFlag) {
      ElMessage.error(designer.setting.syntaxCheckWarning)
      return
    }
  }
  selectedWidget.value.options[curEventName] = eventHandlerCode
  showWidgetEventDialogFlag.value = false
}
watch(designer.selectedWidget, (val) => {
  if (val) {
    activeTab.value = '1'
  }
})

</script>

<style lang="scss" scoped>
.panel-container {
  padding: 0 8px;
}

.setting-scrollbar {
  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden; /* IE浏览器隐藏水平滚动条箭头！！ */
  }
}

.setting-collapse {
  :deep(.el-collapse-item__content) {
    padding-bottom: 6px;
  }

  :deep(.el-collapse-item__header) {
    font-style: italic;
    font-weight: bold;
  }
}

.setting-form {
  :deep(.el-form-item__label) {
    font-size: 13px;
    //text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  :deep(.el-form-item--small.el-form-item) {
    margin-bottom: 10px;
  }
}

/* 隐藏Chrome浏览器中el-input数字输入框右侧的上下调整小箭头 */
:deep(.hide-spin-button) input::-webkit-outer-spin-button,
:deep(.hide-spin-button) input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

/* 隐藏Firefox浏览器中el-input数字输入框右侧的上下调整小箭头 */
:deep(.hide-spin-button) input[type="number"] {
  -moz-appearance: textfield;
}

:deep(.custom-divider.el-divider--horizontal) {
  margin: 10px 0;
}

:deep(.custom-divider-margin-top.el-divider--horizontal) {
  margin: 20px 0;
}

.small-padding-dialog {
  :deep(.el-dialog__body) {
    padding: 6px 15px 12px 15px;
  }
}
</style>
