<template>
  <div>
    <div class="p-3">
      <img src="@/assets/logo_kristalian.svg" />
    </div>
    <p>
      <router-link to="/orders">Orders</router-link>
    </p>

    <b-container>
      <b-row>
        <b-col class="d-flex justify-content-center">
          <router-link to="/package" class="box-decoration" style="width: 120px; height: 120px;">
            Paket
          </router-link>
        </b-col>
        <b-col class="d-flex justify-content-center">
          <router-link :to="{ name: $path.nonPackage.form.packageItems }" class="box-decoration" style="width: 120px; height: 120px;">
            Non paket
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
