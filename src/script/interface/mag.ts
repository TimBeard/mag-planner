import type { Player } from './player'

export type MagStats = [number, number, number, number, number, number]

export enum MagName {
    MAG = 'Mag',
    VARUNA = 'Varuna',
    KALKI = 'Kalki',
    VRITRA = 'Vritra',
}

export interface IMag {
    readonly name: MagName

    readonly synchro: number
    readonly iq: number

    readonly def: number
    readonly pow: number
    readonly dex: number
    readonly mind: number
    readonly level: number

    readonly checkEvolution: boolean

    feed(stats: MagStats): void
    bank(): void
    doEvolve(player: Player): IMag
}
