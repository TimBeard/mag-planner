<template>
  <div>{{ mag.name }}</div>
  <div>Level: {{ mag.level }}</div>
  <div>Synchro: {{ mag.synchro }}%</div>
  <div>IQ: {{ mag.iq }}</div>
  <div>DEF: {{ mag.def }}</div>
  <div>POW: {{ mag.pow }}</div>
  <div>DEX: {{ mag.dex }}</div>
  <div>MIND: {{ mag.mind }}</div>

  <pre>{{ mag }}</pre>

  <button @click="feed([3, 3, 5, 10, 40, 0])">Base Form</button>
  <button @click="feed([0, 1, 0, 5, 15, 0])">First Evolution</button>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { IMag, MagStats } from './script/interface/mag'
import { Player, PlayerClass } from './script/interface/player'
import { Mag } from './script/mags/mag'

const player = new Player(PlayerClass.HUMAR)

let mag: IMag = reactive(new Mag())

function feed(stats: MagStats): void {
    mag.feed(stats)

    if (mag.checkEvolution) {
        mag = reactive(mag.doEvolve(player))
    }
}
</script>
