<template>
    <div>
        <h1>{{ mag.name }}</h1>

        <div>
            <div>Level: {{ mag.level }}</div>
            <div>Synchro: {{ mag.synchro }}%</div>
            <div>IQ: {{ mag.iq }}</div>
            <div>DEF: {{ mag.def }}</div>
            <div>POW: {{ mag.pow }}</div>
            <div>DEX: {{ mag.dex }}</div>
            <div>MIND: {{ mag.mind }}</div>
        </div>

        <h2>Nourrir le MAG</h2>

        <div class="feed-buttons">
            <button v-for="item in feedItems" :key="item.item" @click="feedMag(item)" class="feed-button">
                {{ item.item }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { IMag } from './script/interface/mag'
import { Player, PlayerClass } from './script/interface/player'
import { Mag } from './script/mags/mag'
import { FEED_TABLE_0, feedDataToMagStats, type FeedData } from './script/data/feed-tables'

const player = new Player(PlayerClass.HUMAR)

let mag: IMag = reactive(new Mag())

const feedItems = FEED_TABLE_0

function feedMag(item: FeedData): void {
    const stats = feedDataToMagStats(item)
    mag.feed(stats)

    if (mag.checkEvolution) {
        mag = reactive(mag.doEvolve(player))
    }
}
</script>

<style scoped lang="scss">
.feed-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}

.feed-button {
    appearance: none;
    font-size: 14px;
    background-color: #4CAF50;
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
