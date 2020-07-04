<template>
  <div>
    <p v-if="!orders.length">There are no orders</p>
    <!-- TODO: extract this UL into it's own component -->
    <ul class="orders" v-else>
      <li
        v-for="order in orders"
        :key="order.id"
        @click="onOrderListClick(order.id)"
      >
        <span>Order no. {{ order.id }}</span>
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

  methods: {
    onOrderListClick (orderId) {
      this.$router.push({ name: 'OrdersShow', params: { orderId: orderId.toString() }})
    }
  },

  async created () {
    const allOrders = await this.$db.orders.toArray();
    this.orders = allOrders
  }
}
</script>

<style lang="scss" scoped>
.orders {
  list-style: none;
  text-align: left;
  padding: 0 16px;
  margin: 0;

  > li {
    cursor: pointer;
    padding: 8px;
    border-bottom: 1px solid white;

    &:last-child {
      border-bottom: none;
    }
    &:active {
      background-color: white;
      color: black;
    }
  }
}
</style>
