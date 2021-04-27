/**
* @Author: junlan.he
* @date: 2021/4/27
* @desc:
*/
<template>
  <Particles id='tsparticles' :options='ParticlesOptions' class='particles' />
  <div class='login-container'>
    <el-form :model='ruleFormModel' label-width='left' status-icon ref='ruleForm' class='login-form'>
      <div class='title-container'>
        <h3 class='title'>Login Form</h3>
      </div>
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
      <el-button type='primary' style='width:100%;margin-bottom:30px;' @click='onsubmit'>Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ruleForm, ParticlesOptions } from './login'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',

  setup: () => {
    const router = useRouter()
    const onsubmit = () => {
      if (ruleForm.account === 'admin' && ruleForm.password === '123456') {
        console.log(router)
        router.push({ path: 'dashboard' })
      }
    }
    return {
      ruleFormModel: ruleForm,
      ParticlesOptions,
      onsubmit,
    }
  },
})
</script>

<style lang='scss' scoped>
  @import "./login.scss";
</style>
