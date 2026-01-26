<template>
    <div>
        <h2>Nourrir le MAG</h2>

        <div class="feed-buttons">
            <button
                v-for="item in feedItems"
                :key="item.item"
                @click="$emit('feed', item)"
                @mouseenter="$emit('preview', item)"
                @mouseleave="$emit('clearPreview')"
                class="feed-button"
            >
                {{ item.item }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IMag } from '../script/interface/mag'
import type { FeedData } from '../script/data/feed-tables'

const props = defineProps<{
    mag: IMag
}>()

defineEmits<{
    feed: [item: FeedData]
    preview: [item: FeedData]
    clearPreview: []
}>()

const feedItems = computed(() => {
    return props.mag.feedTable
})
</script>

<style scoped lang="scss">
.feed-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
}

.feed-button {
    appearance: none;
    font-size: 14px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3d8b40;
    }
}
</style>
