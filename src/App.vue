<template>
    <div>
        <div class="player-selection">
            <label for="player-class">Classe de personnage:</label>

            <select id="player-class" v-model="selectedClass" @change="onClassChange">
                <optgroup label="--- Hunter (HU) ---">
                    <option :value="PlayerClass.HUMAR">HUmar</option>
                    <option :value="PlayerClass.HUNEWEARL">HUnewearl</option>
                    <option :value="PlayerClass.HUCAST">HUcast</option>
                    <option :value="PlayerClass.HUCASEAL">HUcaseal</option>
                </optgroup>
                <optgroup label="--- Ranger (RA) ---">
                    <option :value="PlayerClass.RAMAR">RAmar</option>
                    <option :value="PlayerClass.RACAST">RAcast</option>
                    <option :value="PlayerClass.RACASEAL">RAcaseal</option>
                    <option :value="PlayerClass.RAMARL">RAmarl</option>
                </optgroup>
                <optgroup label="--- Force (FO) ---">
                    <option :value="PlayerClass.FOMARL">FOmarl</option>
                    <option :value="PlayerClass.FONEWM">FOnewm</option>
                    <option :value="PlayerClass.FONEWEARL">FOnewearl</option>
                    <option :value="PlayerClass.FOMAR">FOmar</option>
                </optgroup>
            </select>
        </div>

        <div class="player-selection">
            <label for="section-id">Section ID:</label>
            
            <select id="section-id" v-model="selectedSectionId" @change="onSectionIdChange">
                <option :value="SectionId.VIRIDIA">Viridia</option>
                <option :value="SectionId.GREENILL">Greenill</option>
                <option :value="SectionId.SKYLY">Skyly</option>
                <option :value="SectionId.BLUEFULL">Bluefull</option>
                <option :value="SectionId.PURPLENUM">Purplenum</option>
                <option :value="SectionId.PINKAL">Pinkal</option>
                <option :value="SectionId.REDRIA">Redria</option>
                <option :value="SectionId.ORAN">Oran</option>
                <option :value="SectionId.YELLOWBOZE">Yellowboze</option>
                <option :value="SectionId.WHITILL">Whitill</option>
            </select>
        </div>

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
import { reactive, ref } from 'vue'
import type { IMag } from './script/interface/mag'
import { Player, PlayerClass, SectionId } from './script/interface/player'
import { Mag } from './script/mags/mag'
import { FEED_TABLE_0, feedDataToMagStats, type FeedData } from './script/data/feed-tables'

const selectedClass = ref(PlayerClass.HUMAR)
const selectedSectionId = ref(SectionId.VIRIDIA)
const player = reactive(new Player(selectedClass.value, selectedSectionId.value))

let mag: IMag = reactive(new Mag())

function onClassChange(): void {
    player.className = selectedClass.value
}

function onSectionIdChange(): void {
    player.sectionId = selectedSectionId.value
}

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
.player-selection {
    margin-bottom: 20px;
    
    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    
    select {
        padding: 8px 12px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
        min-width: 200px;
        
        &:focus {
            outline: none;
            border-color: #4CAF50;
        }
    }
}

.feed-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
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
