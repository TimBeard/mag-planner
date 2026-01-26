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

        <div class="stats">
            <div class="stat-row">
                <span class="stat-label">Level:</span>
                <span class="stat-value">{{ mag.level }}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Synchro:</span>
                <span class="stat-value">{{ mag.synchro }}%</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">IQ:</span>
                <span class="stat-value">{{ mag.iq }}</span>
            </div>

            <div class="stat-row">
                <span class="stat-label">DEF:</span>
                <span class="stat-value">
                    {{ mag.def }}
                    <span v-if="preview.defLevel !== 0" class="preview-change">{{ preview.defLevel > 0 ? `(+${preview.defLevel})` : `(${preview.defLevel})` }}</span>
                </span>
                <div class="progress-bar">
                    <div class="progress-fill progress-def" :style="{ width: mag.defProgress + '%' }"></div>
                    <div v-if="hoveredItem" class="progress-preview progress-def" :style="{ width: preview.defProgress + '%' }"></div>
                </div>
                <span class="progress-text">{{ mag.defProgress }}/100</span>
            </div>

            <div class="stat-row">
                <span class="stat-label">POW:</span>
                <span class="stat-value">
                    {{ mag.pow }}
                    <span v-if="preview.powLevel !== 0" class="preview-change">{{ preview.powLevel > 0 ? `(+${preview.powLevel})` : `(${preview.powLevel})` }}</span>
                </span>
                <div class="progress-bar">
                    <div class="progress-fill progress-pow" :style="{ width: mag.powProgress + '%' }"></div>
                    <div v-if="hoveredItem" class="progress-preview progress-pow" :style="{ width: preview.powProgress + '%' }"></div>
                </div>
                <span class="progress-text">{{ mag.powProgress }}/100</span>
            </div>

            <div class="stat-row">
                <span class="stat-label">DEX:</span>
                <span class="stat-value">
                    {{ mag.dex }}
                    <span v-if="preview.dexLevel !== 0" class="preview-change">{{ preview.dexLevel > 0 ? `(+${preview.dexLevel})` : `(${preview.dexLevel})` }}</span>
                </span>
                <div class="progress-bar">
                    <div class="progress-fill progress-dex" :style="{ width: mag.dexProgress + '%' }"></div>
                    <div v-if="hoveredItem" class="progress-preview progress-dex" :style="{ width: preview.dexProgress + '%' }"></div>
                </div>
                <span class="progress-text">{{ mag.dexProgress }}/100</span>
            </div>

            <div class="stat-row">
                <span class="stat-label">MIND:</span>
                <span class="stat-value">
                    {{ mag.mind }}
                    <span v-if="preview.mindLevel !== 0" class="preview-change">{{ preview.mindLevel > 0 ? `(+${preview.mindLevel})` : `(${preview.mindLevel})` }}</span>
                </span>
                <div class="progress-bar">
                    <div class="progress-fill progress-mind" :style="{ width: mag.mindProgress + '%' }"></div>
                    <div v-if="hoveredItem" class="progress-preview progress-mind" :style="{ width: preview.mindProgress + '%' }"></div>
                </div>
                <span class="progress-text">{{ mag.mindProgress }}/100</span>
            </div>
        </div>

        <h2>Nourrir le MAG</h2>

        <div class="feed-buttons">
            <button
                v-for="item in feedItems"
                :key="item.item"
                @click="feedMag(item)"
                @mouseenter="previewItem(item)"
                @mouseleave="clearPreview"
                class="feed-button"
            >
                {{ item.item }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { IMag } from './script/interface/mag'
import { Player, PlayerClass, SectionId } from './script/interface/player'
import { Mag } from './script/mags/mag'
import { FEED_TABLE_0, feedDataToMagStats, type FeedData } from './script/data/feed-tables'

const selectedClass = ref(PlayerClass.HUMAR)
const selectedSectionId = ref(SectionId.VIRIDIA)
const player = reactive(new Player(selectedClass.value, selectedSectionId.value))

let mag: IMag = reactive(new Mag())
const hoveredItem = ref<FeedData | null>(null)

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

function previewItem(item: FeedData): void {
    hoveredItem.value = item
}

function clearPreview(): void {
    hoveredItem.value = null
}

const preview = computed(() => {
    if (!hoveredItem.value) {
        return {
            defProgress: 0,
            powProgress: 0,
            dexProgress: 0,
            mindProgress: 0,
            defLevel: 0,
            powLevel: 0,
            dexLevel: 0,
            mindLevel: 0,
        }
    }

    const item = hoveredItem.value
    const currentDef = mag.defProgress
    const currentPow = mag.powProgress
    const currentDex = mag.dexProgress
    const currentMind = mag.mindProgress

    const newDef = Math.max(0, Math.min(100, currentDef + item.def))
    const newPow = Math.max(0, Math.min(100, currentPow + item.pow))
    const newDex = Math.max(0, Math.min(100, currentDex + item.dex))
    const newMind = Math.max(0, Math.min(100, currentMind + item.mind))

    // Calculer les niveaux gagnés (100 points = 1 niveau)
    const defLevel = Math.floor((currentDef + item.def) / 100) - Math.floor(currentDef / 100)
    const powLevel = Math.floor((currentPow + item.pow) / 100) - Math.floor(currentPow / 100)
    const dexLevel = Math.floor((currentDex + item.dex) / 100) - Math.floor(currentDex / 100)
    const mindLevel = Math.floor((currentMind + item.mind) / 100) - Math.floor(currentMind / 100)

    return {
        defProgress: newDef,
        powProgress: newPow,
        dexProgress: newDex,
        mindProgress: newMind,
        defLevel,
        powLevel,
        dexLevel,
        mindLevel,
    }
})
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

.stats {
    margin: 20px 0;
}

.stat-row {
    display: grid;
    grid-template-columns: 80px 50px 1fr 80px;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    &:nth-child(-n+3) {
        grid-template-columns: 80px 50px;
    }
}

.stat-label {
    font-weight: bold;
}

.stat-value {
    text-align: right;
}

.progress-bar {
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}

.progress-fill {
    height: 100%;
    transition: width 0.3s ease;
    position: relative;
    z-index: 1;
}

.progress-preview {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.4;
    z-index: 2;
    transition: width 0.2s ease;
}

.progress-def {
    background-color: #4caf50;
}

.progress-pow {
    background-color: #f44336;
}

.progress-dex {
    background-color: #ffeb3b;
}

.progress-mind {
    background-color: #2196f3;
}

.progress-text {
    font-size: 12px;
    color: #666;
}

.preview-change {
    color: #666;
    font-size: 0.9em;
    margin-left: 4px;
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
