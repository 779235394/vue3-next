<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-02-25 18:12:37
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-04-13 10:40:02
-->
<template>
    <el-scrollbar class="side-scroll-bar">
      <div class="panel-container">
        <el-collapse v-model="activeNames" class="widget-collapse">
          <el-collapse-item name="2" :title="designerText.basicFieldTitle">
              <draggable
                tag="ul"
                v-model="newBasicFields"
                :group="{name: 'dragGroup', pull: 'clone', put: false}"
                :move="checkFieldMove"
                :clone="handleFieldWidgetClone"
                ghost-class="ghost"
                :sort="false"
                item-key="type">
                  <template #item="{ element,index }"  >
                    <li
                      :key="index"
                      class="field-widget-item"
                      :title="element.displayName"
                      @dblclick="addFieldByDbClick(element)">
                        <!-- <span>{{element.icon}}</span> -->
                         <svg-icon :icon-class="element.icon" />
                        <span>{{element.displayName}}</span>
                    </li>
                  </template>
              </draggable>
            </el-collapse-item>
        </el-collapse>
      </div>
    </el-scrollbar>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import { basicFields } from './widgets-config'
import { designerText } from '../designer-text'
onMounted(() => {
  loadWidgets()
})
const activeNames = ref(['2'])
const fieldList = ref([])
provide('serverFieldList', fieldList)
const newBasicFields:any = ref([...basicFields])
const { designer } = defineProps({
  designer: { type: Object, default: () => {} },
})
const checkFieldMove = (evt) => {
  return designer.checkFieldMove(evt)
}
const handleFieldWidgetClone = (origin) => {
  return designer.copyNewFieldWidget(origin)
}
const addFieldByDbClick = (widget) => {
  designer.addFieldByDbClick(widget)
}
// const isBanned = (wName)=> {
//   return getBannedWidgets().indexOf(wName) > -1
// }
const loadWidgets = () => {
  newBasicFields.value = basicFields.map((fld:any) => {
    return {
      ...fld,
      displayName: designerText.widgetLabel[fld.type],
    }
  })
}
</script>
<style lang="scss" scoped>
.side-scroll-bar {
    :deep(.el-scrollbar__wrap) {
      overflow-x: hidden;
    }
    .widget-collapse {
      border-top-width: 0;

      :deep(.el-collapse-item__header) {
        margin-left: 8px;
        font-style: italic;
        font-weight: bold;
      }

      :deep(.el-collapse-item__content) {
        padding-bottom: 6px;

        ul {
          padding-left: 5px;  /* 重置IE11默认样式 */
          margin: 0;  /* 重置IE11默认样式 */
          margin-block-start: 0;
          margin-block-end: 0.25em;
          padding-inline-start: 5px;
          padding-top: 10px;

          &:after {
            content: "";
            display: block;
            clear: both;
          }

          .container-widget-item, .field-widget-item {
            display: inline-block;
            height: 28px;
            line-height: 28px;
            width: 115px;
            float: left;
            margin: 4px 10px 8px 0;
            cursor: move;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            background: #f1f2f3;
            border-radius: 14px;
            transition: all 0.5s;
          }

          .container-widget-item:hover, .field-widget-item:hover {
            // background: #EBEEF5;
            // outline: 1px solid #409EFF;
            transform: scale(1.1);
          }

          .drag-handler {
            position: absolute;
            top: 0;
            left: 160px;
            background-color: #dddddd;
            border-radius: 5px;
            padding-right: 5px;
            font-size: 11px;
            color: #666666;
          }
        }
      }
    }
  }

</style>
