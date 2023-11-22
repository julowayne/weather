<template>
  <div class="search-container">
    <div class="search">
      <input
        :value="query"
        type="text"
        @keyup.enter="$emit('update:query', $event.target.value)"
        placeholder="Search other cities"
      />
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon fa-lg" />
    </div>
    <!-- <div v-if="searchCity.temperature !== null">
      The temperature in {{ searchCity.name }} is {{ searchCity.temperature }} °c
    </div>
    <div v-else>
      {{ errorMsg }}
    </div> -->
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
  }

}
</script>

<style scoped>
.search-container {
  width: 100%;
}

input {
  display: inline-block;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: larger;
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
  top: 17px;
}

.search-icon:hover {
  transform: scale(1.2);
  cursor: pointer;
}
</style>
