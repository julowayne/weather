<template>
    <div class="dark-mode-toggle">
        <button class="mode-button" :class="isDark ? 'dark-mode' : 'light-mode'" @click="toggleDark()">
            <font-awesome-icon :icon="isDark ? ['fas', 'moon'] : ['fas', 'sun']"
                :class="{ 'dark-icon': isDark, 'light-icon': !isDark }" />
        </button>
    </div>
</template>

<script setup lang="ts">

import { useToggle } from '@vueuse/shared'
import { isDark } from '../services/dark'
const toggleDark = useToggle(isDark)

</script>

<style>
.dark-mode-toggle {
    position: absolute;
    top: 18%;
    right: 39%;
    transform: translateX(50%);
}

.dark-mode {
    background-color: var(--element-bg-color);
}

.light-mode {
    background-color: lightgray;
}

.dark-icon {
    color: #20c997;
}

.light-icon {
    color: var(--light-icon);
}



.mode-button {
    display: flex;
    justify-content: space-between;
    border: none;
    padding: 7px;
    border-radius: 4px;
    box-shadow: var(--box-shadow);
}

.dark {
    background-color: #252525;
    color: white;
}
</style>