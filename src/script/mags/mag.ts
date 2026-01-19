import { type IMag, MagName, type MagStats } from '../interface/mag'
import { type Player, PlayerJob } from '../interface/player'

import { MagBase } from '../abstract/mag-base'

export class Mag extends MagBase {
    constructor(stats: MagStats = [20, 0, 500, 0, 0, 0]) {
        super(MagName.MAG, stats)
    }

    get checkEvolution(): boolean {
        return this.level >= 10
    }

    doEvolve(player: Player): IMag {
        switch (player.job) {
            case PlayerJob.HUNTER:
                return new Mag(this.stats)

            case PlayerJob.RANGER:
                return new Mag(this.stats)

            case PlayerJob.FORCE:
                return new Mag(this.stats)
        }
    }
}
