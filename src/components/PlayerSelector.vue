<template>
    <div class="player-selection-container">
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
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Player, PlayerClass, SectionId } from '../script/interface/player'

const props = defineProps<{
    player: Player
}>()

const emit = defineEmits<{
    'update:player': [player: Player]
}>()

const selectedClass = ref(props.player.className)
const selectedSectionId = ref(props.player.sectionId)

function onClassChange(): void {
    props.player.className = selectedClass.value
    emit('update:player', props.player)
}

function onSectionIdChange(): void {
    props.player.sectionId = selectedSectionId.value
    emit('update:player', props.player)
}
</script>

<style scoped lang="scss">
.player-selection-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

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
            border-color: #4caf50;
        }
    }
}
</style>
