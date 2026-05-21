<script setup lang="ts">
import LandingFeatures from '../components/landing/LandingFeatures.vue'
import LandingFooter from '../components/landing/LandingFooter.vue'
import LandingHeader from '../components/landing/LandingHeader.vue'
import LandingHero from '../components/landing/LandingHero.vue'
import LandingSteps from '../components/landing/LandingSteps.vue'
</script>

<template>
  <div class="landing-page">
    <div class="landing-page__blobs" aria-hidden="true">
      <span class="landing-page__blob landing-page__blob--light landing-page__blob--one"></span>
      <span class="landing-page__blob landing-page__blob--violet landing-page__blob--two"></span>
      <span class="landing-page__blob landing-page__blob--light landing-page__blob--three"></span>
      <span class="landing-page__blob landing-page__blob--violet landing-page__blob--four"></span>
    </div>

    <LandingHeader />

    <main class="landing-page__main">
      <LandingHero />
      <LandingFeatures />
      <LandingSteps />
    </main>

    <LandingFooter />
  </div>
</template>

<style scoped>
.landing-page {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 100vh;
  background: #f9f9ff;
  color: #4a4455;
}

.landing-page__main {
  display: grid;
  gap: 72px;
  padding-bottom: 72px;
}

.landing-page__blobs {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.landing-page__blob {
  position: absolute;
  border-radius: 9999px;
  opacity: 0.9;
}

.landing-page__blob--light {
  background: #d7d3f6;
  filter: blur(50px);
}

.landing-page__blob--violet {
  background: #42008a;
  filter: blur(100px);
}

.landing-page__blob--one {
  top: -80px;
  left: -140px;
  width: 420px;
  height: 260px;
}

.landing-page__blob--two {
  top: 220px;
  left: 48px;
  width: 260px;
  height: 260px;
}

.landing-page__blob--three {
  top: 60px;
  right: -140px;
  width: 420px;
  height: 260px;
}

.landing-page__blob--four {
  top: 980px;
  right: 12%;
  width: 520px;
  height: 320px;
}

@media (max-width: 767px) {
  .landing-page__main {
    gap: 56px;
    padding-bottom: 56px;
  }

  .landing-page__blob--one,
  .landing-page__blob--three {
    width: 280px;
    height: 180px;
  }

  .landing-page__blob--two {
    top: 260px;
    left: -40px;
    width: 220px;
    height: 220px;
  }

  .landing-page__blob--four {
    top: 1080px;
    right: -120px;
    width: 320px;
    height: 220px;
  }
}
</style>
