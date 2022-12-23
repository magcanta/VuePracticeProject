<template>
  <h2>
    Hello <span><slot></slot></span>
  </h2>
</template>

<script>
export default {
  name: "app-header-welcome",
};
</script>

<style scoped>
span {
  color: red;
}
</style>
