<template>
    <div class="app-container">
        <div class="left-panel">
            <h1>{{ mag.name }}</h1>
            <MagStats :mag="mag" :preview="preview" :hoveredItem="hoveredItem" />
        </div>

        <div class="right-panel">
            <PlayerSelector :player="player" @update:player="onPlayerUpdate" />
            <FeedButtons
                :mag="mag"
                @feed="handleFeed"
                @preview="previewItem"
                @clearPreview="clearPreview"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Player, PlayerClass, SectionId } from './script/interface/player'
import { useMag } from './composables/useMag'
import { useFeedPreview } from './composables/useFeedPreview'
import type { FeedData } from './script/data/feed-tables'
import PlayerSelector from './components/PlayerSelector.vue'
import MagStats from './components/MagStats.vue'
import FeedButtons from './components/FeedButtons.vue'

const player = reactive(new Player(PlayerClass.HUMAR, SectionId.VIRIDIA))

const { mag, feedMag } = useMag()
const { hoveredItem, preview, previewItem, clearPreview } = useFeedPreview(mag)

function onPlayerUpdate(): void {
    // Le player est déjà réactif, rien à faire
}

function handleFeed(item: FeedData): void {
    feedMag(item, player)
}
</script>

<style scoped lang="scss">
.app-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
}

.left-panel {
    h1 {
        margin-top: 0;
    }
}

.right-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
