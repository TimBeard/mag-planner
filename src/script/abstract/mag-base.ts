import type { IMag, MagName, MagStats } from '../interface/mag'
import type { Player } from '../interface/player'

export abstract class MagBase implements IMag {
    private _name: MagName

    private _synchro: number
    private _iq: number

    private _def: number
    private _pow: number
    private _dex: number
    private _mind: number

    constructor(name: MagName, stats: MagStats) {
        this._name = name

        this._synchro = stats[0]
        this._iq = stats[1]

        this._def = stats[2]
        this._pow = stats[3]
        this._dex = stats[4]
        this._mind = stats[5]
    }

    private computeAddedValue(currentValue: number, newValue: number): number {
        const decimal = currentValue % 100

        if (decimal + newValue < 0) return 0

        const addedLevels = Math.floor((decimal + newValue) / 100)

        if (addedLevels > 0 && this.level + addedLevels > 200) {
            return 99 - decimal
        }

        return newValue
    }

    protected get stats(): MagStats {
        return [this._synchro, this._iq, this._def, this._pow, this._dex, this._mind]
    }

    abstract get checkEvolution(): boolean

    abstract doEvolve(player: Player): IMag

    feed(stats: MagStats): void {
        this._synchro = Math.min(Math.max(this._synchro + stats[0], 0), 120)
        this._iq = Math.min(Math.max(this._iq + stats[1], 0), 200)

        // TODO: what happens if a level 199 mag gains 4 levels with a single feed?
        this._def += this.computeAddedValue(this._def, stats[2])
        this._pow += this.computeAddedValue(this._pow, stats[3])
        this._dex += this.computeAddedValue(this._dex, stats[4])
        this._mind += this.computeAddedValue(this._mind, stats[5])
    }

    bank(): void {
        if (this._def % 2 !== 0) {
            this._def -= 1
        }

        if (this._pow % 2 !== 0) {
            this._pow -= 1
        }

        if (this._dex % 2 !== 0) {
            this._dex -= 1
        }

        if (this._mind % 2 !== 0) {
            this._mind -= 1
        }
    }

    get name(): MagName {
        return this._name
    }

    get synchro(): number {
        return this._synchro
    }

    get iq(): number {
        return this._iq
    }

    get def(): number {
        return Math.floor(this._def / 100)
    }

    get pow(): number {
        return Math.floor(this._pow / 100)
    }

    get dex(): number {
        return Math.floor(this._dex / 100)
    }

    get mind(): number {
        return Math.floor(this._mind / 100)
    }

    get level(): number {
        return this.def + this.pow + this.dex + this.mind
    }
}
