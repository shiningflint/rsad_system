<template>
  <div>
    This is the Home page
    <p>
      <router-link to="/package">Paket</router-link>
    </p>
    <p>
      <router-link to="/non_package">Non paket</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
