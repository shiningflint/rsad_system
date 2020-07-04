<template>
  <div>
    <p>This is the order detail page</p>
    <b-button type="button" @click="$router.go(-1)">
      Back
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'OrdersShow',

  props: {
    orderId: {
      type: String,
      required: true,
    },
  },

  methods: {
    getOrder () {
      console.log('getting order id', this.orderId)
    }
  },

  created () {
    this.getOrder()
  },
}
</script>
