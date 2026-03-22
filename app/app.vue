<script setup>

useHead({
  bodyAttrs: {
    class: 'bg-[url("/bg.png")]  bg-cover bg-center bg-fixed min-h-screen font-sans'
  }
})
</script>

<template>
 <div class="relative z-10">
    <AppHeader />
    <NuxtPage /> 
    <FeedBack/>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>