import { type IMag, MagName, type MagStats } from '../interface/mag'
import { type Player, PlayerJob } from '../interface/player'

import { MagBase } from '../abstract/mag-base'
import { FEED_TABLE_0 } from '../data/feed-tables'
import { Varuna } from './varuna'
import { Kalki } from './kalki'
import { Vritra } from './vritra'

export class Mag extends MagBase {
    constructor(stats: MagStats = [20, 0, 500, 0, 0, 0]) {
        super(MagName.MAG, stats)
        this._feedTable = FEED_TABLE_0
    }

    get checkEvolution(): boolean {
        return this.level >= 10
    }

    doEvolve(player: Player): IMag {
        switch (player.job) {
            case PlayerJob.HUNTER:
                return new Varuna(this.stats)

            case PlayerJob.RANGER:
                return new Kalki(this.stats)

            case PlayerJob.FORCE:
                return new Vritra(this.stats)
        }
    }
}
