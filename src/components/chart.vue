<template>
    <div>
        <canvas id="forecastTemperatures"></canvas>
    </div>
</template>

<script lang="ts">
import Chart from 'chart.js';
import { mapStores } from 'pinia'
import { useSearchStore } from '@/stores/search';


export default {
    name: 'Chart',
    computed: {
        ...mapStores(useSearchStore),
    },

    methods: {
        graphic() {

        }
    },

    mounted() {
        this.graphic()
    },
}
</script>

<style scoped></style>