<template>
  <el-card :body-style="{ padding: '20px 20px 0px 20px' }">
    <div slot="header">
      <span> Login </span>
    </div>
    <el-form
      ref="form"
      :rules="rules"
      :model="account"
      @keyup.enter.native="login"
    >
      <el-form-item label="Username" prop="username">
        <el-input
          type="text"
          placeholder="Please enter username"
          v-model="account.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          placeholder="Please enter password"
          v-model="account.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="login">LOGIN</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import accounts from "@/assets/user-accounts.json";
import { auth } from "@/store/store";
import { AuthService } from "../service/auth-service";
export default {
  name: "login-form-component",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("Please input username"));
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("Please input password"));
      }
    };
    return {
      account: {
        username: "",
        password: "",
      },
      users: accounts.users,
      auth,
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    async login() {
      const authService = new AuthService(this.account)
      try {
        const user = await authService.checkUser()
        
        if(!user) {
          // user not found
          this.aletUserNotFound()
        } else {
          const isAuthorized = await authService.authenticateUser(user)
          if(!isAuthorized) {
            // invalid credentials
            this.alertInvalidCredentials()
          } else {
            // login
            this.auth.hasLoggedIn(user.username)
            this.$router.replace('/')
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    alertInvalidCredentials() {
      this.$alert("Invalid credentials!", "Error!", {
        confirmButtonText: "OK",
        type: "error",
        callback: (action) => {
          return
        }
      })
    },
    aletUserNotFound() {
      this.$alert("The specified user does not exist", "Error!", {
        confirmButtonText: "OK",
        type: "error",
        callback: (action) => {
          return
        }
      })
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
