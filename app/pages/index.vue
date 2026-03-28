<template>
  <main>
    <HeroSection />
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
    <button @click="openModal">Open Modal</button>
    <ModalView :isOpen="IsModalViewOpen" :onClose="() => IsModalViewOpen = false" />
  </main>
</template>

<script setup lang="ts">
const openModal = () => {
  IsModalViewOpen.value = true;
  // Логика открытия модального окна
};
const IsModalViewOpen = ref(false);
</script>
