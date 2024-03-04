<template>
  <Transition>
    <div class="container" v-if="toastersStore.toasters.length">
      <div class="toaster" :class="isDark ? 'dark-mode' : 'light-mode'" v-for=" (toaster, index) in
        toastersStore.toasters" :key="index">
        <div class="toaster-content">
          {{ toaster.message }}
          <font-awesome-icon @click="close(index)" class="close" :class="darkModeClass" :icon="['fas', 'xmark']" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { useToastersStore } from '@/stores/toaster'
import { mapStores } from 'pinia'
import { dark } from '@/helpers/dark-toggle'
import { useToggle } from '@vueuse/shared'
import { isDark } from '../services/dark'
import { useDark } from '@vueuse/core'
const toggleDark = useToggle(isDark)



export default {
  name: 'Toaster',

  data: () => ({
    isDark: useDark({
      selector: 'html',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: 'light',
    }),
  }),

  computed: {
    ...mapStores(useToastersStore),

    darkModeClass() {
      return dark(this.isDark);
    },
  },

  methods: {
    close(index: number) {
      this.toastersStore.close(index)
    }
  },
}
</script>

<style scoped>
.container {
  width: 350px;
  position: absolute;
  overflow: hidden;
  right: 2rem;
  bottom: 1rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.toaster {
  width: 100%;
  min-height: 60px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

.toaster-content {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 15px;
}

.close {
  cursor: pointer;
  margin-top: 5px;
}

/* Responsive */
@media (min-width: 1024px) {}

@media (max-width: 992px) and (max-width: 1024px) {}

@media (min-width: 768px) and (max-width: 992px) {
  .weather-title {
    font-size: x-large;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .container {
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
    max-height: 150px;
  }

  .toaster {
    min-height: 30px;
  }
}
</style>