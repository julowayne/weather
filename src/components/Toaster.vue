<template>
  <Transition>
    <div class="container" v-if="toastersStore.toasters.length">
      <div class="toaster" v-for="(toaster, index) in toastersStore.toasters" :key="index">
        <div class="toaster-content">
          {{ toaster.message }} - {{ toaster.name }}
          <font-awesome-icon @click="close(index)" class="close" :icon="['fas', 'xmark']" />
        </div>
      </div>
    </div>
  </Transition>
</template>
  
<script lang="ts">
import { useToastersStore } from '@/stores/toaster'
import { mapStores } from 'pinia'


export default {
  name: 'Toaster',

  computed: {
    ...mapStores(useToastersStore)
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
  position: absolute;
  overflow: hidden;
  right: 10px;
  bottom: 10px;
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
  min-width: 250px;
  min-height: 60px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: lightgray;
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
    min-width: 350px;
    min-height: 30px;
  }
}
</style>
  