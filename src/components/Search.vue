<template>
  <div class="search-container">
    <div class="search">
      <input
        :value="query"
        type="text"
        @keyup.enter="getInput($event)"
        placeholder="Search other cities"
        required
      />
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon fa-lg" />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export interface ThreeHoursWeather {
  dateTime: Date
  temperature: number
  trend: string
}

export default {
  name: 'Search',

  emits: ['update:query'],

  data: () => ({
    owApiKey: import.meta.env.VITE_OW_API_KEY,
    errorMsg: ''
  }),

  props: {
    query: String as PropType<string>
  },
  methods: {
    getInput(event: any) {
      if (event && event.target) {
        this.$emit('update:query', event.target.value)
      }
    }
  }
}
</script>

<style scoped>
.search-container {
  width: 100%;
}

input {
  width: 100%;
  height: 50px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: var(--font-larger);
  font-weight: 500;
  padding: 0 35px;
  box-shadow: var(--box-shadow);
  border: none;
  background-color: #e9ecef;
}

input:focus {
  outline: none;
  border: none;
}

input::placeholder {
  color: black;
}

.search {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 15px;
}

.search-icon:hover {
  transform: scale(1.2);
  cursor: pointer;
  margin-bottom: 4px;
}
</style>
