import { reactive } from 'vue'

const store = reactive({
  auth: {
    isLoggedIn: false,
    user: {
      username: null
    },
    hasLoggedIn(username) {
      this.isLoggedIn = true
      this.user.username = username
    },
    hasLoggedOut() {
      this.isLoggedIn = false
      this.user = {}
    }
  }
})

export const auth = store.auth