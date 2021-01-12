<template>
  <header class="header">
    <div class="content">
      <div class="left-panel">
        <back-button class="item">Kembali</back-button>
        <img
          src="../assets/info.svg"
          class="item info"
          @click="onInfoClick"
        />
      </div>
      <img src="../assets/logo_kristalian.svg" class="logo" />
    </div>
  </header>
</template>

<script>
import BackButton from './BackButton'
export default {
  name: 'AppHeader',

  components: {
    BackButton
  },

  methods: {
    onInfoClick () {
      this.$router.push({ name: this.$path.Info })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../design/colors';

/* Acts as spacer */
.header {
  padding-top: 56px;
}

.content {
  background-color: $header-bg-color;
  border-bottom: 1px solid #1b220c;
  position: fixed;
  top: 0;
  left: 0;
  padding: 4px 0;
  width: 100%;
  z-index: 1;
}

.left-panel {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);

  > .item {
    margin-right: 16px;
  }
}

.info {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.logo {
  width: auto;
  height: 32px;
}
</style>
