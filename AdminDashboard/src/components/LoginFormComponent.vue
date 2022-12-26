<template>
  <el-card :body-style="{ padding: '20px 20px 0px 20px' }">
    <div slot="header">
      <span> Login </span>
    </div>
    <el-form
      ref="loginForm"
      :rules="rules"
      :model="credentials"
      @keyup.enter.native="login('loginForm')"
    >
      <el-form-item label="Username" prop="username">
        <el-input
          type="text"
          placeholder="Please enter username"
          v-model="credentials.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          placeholder="Please enter password"
          v-model="credentials.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="login('loginForm')">LOGIN</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "login-form-component",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("Please input username"));
      }
      return callback()
    };

    var validatePassword = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("Please input password"));
      }
      return callback()
    };
    return {
      credentials: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate( (valid) => {
        if(!valid) {
          console.error("INVALID FORM")
          return false
        } else {
          this.$emit('user-login', this.credentials)
        }
      })
    }
  }
};
</script>

<style scoped>
.el-card {
  width: 300px;
  color: black;
}

div span {
  font-size: 35px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
