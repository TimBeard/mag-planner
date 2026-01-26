import { ref, type Ref } from 'vue'
import type { IMag } from '../script/interface/mag'
import type { Player } from '../script/interface/player'
import { Mag } from '../script/mags/mag'
import { feedDataToMagStats, type FeedData } from '../script/data/feed-tables'

export function useMag() {
    const mag: Ref<IMag> = ref(new Mag())

    function feedMag(item: FeedData, player: Player): void {
        const stats = feedDataToMagStats(item)
        mag.value.feed(stats)

        if (mag.value.checkEvolution) {
            mag.value = mag.value.doEvolve(player)
        }
    }

    function resetMag(): void {
        mag.value = new Mag()
    }

    return {
        mag,
        feedMag,
        resetMag,
    }
}
