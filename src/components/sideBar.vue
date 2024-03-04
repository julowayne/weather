<template>
    <div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Recent searches</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="searched shadow" v-for="(search, index) in searchStore.searches" :key="index">
                    <div>{{ search.city }} - {{ search.temperature }} °c</div>
                    <div>
                        <font-awesome-icon @click="deleteSearch(index)" :icon="['fas', 'trash-can']" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { useSearchStore } from '@/stores/search';


export default {
    name: 'sideBar',
    computed: {
        ...mapStores(useSearchStore),
    },

    methods: {
        deleteSearch(index: number) {
            this.searchStore.delete(index)
        }
    }
}
</script>

<style scoped>
.searched {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #20c997;
    border-radius: 0.5rem;
}


.searched:hover {
    background-color: #17a2b8;
}
</style>