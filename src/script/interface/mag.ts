import type { Player } from './player'
import type { FeedData } from '../data/feed-tables'

export type MagStats = [number, number, number, number, number, number]

export enum MagName {
    MAG = 'Mag',
    VARUNA = 'Varuna',
    KALKI = 'Kalki',
    VRITRA = 'Vritra',
}

export interface IMag {
    readonly name: MagName
    readonly feedTable: FeedData[]

    readonly synchro: number
    readonly iq: number

    readonly def: number
    readonly pow: number
    readonly dex: number
    readonly mind: number
    readonly level: number

    readonly defProgress: number
    readonly powProgress: number
    readonly dexProgress: number
    readonly mindProgress: number

    readonly checkEvolution: boolean

    feed(stats: MagStats): void
    bank(): void
    doEvolve(player: Player): IMag
}
