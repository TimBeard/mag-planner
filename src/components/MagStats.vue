<template>
    <div class="stats">
        <div class="stat-row">
            <span class="stat-label">Level:</span>

            <span class="stat-value">
                {{ mag.level }}

                <span class="preview-change">
                    {{ `(+${preview.levelChange})` }}
                </span>
            </span>
        </div>

        <div class="stat-row">
            <span class="stat-label">Synchro:</span>

            <span class="stat-value">
                {{ mag.synchro }}%

                <span class="preview-change">
                    {{ preview.synchroChange > -1 ? `(+${preview.synchroChange})` : `(${preview.synchroChange})` }}
                </span>
            </span>
        </div>

        <div class="stat-row">
            <span class="stat-label">IQ:</span>

            <span class="stat-value">
                {{ mag.iq }}

                <span class="preview-change">
                    {{ preview.iqChange > -1 ? `(+${preview.iqChange})` : `(${preview.iqChange})` }}
                </span>
            </span>
        </div>

        <StatBar
            label="DEF"
            :value="mag.def"
            :progress="mag.defProgress"
            :previewProgress="preview.defProgress"
            :levelChange="preview.defLevel"
            :showPreview="hoveredItem !== null"
            color="def"
        />

        <StatBar
            label="POW"
            :value="mag.pow"
            :progress="mag.powProgress"
            :previewProgress="preview.powProgress"
            :levelChange="preview.powLevel"
            :showPreview="hoveredItem !== null"
            color="pow"
        />

        <StatBar
            label="DEX"
            :value="mag.dex"
            :progress="mag.dexProgress"
            :previewProgress="preview.dexProgress"
            :levelChange="preview.dexLevel"
            :showPreview="hoveredItem !== null"
            color="dex"
        />

        <StatBar
            label="MIND"
            :value="mag.mind"
            :progress="mag.mindProgress"
            :previewProgress="preview.mindProgress"
            :levelChange="preview.mindLevel"
            :showPreview="hoveredItem !== null"
            color="mind"
        />
    </div>
</template>

<script setup lang="ts">
import type { IMag } from '../script/interface/mag'
import type { FeedData } from '../script/data/feed-tables'
import type { FeedPreview } from '../composables/useFeedPreview'
import StatBar from './StatBar.vue'

defineProps<{
    mag: IMag
    preview: FeedPreview
    hoveredItem: FeedData | null
}>()
</script>

<style scoped lang="scss">
.stats {
    margin: 20px 0;
}

.stat-row {
    display: grid;
    grid-template-columns: 100px 80px;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.stat-label {
    display: block;
    text-align: right;
    font-weight: bold;
}

.stat-value {
    font-family: monospace;
    text-align: right;
}

.preview-change {
    color: #666;
    font-size: 0.9em;
    margin-left: 4px;
}
</style>
