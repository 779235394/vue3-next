<template>
  <div>
    <el-form
      :model="formConfig"
      size="small"
      label-position="left"
      label-width="120px"
      class="setting-form"
      @submit.prevent
    >
      <el-collapse v-model="formActiveCollapseNames" class="setting-collapse">
        <el-collapse-item name="1" :title="designerText.setting.basicSetting">
          <el-form-item :label="designerText.setting.formSize">
            <el-select v-model="formConfig.size">
              <el-option
                v-for="item in formSizes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="designerText.setting.labelPosition">
            <el-radio-group v-model="formConfig.labelPosition" class="radio-group-custom">
              <el-radio-button label="left">{{ designerText.setting.leftPosition }}</el-radio-button>
              <el-radio-button label="top">{{ designerText.setting.topPosition }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="designerText.setting.labelAlign">
            <el-radio-group v-model="formConfig.labelAlign" class="radio-group-custom">
              <el-radio-button label="label-left-align">{{ designerText.setting.leftAlign }}</el-radio-button>
              <el-radio-button label="label-center-align">{{ designerText.setting.centerAlign }}</el-radio-button>
              <el-radio-button label="label-right-align">{{ designerText.setting.rightAlign }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="designerText.setting.labelWidth">
            <el-input-number v-model="formConfig.labelWidth" :min="0" style="width: 100%"></el-input-number>
          </el-form-item>
          <el-form-item :label="designerText.setting.formCss">
            <el-button
              type="info"
              icon="edit"
              plain
              round
              @click="editFormCss"
            >{{ designerText.setting.addCss }}</el-button>
          </el-form-item>
          <!-- -->
          <el-form-item :label="designerText.setting.customClass">
            <el-select
              v-model="formConfig.customClass"
              multiple
              filterable
              allow-create
              default-first-option
            >
              <el-option v-for="(item, idx) in cssClassList" :key="idx" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <!-- -->
          <el-form-item :label="designerText.setting.globalFunctions">
            <el-button
              type="info"
              icon="edit"
              plain
              round
              @click="editGlobalFunctions"
            >{{ designerText.setting.addEventHandler }}</el-button>
          </el-form-item>
          <el-form-item label-width="0">
            <el-divider class="custom-divider">{{ designerText.setting.formSFCSetting }}</el-divider>
          </el-form-item>
          <el-form-item :label="designerText.setting.formModelName">
            <el-input type="text" v-model="formConfig.modelName"></el-input>
          </el-form-item>
          <el-form-item :label="designerText.setting.formRefName">
            <el-input type="text" v-model="formConfig.refName"></el-input>
          </el-form-item>
          <el-form-item :label="designerText.setting.formRulesName">
            <el-input type="text" v-model="formConfig.rulesName"></el-input>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item
          v-if="showEventCollapse()"
          name="2"
          :title="designerText.setting.eventSetting"
        >
          <el-form-item label="onFormCreated" label-width="150px">
            <el-button
              type="info"
              icon="edit"
              plain
              round
              @click="editFormEventHandler('onFormCreated')"
            >{{ designerText.setting.addEventHandler }}</el-button>
          </el-form-item>
          <el-form-item label="onFormMounted" label-width="150px">
            <el-button
              type="info"
              icon="edit"
              plain
              round
              @click="editFormEventHandler('onFormMounted')"
            >{{ designerText.setting.addEventHandler }}</el-button>
          </el-form-item>
          <!-- -->
          <el-form-item label="onFormDataChange" label-width="150px">
            <el-button
              type="info"
              icon="edit"
              plain
              round
              @click="editFormEventHandler('onFormDataChange')"
            >{{ designerText.setting.addEventHandler }}</el-button>
          </el-form-item>
          <!-- -->
          <!--
          <el-form-item label="onFormValidate">
            <el-button type="info" icon="el-icon-edit" plain round @click="editFormEventHandler('onFormValidate">
              {{designerText.setting.addEventHandler}}</el-button>
          </el-form-item>
          -->
        </el-collapse-item>
      </el-collapse>
    </el-form>

    <div
      v-if="showFormEventDialogFlag"
      class
      v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']"
    >
      <el-dialog
        :title="designerText.setting.editFormEventHandler"
        v-model="showFormEventDialogFlag"
        :show-close="true"
        custom-class="drag-dialog small-padding-dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
      >
        <el-alert type="info" :closable="false" :title="'form.' + eventParamsMap[curEventName]"></el-alert>
        <codeEditor :mode="'javascript'" :readonly="false" v-model="formEventHandlerCode" ref="ecEditor"></codeEditor>
        <el-alert type="info" :closable="false" title="}"></el-alert>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showFormEventDialogFlag = false">{{ designerText.hint.cancel }}</el-button>
            <el-button type="primary" @click="saveFormEventHandler">{{ designerText.hint.confirm }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <div
      v-if="showEditFormCssDialogFlag"
      class
      v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']"
    >
      <el-dialog
        :title="designerText.setting.formCss"
        v-model="showEditFormCssDialogFlag"
        :show-close="true"
        custom-class="drag-dialog small-padding-dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
      >
        <codeEditor :mode="'css'" :readonly="false" v-model="formCssCode"></codeEditor>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showEditFormCssDialogFlag = false">{{ designerText.hint.cancel }}</el-button>
            <el-button type="primary" @click="saveFormCss">{{ designerText.hint.confirm }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <div
      v-if="showEditFunctionsDialogFlag"
      class
      v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']"
    >
      <el-dialog
        :title="designerText.setting.globalFunctions"
        v-model="showEditFunctionsDialogFlag"
        :show-close="true"
        custom-class="drag-dialog small-padding-dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
      >
        <codeEditor :mode="'javascript'" :readonly="false" v-model="functionsCode"  ref="gfEditor"></codeEditor>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showEditFunctionsDialogFlag = false">{{ designerText.hint.cancel }}</el-button>
            <el-button type="primary" @click="saveGlobalFunctions">{{ designerText.hint.confirm }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { deepClone, insertCustomCssToHead, insertGlobalFunctionsToHtml } from '@/utils/util'

const props = defineProps({
  designerText: { type: Object, default: () => { } },
  designer: { type: Object, default: () => { } },
  formConfig: { type: Object, default: () => { } },
})
const { designerText, designer, formConfig } = toRefs(props)
const getDesignerConfig = inject('getDesignerConfig')

const designerConfig = ref(getDesignerConfig)

const formActiveCollapseNames = ref(['1', '2'])

const formSizes = ref([
  { label: 'default', value: '' },
  { label: 'large', value: 'large' },
  // {label: 'medium', value: 'medium'},
  { label: 'small', value: 'small' },
  // {label: 'mini', value: 'mini'},
])

const showEditFormCssDialogFlag = ref(false)
const formCssCode: any = ref('')
const cssClassList: any = ref([])

const showEditFunctionsDialogFlag = ref(false)
const functionsCode = ref('')

const showFormEventDialogFlag = ref(false)
const formEventHandlerCode:any = ref()
const curEventName: any = ref('')
const gfEditor:any = ref()
const ecEditor:any = ref()
const eventParamsMap = ref({
  'onFormCreated': 'onFormCreated() {',
  'onFormMounted': 'onFormMounted() {',
  'onFormDataChange': 'onFormDataChange(fieldName, newValue, oldValue, formModel, subFormName, subFormRowIndex) {',
  // 'onFormValidate':     'onFormValidate() {',
})

onBeforeMount(() => {
  // 导入表单JSON后需要重新加载自定义CSS样式！！！
  designer.value.handleEvent('form-json-imported', () => {
    formCssCode.value = formConfig.value.cssCode
    insertCustomCssToHead(formCssCode)
    extractCssClass()
    designer.value.emitEvent('form-css-updated', deepClone(cssClassList))
  })
})
onMounted(() => {
  /* SettingPanel和FormWidget为兄弟组件, 在FormWidget加载formConfig时，
         此处SettingPanel可能无法获取到formConfig.cssCode, 故加个延时函数！ */
  setTimeout(() => {
    formCssCode.value = formConfig.value.cssCode
    insertCustomCssToHead(formCssCode)
    extractCssClass()
    designer.value.emitEvent('form-css-updated', deepClone(cssClassList))
  }, 1200)
})

const showEventCollapse = () => {
  if (designerConfig['eventCollapse'] === undefined) {
    return true
  }

  return !!designerConfig['eventCollapse']
}

const editFormCss = () => {
  formCssCode.value = designer.value.formConfig.cssCode
  showEditFormCssDialogFlag.value = true
}

const extractCssClass = () => {
  const regExp = /\..*{/g
  const result = formCssCode.value.match(regExp)
  const cssNameArray: any = []

  if (!!result && result.length > 0) {
    result.forEach((rItem) => {
      const classArray = rItem.split(',') // 切分逗号分割的多个class
      if (classArray.length > 0) {
        classArray.forEach((cItem) => {
          const caItem = cItem.trim()
          if (caItem.indexOf('.', 1) !== -1) { // 查找第二个.位置
            const newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf('.', 1)) // 仅截取第一、二个.号之间的class
            if (newClass) {
              cssNameArray.push(newClass.trim())
            }
          } else if (caItem.indexOf(' ') !== -1) { // 查找第一个空格位置
            const newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf(' ')) // 仅截取第一、二个.号之间的class
            if (newClass) {
              cssNameArray.push(newClass.trim())
            }
          } else {
            if (caItem.indexOf('{') !== -1) { // 查找第一个{位置
              const newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf('{'))
              cssNameArray.push(newClass.trim())
            } else {
              const newClass = caItem.substring(caItem.indexOf('.') + 1)
              cssNameArray.push(newClass.trim())
            }
          }
        })
      }
    })
  }

  // cssClassList.length = 0
  cssClassList.value.splice(0, cssClassList.length) // 清除数组必须用splice，length=0不会响应式更新！！
  cssClassList.value = Array.from(new Set(cssNameArray)) // 数组去重
}

const saveFormCss = () => {
  extractCssClass()
  designer.value.formConfig.cssCode = formCssCode
  insertCustomCssToHead(formCssCode)
  showEditFormCssDialogFlag.value = false

  designer.value.emitEvent('form-css-updated', deepClone(cssClassList))
}

const editGlobalFunctions = () => {
  functionsCode.value = designer.value.formConfig.functions
  showEditFunctionsDialogFlag.value = true
}

const saveGlobalFunctions = () => {
  const codeHints = gfEditor.value.getEditorAnnotations()
  let syntaxErrorFlag = false
  if (!!codeHints && (codeHints.length > 0)) {
    codeHints.forEach((chItem) => {
      if (chItem.type === 'error') {
        syntaxErrorFlag = true
      }
    })

    if (syntaxErrorFlag) {
      ElMessage.error(designerText.value.setting.syntaxCheckWarning)
      return
    }
  }
  designer.value.formConfig.functions = functionsCode.value
  insertGlobalFunctionsToHtml(functionsCode.value)
  showEditFunctionsDialogFlag.value = false
}

const editFormEventHandler = (eventName) => {
  console.log(formConfig.value)
  curEventName.value = eventName
  formEventHandlerCode.value = formConfig.value[eventName]
  showFormEventDialogFlag.value = true
}

const saveFormEventHandler = () => {
  const codeHints = ecEditor.value.getEditorAnnotations()
  let syntaxErrorFlag = false
  if (!!codeHints && (codeHints.length > 0)) {
    codeHints.forEach((chItem) => {
      if (chItem.type === 'error') {
        syntaxErrorFlag = true
      }
    })

    if (syntaxErrorFlag) {
      ElMessage.error(designerText.value.setting.syntaxCheckWarning)
      return
    }
  }
  formConfig.value[curEventName.value] = formEventHandlerCode.value
  showFormEventDialogFlag.value = false
}

</script>

<style lang="scss" scoped>
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

  .radio-group-custom {
    :deep(.el-radio-button__inner) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  .custom-divider.el-divider--horizontal {
    margin: 10px 0;
  }
}

.setting-collapse {
  width: 100%;
  :deep(.el-collapse-item__content) {
    padding-bottom: 6px;
  }

  :deep(.el-collapse-item__header) {
    font-style: italic;
    font-weight: bold;
  }
}

.small-padding-dialog {
  :deep(.el-dialog__body) {
    padding: 6px 15px 12px 15px;
  }
}
</style>
