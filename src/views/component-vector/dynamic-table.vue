/**
* @Author: junlan.he
* @date: 2021/7/8
* @desc:
*/
<template>
  <el-drawer
      v-model="direction"
      title="配置表格"
      direction="ltr"
      size="50%"
    >
    <Vue3JsonEditor
      v-model='tableColumns'
      :expandedOnStart='true'
      @json-change='onJsonChange'/>
  </el-drawer>
  <el-button style="margin-bottom: 20px;" type="primary" @click="direction = true">配置表格</el-button>
  <DTable
    :tableColumns='tableColumns'
    :tableData='tableData'
    :pageConfig='pageConfig'
    :btnGroup="btnGroup"
    height='600'
    pagination
    size='small'
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

<script lang="ts">
export default { name: 'DynamicTable' }
</script>
<script setup lang="ts">
import { Vue3JsonEditor } from 'vue3-json-editor'
const router =useRouter()
const direction = ref(false)
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
  btnGroup: {
    label: '操作',
    fixed: 'right',
    type: 'operation',
    width: '300',
    minWidth: '300',
    align: 'center',
    group: [
      {
        size: 'small',
        name: '编辑',
        type: 'primary',
        icon: 'Edit',
        isShow: () => {
          return true
        },
        click: (row) => {
          console.log('row:', row)
          router.push('/table-details/1')
        },
      },
      {
        size: 'small',
        name: '禁用',
        type: 'primary',
        icon: 'Edit',
        isShow: () => {
          return true
        },
        click: (row) => {
          console.log(row)
        },
      },
      {
        size: 'small',
        name: '删除',
        type: 'danger',
        icon: 'Edit',
        isShow: () => {
          return true
        },
        click: (row) => {
          console.log(row)
        },
      },
    ],
  },
})
const { tableColumns, tableData, pageConfig, btnGroup } = toRefs(tableState)
const handleSizeChange = (val:any) => {
  console.log(`每页 ${val} 条`)
  tableState.pageConfig.pageSize = val
}
const handleCurrentChange = (val:any) => {
  console.log(`当前页: ${val}`)
  tableState.pageConfig.currentPage = val
}

const onJsonChange = (val) => {
  console.log('value:', val)
  tableColumns.value = val
}
</script>
