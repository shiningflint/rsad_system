<template>
  <div>
    <p>Done! Thanks!</p>
    <router-link :to="{ name: $path.home }">Back to home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NonPackageDone',
}
</script>
