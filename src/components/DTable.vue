/**
* @Author: junlan.he
* @date: 2021/7/5
* @desc:
*/
<template>
  <el-table v-bind='$attrs' border stripe :data='tableData'>
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
        :width='item.width ? item.width : "120"'
        v-else-if='item.columsType === "slot"'
      >
        <template #default='{ row }'>
          <slot :name='item.slotName' :rowData='row'></slot>
        </template>
      </el-table-column>

      <!--   数据渲染     -->
      <el-table-column
        v-else
        :align='item.align'
        :fixed='item.fixed'
        :key='item.prop'
        :prop='item.prop'
        :label='item.label'
        :width='item.width'
      >
      </el-table-column>
    </template>
  </el-table>
  <el-pagination
    class='pagination'
    v-bind='$attrs'
    v-if='pagination'
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageConfig.currentPage"
    :page-sizes="pageConfig.pageSizes"
    :page-size="pageConfig.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageConfig.total"
    prev-text='上一页'
    next-text='下一页'
  >
  </el-pagination>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
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
      type: Array,
      default: () => [],
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
      default: () => {},
    },
  },
  setup(props, ctx) {
    console.log('ctx:', ctx)
    const pageState=reactive({
      pageConfig: props.pageConfig,
      handleSizeChange: (val) => {
        ctx.emit('handle-size-change', val)
      },
      handleCurrentChange: (val) => {
        ctx.emit('handle-current-change', val)
      },
    })
    return {
      ...pageState,
    }
  },
})
</script>

<style scoped lang='scss'>
  .table {
    .pagination {
      margin-top: 10px;
      text-align: right;
      padding-left: 20px;
    }
  }
  .pagination{
    display: flex;
    flex-direction: row-reverse;
    padding: 20px 0px;
  }
</style>
