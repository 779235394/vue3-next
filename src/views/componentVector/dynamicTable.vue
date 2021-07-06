/**
* @Author: junlan.he
* @date: 2021/5/21
* @desc:
*/
<template>
  <DTable
    :tableColumns='tableColumns'
    :tableData='tableData'
    :pageConfig='pageConfig'
    height='600'
    pagination
    size='mini'
    @handle-size-change='handleSizeChange'
    @handle-current-change='handleCurrentChange'
  >
    <template #tag='{rowData}'>
      <el-tag type='success'>{{ rowData.tag }}</el-tag>
    </template>

    <template #ad='{rowData}'>
      <el-tag type='success'>{{ rowData.city }}</el-tag>
    </template>
  </DTable>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import DTable from 'components/DTable.vue'

export default defineComponent({
  components: { DTable },
  emits: ['handle-size-change', 'handle-current-change'],
  setup() {
    const tableState = reactive({
      tableColumns: [
        { type: 'selection', align: 'center', fixed: true },
        { prop: 'name', label: '姓名', align: 'center' },
        { prop: 'date', label: '日期', align: 'center' },
        { prop: 'province', label: '省市', align: 'center' },
        {
          prop: 'city',
          label: '地址',
          columsType: 'slot',
          slotName: 'ad',
          align: 'center',
        },
        { prop: 'address', label: '地址' },
        {
          prop: 'tag',
          label: '标签',
          columsType: 'slot',
          slotName: 'tag',
          align: 'center',
        },
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },

      ],
      pageConfig: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50, 100],
        pageSize: 10,
        total: 200,
      },
    })
    const tableMethods = reactive({
      handleSizeChange: (val) => {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange: (val) => {
        console.log(`当前页: ${val}`)
      },
    })

    return {
      ...toRefs(tableState),
      ...toRefs(tableMethods),
    }
  },
})
</script>

<style scoped>

</style>
