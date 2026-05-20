<!-- Root App Component -->
<template>
  <div id="app">
    <!-- Mobile Layout (xs, sm) -->
    <MobileLayout v-if="!isTabletOrLarger">
      <router-view />
    </MobileLayout>

    <!-- Tablet Layout (md) -->
    <TabletLayout v-else-if="!isDesktop">
      <router-view />
    </TabletLayout>

    <!-- Desktop Layout (lg, xl, 2xl) -->
    <DesktopLayout v-else>
      <router-view />
    </DesktopLayout>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import MobileLayout from "./layouts/MobileLayout.vue";
import TabletLayout from "./layouts/TabletLayout.vue";
import DesktopLayout from "./layouts/DesktopLayout.vue";

const isTabletOrLarger = ref(false);
const isDesktop = ref(false);

const checkScreenSize = () => {
  // md breakpoint: 768px
  // lg breakpoint: 1024px
  isTabletOrLarger.value = window.innerWidth >= 768;
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
