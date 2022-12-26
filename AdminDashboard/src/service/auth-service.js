import { auth } from "@/store/store.js";
import { errors } from "@/define/errors.js";
class Auth {
	constructor() {
		this.authState = auth;
		this.usersURL = "http://localhost:3000/users";
	}

	/**
	 * @returns { Promise<object | undefined> }
	 * @throws { error }
	 */
	async checkUser(credentials) {
		try {
			const queryURL = `${this.usersURL}?username=${credentials.username}`;
			const response = await fetch(queryURL);
			const data = await response.json();
			return data[0];
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @param { object } credentials user credentials
	 * @returns { Promise<boolean | number> } success | error code
	 */
	async registerUser(credentials) {
		try {
			const user = await this.checkUser(credentials);
			console.log(user);
			if (!!user) {
				// user exists
				console.error("Exist");
				return errors.USER_EXIST.code;
			}
			const result = this.addUser(credentials);
			return result ? result : errors.UNKNOWN.code;
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @returns { Promise<object | undefined | boolean>}
	 */
	async userLogin(credentials) {
		try {
			const user = await this.checkUser(credentials);
			if (!!user) {
				const isAuthorized = this.checkPassword(
					user.password,
					credentials.password
				);
				return isAuthorized ? user : isAuthorized;
			}
			return user;
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @param { string } password1 first password
	 * @param { string } password2 second password
	 * @returns { boolean } if passwords are equal or not
	 */
	checkPassword(password1, password2) {
		return password1 === password2;
	}
}

export const AuthService = new Auth();
