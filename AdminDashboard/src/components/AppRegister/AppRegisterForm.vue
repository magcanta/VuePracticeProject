<template>
  <el-card :body-style="{ padding: '20px 20px 0px 20px' }">
    <div slot="header">
      <span> Register </span>
    </div>
    <el-form
      ref="registerForm"
      :rules="rules" 
      :model="credentials"
      @keyup.enter.native="register('registerForm')"
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
      <el-form-item label="Confirm Password" prop="password2">
        <el-input
          type="password"
          placeholder="Please enter password"
          v-model="credentials.password2"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="register('registerForm')"
          >REGISTER</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "app-register-form",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("Please input username"));
      } else {
        return callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("Please input password"));
      } else {
        return callback();
      }
    };

    var confirmPassword = (rule, value, callback) => {
      if (!value && !!this.credentials.password) {
        return callback(new Error("Please re enter password"));
      } else if (this.credentials.password !== value) {
        return callback(new Error("Password mismatch"));
      } else {
        return callback();
      }
    };
    return {
      credentials: {
        username: "",
        password: "",
        password2: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        password2: [{ validator: confirmPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate( (isValid) => {
        if (isValid) {
          this.$emit('user-register', this.credentials)
        } else {
          console.log("INVALID INPUT");
          return false;
        }
      });
    },
    
  },
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
