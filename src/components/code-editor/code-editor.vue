<template>
  <div class="ace-container">
    <!-- 官方文档中使用id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
    <div class="ace-editor" ref="aceRef"></div>
  </div>
</template>

<script setup lang="ts">
import ace from 'ace-builds'
import 'ace-builds/src-min-noconflict/theme-sqlserver' // 新设主题
import 'ace-builds/src-min-noconflict/mode-javascript' // 默认设置的语言模式
import 'ace-builds/src-min-noconflict/mode-json' //
import 'ace-builds/src-min-noconflict/mode-css' //
import 'ace-builds/src-min-noconflict/ext-language_tools'

const props = defineProps({
  modelValue: {
    type: String,
    // required: true
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'javascript',
  },
  userWorker: { // 是否开启语法检查，默认开启
    type: Boolean,
    default: true,
  },
})
const { modelValue, readonly, mode, userWorker } = props
const aceEditor:any = ref(null)
const { themePath, modePath, codeValue } = reactive({
  themePath: 'ace/theme/sqlserver', // 不导入 webpack-resolver，该模块路径会报错
  modePath: 'ace/mode/javascript', // 同上
  codeValue: modelValue,
})
const emits = defineEmits(['update:modelValue'])

const aceRef: any = ref()

onMounted(() => {
  console.log(aceRef, codeValue, ace)
  ace.config.set('basePath', 'https://ks3-cn-beijing.ksyun.com/vform2021/ace-mini')
  addAutoCompletion(ace) // 添加自定义代码提示！！
  aceEditor.value = ace.edit(aceRef.value, {
    maxLines: 20, // 最大行数，超过会自动出现滚动条
    minLines: 5, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
    fontSize: 12, // 编辑器内字体大小
    theme: themePath, // 默认设置的主题
    mode: modePath, // 默认设置的语言模式
    tabSize: 2, // 制表符设置为2个空格大小
    readOnly: readonly,
    highlightActiveLine: true,
    value: codeValue,
  })
  console.log(111)
  aceEditor.value.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true, // 设置代码片段提示
    enableLiveAutocompletion: true, // 设置自动提示
  })

  if (mode === 'json') {
    setJsonMode()
  } else if (mode === 'css') {
    setCssMode()
  }

  if (!userWorker) {
    aceEditor.value.getSession().setUseWorker(false)
  }

  // 编辑时同步数据
  aceEditor.value.getSession().on('change', () => {
    emits('update:modelValue', aceEditor.value.getValue())
  })
})

const addAutoCompletion = (ace) => {
  const acData = [
    { meta: 'VForm API', caption: 'getWidgetRef', value: 'getWidgetRef()', score: 1 },
    { meta: 'VForm API', caption: 'getFormRef', value: 'getFormRef()', score: 1 },
    // TODO: 待补充！！
  ]
  const langTools = ace.require('ace/ext/language_tools')
  langTools.addCompleter({
    getCompletions: function(editor, session, pos, prefix, callback) {
      if (prefix.length === 0) {
        return callback(null, [])
      } else {
        return callback(null, acData)
      }
    },
  })
}

const setJsonMode = () => {
  aceEditor.value.getSession().setMode('ace/mode/json')
}

const setCssMode = () => {
  aceEditor.value.getSession().setMode('ace/mode/css')
}

const getEditorAnnotations = () => {
  return aceEditor.value.getSession().getAnnotations()
}
defineExpose({ getEditorAnnotations })
</script>

<style lang="scss" scoped>
.ace-editor {
  min-height: 300px;
}
</style>
