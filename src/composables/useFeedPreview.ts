import { ref, computed, type Ref } from 'vue'
import type { IMag } from '../script/interface/mag'
import type { FeedData } from '../script/data/feed-tables'

export interface FeedPreview {
    defProgress: number
    powProgress: number
    dexProgress: number
    mindProgress: number
    defLevel: number
    powLevel: number
    dexLevel: number
    mindLevel: number
    levelChange: number
    iqChange: number
    synchroChange: number
}

export function useFeedPreview(mag: Ref<IMag>) {
    const hoveredItem = ref<FeedData | null>(null)

    const preview = computed<FeedPreview>(() => {
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
                levelChange: 0,
                iqChange: 0,
                synchroChange: 0,
            }
        }

        const item = hoveredItem.value
        const currentDef = mag.value.defProgress
        const currentPow = mag.value.powProgress
        const currentDex = mag.value.dexProgress
        const currentMind = mag.value.mindProgress

        const newDef = Math.max(0, Math.min(100, currentDef + item.def))
        const newPow = Math.max(0, Math.min(100, currentPow + item.pow))
        const newDex = Math.max(0, Math.min(100, currentDex + item.dex))
        const newMind = Math.max(0, Math.min(100, currentMind + item.mind))

        // Calculer les niveaux gagnés (100 points = 1 niveau)
        // On ne peut pas perdre de niveau, donc on limite à 0 minimum
        const currentDefLevel = mag.value.def
        const currentPowLevel = mag.value.pow
        const currentDexLevel = mag.value.dex
        const currentMindLevel = mag.value.mind

        const newDefLevel = Math.floor((currentDef + item.def) / 100)
        const newPowLevel = Math.floor((currentPow + item.pow) / 100)
        const newDexLevel = Math.floor((currentDex + item.dex) / 100)
        const newMindLevel = Math.floor((currentMind + item.mind) / 100)

        // Empêcher la perte de niveaux (ne peut pas descendre en dessous de 0)
        const defLevel = Math.max(0, newDefLevel - currentDefLevel)
        const powLevel = Math.max(0, newPowLevel - currentPowLevel)
        const dexLevel = Math.max(0, newDexLevel - currentDexLevel)
        const mindLevel = Math.max(0, newMindLevel - currentMindLevel)

        // Calculer le changement total de niveau
        const levelChange = defLevel + powLevel + dexLevel + mindLevel

        return {
            defProgress: newDef,
            powProgress: newPow,
            dexProgress: newDex,
            mindProgress: newMind,
            defLevel,
            powLevel,
            dexLevel,
            mindLevel,
            levelChange,
            iqChange: item.iq,
            synchroChange: item.synchro,
        }
    })

    function previewItem(item: FeedData): void {
        hoveredItem.value = item
    }

    function clearPreview(): void {
        hoveredItem.value = null
    }

    return {
        hoveredItem,
        preview,
        previewItem,
        clearPreview,
    }
}
