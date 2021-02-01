<template>
  <div v-bind="$props" class="dropdown">
    <b-form-select v-model="year" :options="yearOptions" @change="localDataToDateString" />
    <b-form-select v-model="month" :options="monthOptions" @change="localDataToDateString"/>
    <b-form-select v-model="day" :options="dayOptions" @change="localDataToDateString"/>
  </div>
</template>

<script>
import { ClockWizard } from '@/lib/ClockWizard'

export default {
  name: 'DropdownDatepicker',

  props: {
    value: { default: '', },
    yearStart: {
      type: Number,
      default: null,
    },
    yearEnd: {
      type: Number,
      default: null,
    },
  },

  data () {
    return {
      year: null,
      month: null,
      day: null,
      yearOptions: null,
      monthOptions: null,
      dayOptions: null,
      defaultYearStart: this.yearStart || this.generateDefaultYearStart(),
      defaultYearEnd: this.yearEnd || this.generateDefaultYearEnd(),
    }
  },

  watch: {
    value (newValue) {
      this.dateStringToLocalData(newValue)
    },
  },
  methods: {
    initValue () {
      if (!this.value) return

      this.dateStringToLocalData(this.value)
    },
    generateDefaultYearStart () {
      const clockWizard = new ClockWizard()
      return clockWizard.thisYear() - 10
    },
    generateDefaultYearEnd () {
      const clockWizard = new ClockWizard()
      return clockWizard.thisYear() + 10
    },
    generateYearOptions () {
      const years = (() => {
        const result = []

        for (let i = this.defaultYearStart; i <= this.defaultYearEnd; i++) {
          result.push(i)
        }
        result.push("placeholder")

        return result
      })()

      const result = years.reverse().map(year => {
        if (year === 'placeholder') return { text: 'Tahun', value: null }
        return { text: year, value: year}
      })

      return result
    },
    generateMonthOptions () {
      const result = [
        { value: null, text: "Bulan" },
        { value: "01", text: "Januari" },
        { value: "02", text: "Februari" },
        { value: "03", text: "Maret" },
        { value: "04", text: "April" },
        { value: "05", text: "Mei" },
        { value: "06", text: "Juni" },
        { value: "07", text: "Juli" },
        { value: "08", text: "Agustus" },
        { value: "09", text: "September" },
        { value: "10", text: "Oktober" },
        { value: "11", text: "November" },
        { value: "12", text: "Desember" },
      ]

      return result
    },
    generateDayOptions () {
      const days = ["placeholder", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
      const result = days.map(day => {
        if (day === 'placeholder') return { text: 'Tanggal', value: null }
        return { text: day, value: day }
      })

      return result
    },
    localDataToDateString () {
      if ( !this.year || !this.month || !this.day) {
        this.$emit('input', '')
        return
      }

      const dateString = `${this.year}-${this.month}-${this.day}`
      const clockWizard = new ClockWizard()
      const dateStringIsValid = clockWizard.isValidDateString(dateString)

      if (dateStringIsValid) {
        this.$emit('input', dateString)
        return true
      } else {
        this.$emit('input', '')
        return false
      }
    },
    dateStringToLocalData (dateString) {
      const clockWizard = new ClockWizard()
      const dateStringIsValid = clockWizard.isValidDateString(dateString)

      if (!dateStringIsValid) return

      const dateValues = dateString.split('-')

      this.year = dateValues[0]
      this.month = dateValues[1]
      this.day = dateValues[2]

      return true
    },
  },

  created () {
    this.yearOptions = this.generateYearOptions()
    this.monthOptions = this.generateMonthOptions()
    this.dayOptions = this.generateDayOptions()

    this.initValue()
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  display: flex;
  justify-content: space-between;

  > .custom-select {
    width: 30%;
  }
}
</style>
