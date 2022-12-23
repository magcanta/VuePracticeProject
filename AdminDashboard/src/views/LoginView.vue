<template>
    <el-container>
        <div>
            <login-form-component></login-form-component>
        </div>
    </el-container>
</template>

<script>
import LoginFormComponent from '@/components/LoginFormComponent.vue';
export default {
    name: "app-login",
    components: {
        LoginFormComponent
    }
}
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