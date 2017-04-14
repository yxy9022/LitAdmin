<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.useranme" disabled></el-input>
        </el-form-item>
        <el-form-item prop="name" label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import {reqSaveUserProfile} from '../../api/api';
  import {bus} from '../../bus.js'

  export default {
    data() {
      return {
        form: {
          useranme: '',
          name: '',
          email: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入昵称', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        },
      }
    },
    methods: {
      onSubmit() {
        var that = this;
        this.$refs.form.validate((valid) => {
          if (valid) {
            var args = {name: this.form.name, email: this.form.email};
            reqSaveUserProfile(args).then(function (data) {
              let {msg, code, user} = data;
              if (code !== 200) {
                that.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('access-user', JSON.stringify(user));
                bus.$emit('setUserName', user.name);
                that.$message({
                  message: "修改成功！",
                  type: 'success',
                  duration: 2000 //默认3s太长
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted() {
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.form.useranme = user.username;
        this.form.name = user.name || '';
        this.form.email = user.email || '';
      }
    }
  }
</script>
