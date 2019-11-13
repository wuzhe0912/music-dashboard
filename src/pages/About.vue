<template lang="pug">
  Layout
    h1 About us
    p {{ $static.metaData.siteDescription }}
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  }
}
</script>

<static-query>
  query {
    metaData {
      siteDescription
    }
  }
</static-query>
