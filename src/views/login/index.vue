<template>
  <div class="login-container" :style="note">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">
      <h3 class="title">{{title}}</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span>仰天大笑出门去，我辈岂是蓬蒿人。</span>
      </div>


    </el-form>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined,
        note: {
          backgroundImage: "url(" + require("../../assets/login.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        },
        title: '蒂花之秀',
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$message.success('登录成功.');
              this.$router.push({name: 'home'})
            }).catch(err => {
              this.loading = false
              this.$message.error(err); //登录失败提示错误
            })
          } else {
            return false
          }
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;
  $black: #000;
  $text_color: #666;
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $text_color;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: rgba(0, 0, 0, 0);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $black: #000;
  $text_color: #666;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    .login-form {
      background: #ffffff;
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 180px auto;
    }
    .tips {
      font-size: 15px;
      color: $text_color;
      text-align: right;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $text_color;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      color: $black;
      margin: 0px auto 40px auto;
      text-align: center;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $text_color;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
