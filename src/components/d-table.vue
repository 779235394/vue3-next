/**
* @Author: junlan.he
* @date: 2021/7/5
* @desc:
*/
<template>
  <el-table v-bind='$attrs' border stripe :data='tableData' fit :header-cell-style="{background:'#f5f7fa'}">
    <template v-for='item in tableColumns'>
      <!--  表格多选框  -->
      <el-table-column
        v-if='item.type === "selection"'
        :key='item.selection'
        :align='item.align'
        type='selection'
        :fixed='item.fixed'
        :width='item.width ? item.width : "55"'>
      </el-table-column>

      <!--   列配置   -->
      <el-table-column
        :key='item.prop'
        :prop='item.prop'
        :label='item.label'
        :align='item.align'
        :fixed='item.fixed'
        show-overflow-tooltip
        :width='item.width ? item.width : "120"'
        v-else-if='item.columsType === "slot"'
      >
        <template #default="{ row }">
          <slot :name='item.slotName' :rowData='row'></slot>
        </template>
      </el-table-column>
      <!--   数据渲染     -->
      <el-table-column
        v-else
        show-overflow-tooltip
        :align='item.align'
        :fixed='item.fixed'
        :key='item.prop+"xr"'
        :prop='item.prop'
        :label='item.label'
        :width='item.width'
      >
      </el-table-column>
    </template>
    <!-- 操作栏   -->
    <el-table-column
      v-if="btnGroup && btnGroup.type==='operation'"
      :fixed='btnGroup.fixed'
      :label='btnGroup.label'
      :align='btnGroup.align'
      :width='btnGroup.width'
      :min-width='btnGroup.minWidth'
    >
      <template #default='{row}'>
        <div>
          <template v-for='(btn, i) in btnGroup.group'>
            <el-button
              :key='i'
              :type='btn.type'
              :size="btn.size ? btn.size:'small'"
              :icon='btn.icon'
              :disabled='isDisabledWidget(btn,row)'
              v-if='isShowWidget(btn,row)'
              @click.native='btn.click(row)'
            >{{ btn.name }}
            </el-button>
          </template>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class='pagination'
    v-bind='$attrs'
    v-if='pagination'
    @size-change='handleSizeChange'
    @current-change='handleCurrentChange'
    :current-page='pageConfig.currentPage'
    :page-sizes='pageConfig.pageSizes'
    :page-size='pageConfig.pageSize'
    layout='total, sizes, prev, pager, next, jumper'
    :total='pageConfig.total'
    prev-text='上一页'
    next-text='下一页'
  >
  </el-pagination>
</template>

<script setup lang='ts'>

const { tableData, tableColumns, btnGroup, pagination, pageConfig } = defineProps( {
  /**
       * @param tableData 数据源
       * */
  tableData: {
    type: Array,
    default: () => [],
  },
  /**
       * @param tableColumns 列配置
       */
  tableColumns: {
    type: Array as () => Array<any>,
    default: () => [],
  },
  /**
       * @param btnGroup 按钮组
       * */
  btnGroup: {
    default: function() {
      return {}
    },
    type: Object,
  },
  /**
       * @param pagination 是否分页
       */
  pagination: {
    type: Boolean,
    default: () => true,
  },
  /**
       * @param pageConfig 分页配置
       */
  pageConfig: {
    type: Object,
    default: () => {
    },
  },
})
const emits = defineEmits(['handle-size-change', 'handle-current-change'])
const handleSizeChange = (val) => {
  emits('handle-size-change', val)
}
const handleCurrentChange = (val) => {
  emits('handle-current-change', val)
}
// 按钮显示隐藏
const isShowWidget = (btn, row) => {
  if (!btn.isShow) return true
  if (typeof btn.isShow === 'function') {
    return btn.isShow.call(btn.isShow, row)
  }
}
// 按钮只读
const isDisabledWidget = (btn, row) => {
  if (!btn.disabled) return false
  if (typeof btn.disabled === 'function') {
    return btn.disabled.call(btn.disabled, row)
  }
}
</script>

<style scoped lang='scss'>
  .table {
    .pagination {
      margin-top: 10px;
      text-align: right;
      padding-left: 20px;
    }
  }

  .pagination {
    padding: 20px 0px;
    text-align: end;
  }
</style>
