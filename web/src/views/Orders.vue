<template>
  <div>
    <p v-if="!orders.length">There are no orders</p>
    <ul v-else>
      <li v-for="order in orders" :key="order.id">
        {{ order }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Orders',

  data () {
    return {
      orders: []
    }
  },

  async created () {
    const allOrders = await this.$db.orders.toArray();
    this.orders = allOrders
  }
}
</script>
