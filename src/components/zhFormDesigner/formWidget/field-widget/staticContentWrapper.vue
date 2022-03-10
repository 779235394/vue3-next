<template>
  <div class="field-wrapper" :class="{ 'design-time-bottom-margin': !!designer }">
    <div
      class="static-content-item"
      v-show="!field.options.hidden || (designState === true)"
      :class="[selected ? 'selected' : '', customClass]"
      @click.stop="selectField(field)"
    >
      <slot></slot>
    </div>

    <template v-if="!!designer">
      <div class="field-action" v-if="designer.selectedId === field.id">
        <el-icon
          class="el-icon-back"
          :title="designerText.hint.selectParentWidget"
          @click.stop="selectParentWidget()"
        >
            <back/>
        </el-icon>
        <el-icon
          class="el-icon-top"
          v-if="!!parentList && (parentList.length > 1)"
          :title="designerText.hint.moveUpWidget"
          @click.stop="moveUpWidget()"
        >
            <top/>
        </el-icon>
        <el-icon
          class="el-icon-bottom"
          v-if="!!parentList && (parentList.length > 1)"
          :title="designerText.hint.moveDownWidget"
          @click.stop="moveDownWidget()"
        >
            <bottom/>
        </el-icon>
        <el-icon class="el-icon-delete" :title="designerText.hint.remove" @click.stop="removeFieldWidget"><delete/></el-icon>
      </div>

      <div class="drag-handler background-opacity" v-if="designer.selectedId === field.id">
        <el-icon>
          <rank :title="designerText.hint.dragHandler"></rank>
        </el-icon>
        <i>{{ designerText.widgetLabel[field.type] }}</i>
        <i v-if="field.options.hidden === true" class="iconfont icon-hide"></i>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  designerText: {
    type: Object,
    default: () => {
      return {}
    },
  },
  field: {
    default: () => {
      return {}
    },
    type: Object,
  },
  parentWidget: {
    type: Object,
  },
  parentList: {
    type: Array,
  },
  indexOfParentList: {
    type: Number,
    default: null,
  },
  designer: {
    type: Object,
    default: function() {
      return {}
    },
  },
  designState: {
    type: Boolean,
    default: false,
  },
  subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
    type: Number,
    default: -1,
  },
  subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
    type: Number,
    default: -1,
  },
  subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
    type: String,
    default: '',
  },
  rules: { /* 子表单组件行Id，唯一id且不可变 */
    type: Array as () => Array<any>,
    default: () => [],
  },
})
const { field, parentWidget, parentList, designer, designState } = props
const { indexOfParentList } = toRefs(props)
const selected = computed(() => {
  return !!designer && field.id === designer.selectedId
})
const customClass = computed(() => {
  return field.options.customClass ? field.options.customClass.join(' ') : ''
})
const selectField = (field) => {
  if (designer) {
    designer.setSelected(field)
    designer.emitEvent('field-selected', parentWidget) // 发送选中组件的父组件对象
  }
}

const selectParentWidget = () => {
  if (parentWidget) {
    designer.setSelected(parentWidget)
  } else {
    designer.clearSelected()
  }
}

const moveUpWidget = () => {
  designer.moveUpWidget(parentList, indexOfParentList.value)
  designer.emitHistoryChange()
}

const moveDownWidget = () => {
  designer.moveDownWidget(parentList, indexOfParentList.value)
  designer.emitHistoryChange()
}

const removeFieldWidget = async () => {
  if (parentList) {
    let nextSelected: any = null
    if (parentList.length === 1) {
      if (parentWidget) {
        nextSelected = parentWidget
      }
    } else if (parentList.length === (1 + indexOfParentList.value)) {
      nextSelected = parentList[indexOfParentList.value - 1]
    } else {
      nextSelected = parentList[indexOfParentList.value + 1]
    }
    await nextTick()
    parentList.splice(indexOfParentList.value, 1)
    // if (!!nextSelected) {
    designer.setSelected(nextSelected)
    // }

    designer.emitHistoryChange()
  }
}
</script>

<style lang="scss" scoped>
.background-opacity {
  background: rgba(64, 158, 255, 0.6);
}
.design-time-bottom-margin {
  margin-bottom: 5px;
}

.field-wrapper {
  position: relative;

  .field-action {
    position: absolute;
    //bottom: -24px;
    bottom: 0;
    right: -2px;
    height: 22px;
    line-height: 22px;
    background: $--color-primary;
    z-index: 9;

    i {
      font-size: 14px;
      color: #fff;
      margin: 0 5px;
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .drag-handler {
    position: absolute;
    top: 0;
    //bottom: -22px;  /* 拖拽手柄位于组件下方，有时无法正常拖动，原因未明？？ */
    left: -1px;
    height: 20px;
    line-height: 20px;
    //background: $--color-primary;
    z-index: 9;

    i {
      font-size: 12px;
      font-style: normal;
      color: #fff;
      margin: 4px;
      cursor: move;
      vertical-align: middle;
    }

    &:hover {
      //opacity: 1;
      background: $--color-primary;
    }
  }
}

.field-action,
.drag-handler {
  :deep(.svg-icon) {
    margin-left: 0.1em;
    margin-right: 0.1em;
  }
}

.static-content-item {
  min-height: 20px;
  display: flex; /* 垂直居中 */
  align-items: center; /* 垂直居中 */
  box-sizing: content-box;
  :deep(.el-divider--horizontal) {
    margin: 0;
  }
}

.el-form-item.selected,
.static-content-item.selected {
  outline: 2px solid $--color-primary;
}
</style>
