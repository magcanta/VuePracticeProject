<template>
	<el-container>
		<div>
			<app-register-form v-on:user-register="register"></app-register-form>
		</div>
	</el-container>
</template>

<script>
import AppRegisterForm from "@/components/AppRegister/AppRegisterForm.vue";
import { AuthService } from "@/service/auth-service";
import { errors } from "@/define/errors.js";
export default {
	name: "app-register",
	data() {
		return {
			authService: AuthService,
		};
	},
	methods: {
		async register(newUser) {
			try {
				const result = await this.authService.registerUser(newUser);

				console.log(typeof result);

				if (typeof result === "number") {
					switch (result) {
						case errors.USER_EXIST.code:
							this.alertUserExist();
							break;
						default:
							console.error("Something went wrong!");
							this.alertRegistrationFailed();
							break;
					}
				} else {
					this.alertRegistrationSuccess();
				}
			} catch (error) {
				console.log(error);
			}
		},
		alertRegistrationSuccess() {
			this.$alert(
				"You are now registered. Click 'OK' to go to the login page.",
				"Success!",
				{
					confirmButtonText: "OK",
					callback: (action) => {
						this.$router.replace("/login");
					},
				}
			);
		},
		alertRegistrationFailed() {
			this.$alert("Registration failed.", "Error!", {
				confirmButtonText: "OK",
				callback: (action) => {
					return;
				},
			});
		},
		alertUserExist() {
			this.$alert("User already exist.", "Error!", {
				type: "error",
				confirmButtonText: "OK",
				callback: (action) => {
					return;
				},
			});
		},
	},
	components: {
		AppRegisterForm,
	},
};
</script>

<style>
.el-container {
	height: 100%;
}

div {
	margin: 0 auto;
	align-self: center;
}
</style>
