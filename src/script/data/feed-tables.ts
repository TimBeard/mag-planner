import type { MagStats } from '../interface/mag'

export enum FeedItem {
    MONOMATE = 'Monomate',
    DIMATE = 'Dimate',
    TRIMATE = 'Trimate',
    MONOFLUID = 'Monofluid',
    DIFLUID = 'Difluid',
    TRIFLUID = 'Trifluid',
    ANTIDOTE = 'Antidote',
    ANTIPARALYSIS = 'Antiparalysis',
    SOL_ATOMIZER = 'Sol Atomizer',
    MOON_ATOMIZER = 'Moon Atomizer',
    STAR_ATOMIZER = 'Star Atomizer',
}

export interface FeedData {
    item: FeedItem
    def: number
    pow: number
    dex: number
    mind: number
    synchro: number
    iq: number
}

// Table 0: Forme de base du MAG
export const FEED_TABLE_0: FeedData[] = [
    {
        item: FeedItem.MONOMATE,
        def: 5,
        pow: 40,
        dex: 5,
        mind: 0,
        synchro: 3,
        iq: 3,
    },
    {
        item: FeedItem.DIMATE,
        def: 10,
        pow: 45,
        dex: 5,
        mind: 0,
        synchro: 3,
        iq: 3,
    },
    {
        item: FeedItem.TRIMATE,
        def: 15,
        pow: 50,
        dex: 10,
        mind: 0,
        synchro: 4,
        iq: 4,
    },
    {
        item: FeedItem.MONOFLUID,
        def: 5,
        pow: 0,
        dex: 5,
        mind: 40,
        synchro: 3,
        iq: 3,
    },
    {
        item: FeedItem.DIFLUID,
        def: 10,
        pow: 0,
        dex: 5,
        mind: 45,
        synchro: 3,
        iq: 3,
    },
    {
        item: FeedItem.TRIFLUID,
        def: 15,
        pow: 0,
        dex: 10,
        mind: 50,
        synchro: 4,
        iq: 4,
    },
    {
        item: FeedItem.SOL_ATOMIZER,
        def: 15,
        pow: 30,
        dex: 15,
        mind: 25,
        synchro: 4,
        iq: 1,
    },
    {
        item: FeedItem.MOON_ATOMIZER,
        def: 15,
        pow: 25,
        dex: 15,
        mind: 30,
        synchro: 4,
        iq: 1,
    },
    {
        item: FeedItem.STAR_ATOMIZER,
        def: 25,
        pow: 25,
        dex: 25,
        mind: 25,
        synchro: 6,
        iq: 5,
    },
    {
        item: FeedItem.ANTIDOTE,
        def: 5,
        pow: 10,
        dex: 40,
        mind: 0,
        synchro: 3,
        iq: 3,
    },
    {
        item: FeedItem.ANTIPARALYSIS,
        def: 5,
        pow: 0,
        dex: 44,
        mind: 10,
        synchro: 3,
        iq: 3,
    },
]

/**
 * Convertit les données de nourrissage en MagStats
 * @param feedData Les données de l'item utilisé pour nourrir
 * @returns Un tableau MagStats [synchro, iq, def, pow, dex, mind]
 */
export function feedDataToMagStats(feedData: FeedData): MagStats {
    return [
        feedData.synchro,
        feedData.iq,
        feedData.def,
        feedData.pow,
        feedData.dex,
        feedData.mind,
    ]
}

/**
 * Obtient les données de nourrissage pour un item spécifique
 * @param item L'item à rechercher
 * @param table La table de nourrissage à utiliser (par défaut: Table 0)
 * @returns Les données de nourrissage ou undefined si non trouvé
 */
export function getFeedData(
    item: FeedItem,
    table: FeedData[] = FEED_TABLE_0,
): FeedData | undefined {
    return table.find((data) => data.item === item)
}
