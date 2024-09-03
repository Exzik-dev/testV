<script setup lang="ts">

import Header from "@/components/Blocks/Header.vue";
import Footer from "@/components/Blocks/Footer.vue";
</script>

<template>
  <Header/>
  <main >
    <RouterView/>
  </main>
  <Footer/>
</template>

<style scoped>

</style>