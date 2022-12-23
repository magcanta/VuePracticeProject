<template>
    <el-header >
       <app-header-welcome> {{ user.username }} </app-header-welcome>
       <div>
        <el-button type="danger" size="small" @click="logout()">LOGOUT</el-button>
       </div>
    </el-header>
</template>

<script>
import AppHeaderWelcome from './AppHeaderWelcome.vue';
import { auth } from '@/store/store'

export default {
    name: "app-header",
    data() {
        return {
            user: auth.user,
            auth
        }
    },
    methods: {
        logout() {
            this.auth.hasLoggedOut()
            this.$router.replace('/login')
        }
    },
    components: {
        AppHeaderWelcome
    }
}
</script>

<style scoped>
    .el-header {
        line-height: 60px;
        background-color: #B3C0D1;
        color: #333;
        display: flex;
        justify-content: space-between;
    }

    nav a {
        padding: 8px;
    }

    nav a.router-link-exact-active {
        color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>