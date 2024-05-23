<template>
  <div>
    <the-header></the-header>
    <router-view v-slot="{ Component }">
      <transition name="view" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.view-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.view-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.view-enter-active {
  transition: all 0.3s ease-out;
}

.view-leave-active {
  transition: all 0.3s ease-in;
}

.view-enter-to,
.view-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
