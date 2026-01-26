import { type IMag, MagName, type MagStats } from '../interface/mag'
import type { Player } from '../interface/player'

import { MagBase } from '../abstract/mag-base'

export class Kalki extends MagBase {
    constructor(stats: MagStats) {
        super(MagName.KALKI, stats)
    }

    get checkEvolution(): boolean {
        return false // TODO: évolution vers stage 2
    }

    doEvolve(player: Player): IMag {
        // TODO: implémenter l'évolution vers stage 2
        return this
    }
}
