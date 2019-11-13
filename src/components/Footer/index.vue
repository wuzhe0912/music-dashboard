<template lang="pug">
  footer cpyright {{ getCurrentYear }} by Pitt
</template>

<script>
export default {
  data () {
    return {
    }
  },

  computed: {
    getCurrentYear () {
      return new Date().getFullYear()
    }
  }
}
</script>