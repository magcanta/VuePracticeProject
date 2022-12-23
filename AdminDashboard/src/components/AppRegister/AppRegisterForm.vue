<template>
  <el-card :body-style="{ padding: '20px 20px 0px 20px' }">
    <div slot="header">
      <span> Register </span>
    </div>
    <el-form
      ref="registerForm"
      :rules="rules" 
      :model="registerForm"
      @keyup.enter.native="register('registerForm')"
    >
      <el-form-item label="Username" prop="username">
        <el-input
          type="text"
          placeholder="Please enter username"
          v-model="registerForm.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          placeholder="Please enter password"
          v-model="registerForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="password2">
        <el-input
          type="password"
          placeholder="Please enter password"
          v-model="registerForm.password2"
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
import accounts from "@/assets/user-accounts.json";
import { AuthService } from "@/service/auth-service.js";
import { auth } from "@/store/store";
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
      if (!value && !!this.registerForm.password) {
        return callback(new Error("Please re enter password"));
      } else if (this.registerForm.password !== value) {
        return callback(new Error("Password mismatch"));
      } else {
        return callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        password2: "",
      },
      users: accounts.users,
      auth,
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        password2: [{ validator: confirmPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(async (isValid) => {
        if (isValid) {
          const newUser = this.registerForm;
          const authService = new AuthService(newUser);
          try {
            const user = await authService.checkUser(
              "http://localhost:3000/users"
            );
            if (user) {
              console.log("USER ALREADY EXIST");
              this.alertUserExist()
              return false;
            }
            const result = await authService.addUser(
              "http://localhost:3000/users"
            );
            if (result) {
              console.log("REGISTERED");
              this.alertRegistrationSuccess()
              return true;
            } else {
              console.log("REGISTRATION FAILED");
              return false;
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("INVALID INPUT");
          return false;
        }
      });
    },
    alertRegistrationSuccess() {
      this.$alert("You are now registered. Click 'OK' to go to the login page.", "Success!", {
        confirmButtonText: "OK",
        callback: (action) => {
          this.$router.replace('/login')
        },
      });
    },
    alertRegistrationFailed() {
      this.$alert("Registration failed.", "Error!", {
        confirmButtonText: "OK",
        callback: (action) => {
          return
        }
      })
    },
    alertUserExist() {
      this.$alert("User already exist.", "Error!", {
        type: "error",
        confirmButtonText: "OK",
        callback: (action) => {
          return
        }
      })
    }
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
