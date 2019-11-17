<template lang="pug">
  Layout
    h1 About us
    p {{ $static.metadata.siteDescription }}
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
    metadata {
      siteDescription
    }
  }
</static-query>
