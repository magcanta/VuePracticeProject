<template>
  <el-container>
    <div>
      <login-form-component v-on:user-login="login"></login-form-component>
    </div>
  </el-container>
</template>

<script>
import LoginFormComponent from "@/components/LoginFormComponent.vue";
import { AuthService } from "@/service/auth-service";

export default {
  name: "app-login",
  data() {
    return {
      authService: AuthService,
    };
  },
  methods: {
    async login(credentials) {
        console.log("login")
      try {
        const user = await this.authService.userLogin(credentials);
        switch (typeof user) {
          case "undefined":
            // user not found
            this.alertUserNotFound();
            break;
          case "boolean":
            if (!user) {
              this.alertInvalidCredentials();
            }
            break;
          case "object":
            if (user === null) {
              this.alertUserNotFound();
              return;
            }
            this.authService.authState.hasLoggedIn(user.username);
            this.$router.replace("/");
            break;
        }
      } catch (error) {
        console.log(error);
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
    alertUserNotFound() {
      this.$alert("The specified user does not exist", "Error!", {
        confirmButtonText: "OK",
        type: "error",
        callback: (action) => {
          return
        }
      })
    },
  },
  components: {
    LoginFormComponent,
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}

div {
  margin: 0 auto;
  align-self: center;
}
</style>
