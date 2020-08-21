<template>
  <header class="header">
    <div class="content">
      <back-button class="header-back-button">Kembali</back-button>
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
  }
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

.header-back-button {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
}

.logo {
  width: auto;
  height: 32px;
}
</style>
