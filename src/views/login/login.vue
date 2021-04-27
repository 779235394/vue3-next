/**
* @Author: junlan.he
* @date: 2021/4/27
* @desc:
*/
<template>
  <Particles id='tsparticles' :options='ParticlesOptions' class='particles' />
  <div class='form-box'>
    <el-form :model='ruleFormModel' label-width='auto' status-icon ref='ruleForm' class='demo-ruleForm'>
      <el-form-item label='账号' prop='pass'>
        <el-input type='text' prefix-icon='el-icon-user' v-model='ruleFormModel.account' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item label='密码' prop='pass'>
        <el-input
          type='password'
          prefix-icon='el-icon-lock'
          v-model='ruleFormModel.password'
          autocomplete='off'></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ruleForm, ParticlesOptions } from './login'

export default defineComponent({
  name: 'Login',

  setup: () => {
    return {
      ruleFormModel: ruleForm,
      ParticlesOptions,
    }
  },
})
</script>

<style lang='scss' scoped>
  @import "./login.scss";
</style>
