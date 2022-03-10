/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-03-09 11:29:11
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-03-10 16:49:46
 */
import { deepClone } from '@/utils/util'
import FormValidators from '@/utils/validate'
import Mitt from 'mitt'
export default function(newObj) {
  const { proxy } = getCurrentInstance() as any
  let { field, parentWidget, designState, subFormRowIndex, fieldModel, oldFieldValue, fileList, subFormRowId, rules } = reactive(newObj)
  const vueInstance = new Mitt()
  const getFormConfig: any = inject('getFormConfig')
  const globalModel: any = inject('globalModel')
  const refList: any = inject('refList')
  const getOptionData: any = inject('getOptionData')
  const formConfig = computed(() => {
    return getFormConfig()
  })
  const widgetSize = computed(() => {
    return field.options.size || 'default'
  })
  const subFormName: any = computed(() => {
    return parentWidget ? parentWidget.options.name : ''
  })
  const subFormItemFlag = computed(() => {
    return parentWidget ? parentWidget.type === 'sub-form' : false
  })
  const formModel = computed(() => {
    return globalModel.formModel
  })
  const getPropName = () => {
    if (subFormItemFlag && !designState) {
      return subFormName + '.' + subFormRowIndex + '.' + field.options.name + ''
    } else {
      return field.options.name
    }
  }
  const initFieldModel = () => {
    if (!field.formItemFlag) {
      return
    }

    if (!!subFormItemFlag && !designState) {
      // SubForm子表单组件需要特殊处理！！
      const subFormData = formModel[subFormName]
      if ((subFormData === undefined || subFormData[subFormRowIndex] === undefined || subFormData[subFormRowIndex][field.options.name] === undefined) && field.options.defaultValue !== undefined) {
        fieldModel = field.options.defaultValue
        subFormData[subFormRowIndex][field.options.name] = field.options.defaultValue
      } else if (subFormData[subFormRowIndex][field.options.name] === undefined) {
        fieldModel = null
        subFormData[subFormRowIndex][field.options.name] = null
      } else {
        fieldModel = subFormData[subFormRowIndex][field.options.name]
      }

      /* 主动触发子表单内field-widget的onChange事件！！ */
      setTimeout(() => {
        // 延时触发onChange事件, 便于更新计算字段！！
        handleOnChangeForSubForm(fieldModel, oldFieldValue, subFormData, subFormRowId)
      }, 800)
      oldFieldValue = deepClone(fieldModel)

      initFileList() // 处理图片上传、文件上传字段

      return
    }

    if (formModel[field.options.name] === undefined && field.options.defaultValue !== undefined) {
      fieldModel = field.options.defaultValue
    } else if (formModel[field.options.name] === undefined) {
      // 如果formModel为空对象，则初始化字段值为null!!
      formModel[field.options.name] = null
    } else {
      fieldModel = formModel[field.options.name]
    }
    oldFieldValue = deepClone(fieldModel)
    initFileList() // 处理图片上传、文件上传字段
  }
  const initFileList = () => {
    // 初始化上传组件的已上传文件列表
    if ((field.type !== 'picture-upload' && field.type !== 'file-upload') || designState === true) {
      return
    }

    if (fieldModel) {
      if (Array.isArray(fieldModel)) {
        fileList = deepClone(fieldModel)
      } else {
        fileList.splice(0, 0, deepClone(fieldModel))
      }
    }
  }
  const initEventHandler = () => {
    vueInstance.on('setFormData', (newFormData) => {
      console.log('formModel of globalModel----------', globalModel.formModel)
      if (!subFormItemFlag) {
        setValue(newFormData[field.options.name])
      }
    })

    vueInstance.on('field-value-changed', (values) => {
      if (subFormItemFlag) {
        const subFormData = formModel[subFormName]
        handleOnChangeForSubForm(values[0], values[1], subFormData, subFormRowId)
      } else {
        handleOnChange(values[0], values[1])
      }
    })

    vueInstance.on('reloadOptionItems', (widgetNames) => {
      if (widgetNames.length === 0 || widgetNames.indexOf(field.options.name) > -1) {
        initOptionItems(true)
      }
    })
  }
  const registerToRefList = (oldRefName?) => {
    if (refList !== null && !!field.options.name) {
      if (subFormItemFlag && !designState) {
        // 处理子表单元素（且非设计状态）
        if (oldRefName) {
          delete refList[oldRefName + '@row' + subFormRowId]
        }
        refList[field.options.name + '@row' + subFormRowId] = proxy
      } else {
        if (oldRefName) {
          delete refList[oldRefName]
        }
        refList[field.options.name] = proxy
        console.log(refList, 'refList', proxy)
      }
    }
  }
  const buildFieldRules = () => {
    if (!field.formItemFlag) {
      return
    }

    rules.splice(0, rules.length) // 清空已有
    if (field.options.required) {
      rules.push({
        required: true,
        // trigger: ['blur', 'change'],
        trigger: ['blur'], /* 去掉change事件触发校验，change事件触发时formModel数据尚未更新，导致radio/checkbox必填校验出错！！ */
        message: field.options.requiredHint || '字段不可为空',
      })
    }

    if (field.options.validation) {
      const vldName = field.options.validation
      if (FormValidators[vldName]) {
        rules.push({
          validator: FormValidators[vldName],
          trigger: ['blur', 'change'],
          label: field.options.label,
          errorMsg: field.options.validationHint,
        })
      } else {
        rules.push({
          validator: FormValidators['regExp'],
          trigger: ['blur', 'change'],
          regExp: vldName,
          label: field.options.label,
          errorMsg: field.options.validationHint,
        })
      }
    }

    if (field.options.onValidate) {
      const customFn = new Function('rule', 'value', 'callback', field.options.onValidate)
      rules.push({
        validator: customFn,
        trigger: ['blur', 'change'],
        label: field.options.label,
      })
    }
  }
  const handleOnCreated = () => {
    if (field.options.onCreated) {
      const customFunc = new Function(field.options.onCreated)
      customFunc.call(proxy)
    }
  }
  const unregisterFromRefList = () => {
    // 销毁组件时注销组件ref
    if (refList !== null && !!field.options.name) {
      const oldRefName = field.options.name
      if (subFormItemFlag && !designState) {
        // 处理子表单元素（且非设计状态）
        delete refList[oldRefName + '@row' + subFormRowId]
      } else {
        delete refList[oldRefName]
      }
    }
  }
  const handleOnMounted = () => {
    if (field.options.onMounted) {
      const mountFunc = new Function(field.options.onMounted)
      mountFunc.call(proxy)
    }
  }
  const handleChangeEvent = (value) => {
    syncUpdateFormModel(value)
    emitFieldDataChange(value, oldFieldValue)

    // number组件一般不会触发focus事件，故此处需要手工赋值oldFieldValue！！
    oldFieldValue = deepClone(value) /* oldFieldValue需要在initFieldModel()方法中赋初值!! */

    /* 主动触发表单的单个字段校验，用于清除字段可能存在的校验错误提示 */
    // dispatch('VFormRender', 'fieldValidation', [getPropName()])
  }
  const remoteQuery = (keyword) => {
    if (field.options.onRemoteQuery) {
      const remoteFn = new Function('keyword', field.options.onRemoteQuery)
      remoteFn.call(proxy, keyword)
    }
  }
  const handleFocusCustomEvent = (event) => {
    oldFieldValue = deepClone(fieldModel) // 保存修改change之前的值

    if (field.options.onFocus) {
      const customFn = new Function('event', field.options.onFocus)
      customFn.call(proxy, event)
    }
  }
  const handleBlurCustomEvent = (event) => {
    if (field.options.onBlur) {
      const customFn = new Function('event', field.options.onBlur)
      customFn.call(proxy, event)
    }
  }
  const handleButtonWidgetClick = () => {
    if (designState) { // 设计状态不触发点击事件
      return
    }

    if (field.options.onClick) {
      const changeFn = new Function(field.options.onClick)
      changeFn.call(proxy)
    } else {
      // this.dispatch('VFormRender', 'buttonClick', [this]);
    }
  }
  const setValue = (newValue) => {
    if (field.formItemFlag) {
      const oldValue = deepClone(fieldModel)
      fieldModel = newValue
      initFileList()

      syncUpdateFormModel(newValue)
      emitFieldDataChange(newValue, oldValue)
    }
  }
  const syncUpdateFormModel = (value) => {
    if (designState) {
      return
    }

    if (subFormItemFlag) {
      const subFormData = formModel[subFormName] || [{}]
      const subFormDataRow = subFormData[subFormRowIndex]
      subFormDataRow[field.options.name] = value
    } else {
      formModel[field.options.name] = value
    }
  }
  const emitFieldDataChange = (newValue, oldValue) => {
    vueInstance.emit('field-value-changed', [newValue, oldValue])
  }
  const handleOnChange = (val, oldVal) => {
    // 自定义onChange事件
    if (field.options.onChange) {
      const changeFn = new Function('value', 'oldValue', field.options.onChange)
      changeFn.call(proxy, val, oldVal)
    }
  }
  const handleOnChangeForSubForm = (val, oldVal, subFormData, rowId) => {
    // 子表单自定义onChange事件
    if (field.options.onChange) {
      const changeFn = new Function('value', 'oldValue', 'subFormData', 'rowId', field.options.onChange)
      changeFn.call(proxy, val, oldVal, subFormData, rowId)
    }
  }
  const initOptionItems = (keepSelected) => {
    if (designState) {
      return
    }

    if (field.type === 'radio' || field.type === 'checkbox' || field.type === 'select' || field.type === 'cascader') {
      /* 异步更新option-data之后globalOptionData不能获取到最新值，改用provide的getOptionData()方法 */
      const newOptionItems = getOptionData()
      if (!!newOptionItems && newOptionItems.hasOwnProperty(field.options.name)) {
        if (keepSelected) {
          reloadOptions(newOptionItems[field.options.name])
        } else {
          loadOptions(newOptionItems[field.options.name])
        }
      }
    }
  }
  /**
   * 重新加载选项，不清空字段值
   * @param options
   */
  const reloadOptions = (options) => {
    field.options.optionItems = deepClone(options)
  }
  /**
   * 加载选项，并清空字段值
   * @param options
   */
  const loadOptions = (options) => {
    field.options.optionItems = deepClone(options)
    // clearSelectedOptions()  //清空已选选项
  }
  return {
    widgetSize,
    formConfig,
    subFormName,
    subFormItemFlag,
    formModel,
    getPropName,
    initFieldModel,
    initEventHandler,
    registerToRefList,
    buildFieldRules,
    handleOnCreated,
    handleOnMounted,
    unregisterFromRefList,
    handleChangeEvent,
    remoteQuery,
    handleFocusCustomEvent,
    handleBlurCustomEvent,
    handleButtonWidgetClick,
  }
}
