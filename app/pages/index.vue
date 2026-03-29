<template>
  <main>
    <HeroSection />
    <button
      @click="isOpen = true"
      :class="isOpen ? 'bg-amber-700' : 'active:bg-green-700'"
    >
      Open
    </button>
    <ModalDialog :isOpen="isOpen" @close="isOpen = false">
      Coooooool
    </ModalDialog>
    <AboutSection />
    <ServicesSection />
    <WorkWith />
    <PriceSection />
    <TechStack />
    <AppList />
    <PartnersSection />
    <RecomendSection />
    <ProjectList />
    <BlogSection />
    <FeedBack sourceName="Подвал главной страницы" />
  </main>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>
