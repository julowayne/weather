<template>
  <div class="search-container">
    <div class="search">
      <input v-model="inputValue" type="text" @keyup.enter="getInput($event)" placeholder="Search other cities"
        required />
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon fa-lg light-icon" />
      <font-awesome-icon @click="clearInput" :icon="['fas', 'circle-xmark']" class="clear-input fa-lg light-icon" />
    </div>
  </div>
</template>

<script lang="ts">


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
    errorMsg: '',
    inputValue: ''
  }),

  methods: {

    getInput(event: any) {
      if (event && event.target) {

        this.inputValue = event.target.value;
        this.$emit('update:query', this.inputValue)

      }
    },

    clearInput() {
      this.inputValue = ''
      this.$emit('update:query', '');
    }

  },
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
  color: black;
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

.clear-input {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 16px;
}
</style>
