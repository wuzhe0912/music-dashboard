<template lang="pug">
  Layout
    g-image(alt="Example image" src="~/favicon.png" width="135")
    h1 Hello, world!
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo!
    p
      a(href="https://gridsome.org/docs/" target="_blank" rel="noopener") Gridsome Docs
      a(href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener") GitHub
    Footer
</template>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
