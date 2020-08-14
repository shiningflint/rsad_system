<template>
  <button @click="onClick" class="back-button" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BackButton',

  methods: {
    onClick () { this.$router.go(-1) },
  },
}
</script>

<style lang="scss" scoped>
.back-button {
  font-size: 10px;
  border: none;
  background-color: white;

  &:active {
    background-color: #d7d7d7;
  }
}
</style>
