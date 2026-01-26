import { type IMag, MagName, type MagStats } from '../interface/mag'
// import type { Player } from '../interface/player'

import { MagBase } from '../abstract/mag-base'
import { FEED_TABLE_1 } from '../data/feed-tables'

export class Vritra extends MagBase {
    constructor(stats: MagStats) {
        super(MagName.VRITRA, stats)
        this._feedTable = FEED_TABLE_1
    }

    get checkEvolution(): boolean {
        return false // TODO: évolution vers stage 2
    }

    doEvolve(/* player: Player */): IMag {
        // TODO: implémenter l'évolution vers stage 2
        return this
    }
}
