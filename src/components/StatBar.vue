<template>
    <div class="stat-row stat-bar-row">
        <span class="stat-label">{{ label }}:</span>

        <span class="stat-value">
            {{ value }}

            <span class="preview-change">
                {{ `(+${levelChange})` }}
            </span>
        </span>

        <div class="progress-bar">
            <div class="progress-fill" :class="`progress-${color}`" :style="{ width: progress + '%' }"></div>
            <div v-if="showPreview" class="progress-preview" :class="`progress-${color}`" :style="{ width: previewProgress + '%' }"></div>
        </div>

        <span class="progress-text">{{ progress }}/100</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    value: number
    progress: number
    previewProgress: number
    levelChange: number
    showPreview: boolean
    color: 'def' | 'pow' | 'dex' | 'mind'
}>()
</script>

<style scoped lang="scss">
.stat-bar-row {
    grid-template-columns: 100px 80px 1fr 80px !important;
}

.stat-label {
    display: block;
    text-align: right;
    font-weight: bold;
}

.stat-value {
    text-align: right;
    font-family: monospace;
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
</style>
