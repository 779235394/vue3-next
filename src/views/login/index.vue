/**
* @Author: junlan.he
* @date: 2021/4/25
* @desc:
*/
<template>
  <Particles id='tsparticles' :options='ParticlesOptions' class='particles' />
  <div class='form-box'>
    <el-form :model='ruleFormModel' status-icon ref='ruleForm' class='demo-ruleForm'>
      <el-form-item label='账号' prop='pass'>
        <el-input type='text' v-model='ruleFormModel.account' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item label='密码' prop='pass'>
        <el-input type='password' v-model='ruleFormModel.password' autocomplete='off'></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { ParticlesOptions, ruleForm } from './index'

export default defineComponent({
  name: 'Index',

  setup: () => {
    onMounted(() => {
      console.log('222')
    })

    return {
      ParticlesOptions,
      ruleFormModel: ruleForm,
    }
  },
})
</script>

<style lang='scss' scoped>
  @import "./index.scss";

</style>
