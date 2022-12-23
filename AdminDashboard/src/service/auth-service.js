class Auth {
  constructor(user) {
    this.user = user;
    this.usersURL = "http://localhost:3000/users"
  }

  async checkUser() {
    try {
        const queryURL = `${this.usersURL}?username=${this.user.username}`
        const response = await fetch(queryURL)
        const data = await response.json()
        return data[0]
    } catch (error) {
        throw error
    }
  }

  async addUser() {
    try {
        const user = {
            "username": this.user.username,
            "password": this.user.password
        }
        const response = await fetch(this.usersURL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })

        return response.ok ? true : false
    } catch (error) {
        throw error
    }
  }

  async authenticateUser(user) {
    return this.user.password === user.password
  }

  checkPassword(password) {
    return this.user.password === password
  }
}

export const AuthService = Auth