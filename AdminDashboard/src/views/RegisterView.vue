<template>
    <el-container>
        <div>
            <app-register-form></app-register-form>
        </div>
    </el-container>
</template>

<script>
import AppRegisterForm from '@/components/AppRegister/AppRegisterForm.vue'
export default {
    name: 'app-register', 
    components: {
        AppRegisterForm
    }
}
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