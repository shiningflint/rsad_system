<template>
  <div>
    <b-form-datepicker
      :value="dateValue"
      @input="onDateInput"
      :state="state"
    />
    <b-time
      :value="timeValue"
      :hour12="false"
      @input="onTimeInput"
    />
  </div>
</template>

<script>
import {
  parse,
  parseJSON,
  format,
  getYear,
  getMonth,
  getDayOfYear,
  getHours,
  getMinutes,
  setYear,
  setMonth,
  setDayOfYear,
  setHours,
  setMinutes,
} from 'date-fns'

export default {
  // value: String, JSON date and time string

  props: {
    value: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
    },
  },

  name: 'RDatetime',

  computed: {
    dateValue () {
      return this.value ? parseJSON(this.value) : this.value
    },
    timeValue () {
      if (this.value) {
        const dateObject = parseJSON(this.value)
        return format(dateObject, 'HH:mm:ss')
      } else {
        return this.value
      }
    },
  },

  methods: {
    onDateInput (value) {
      const dateObject = parse(value, 'yyyy-MM-d', new Date())

      if (this.value) {
        const valueDateObject = parseJSON(this.value)
        const year = getYear(dateObject)
        const month = getMonth(dateObject)
        const day = getDayOfYear(dateObject)

        const updateYear = setYear(valueDateObject, year)
        const updateMonth = setMonth(updateYear, month)
        const result = setDayOfYear(updateMonth, day)

        this.$emit('input', result.toJSON())
      } else {
        this.$emit('input', dateObject.toJSON())
      }
    },
    onTimeInput (value) {
      const dateObject = parse(value, 'HH:mm:ss', new Date())

      if (this.value) {
        const valueDateObject = parseJSON(this.value)
        const hours = getHours(dateObject)
        const minutes = getMinutes(dateObject)

        const updateHours = setHours(valueDateObject, hours)
        const result = setMinutes(updateHours, minutes)

        this.$emit('input', result.toJSON())
      } else {
        this.$emit('input', dateObject.toJSON())
      }
    },
  },
}
</script>
