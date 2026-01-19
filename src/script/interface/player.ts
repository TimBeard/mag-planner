export enum PlayerClass {
    HUMAR = 'HUmar',
    HUNEWEARL = 'HUnewearl',
    HUCAST = 'HUcast',
    RAMAR = 'RAmar',
    RACAST = 'RAcast',
    RACASEAL = 'RAcaseal',
    FOMARL = 'FOmarl',
    FONEWM = 'FOnewm',
    FONEWEARL = 'FOnewearl',
    HUCASEAL = 'HUcaseal',
    RAMARL = 'RAmarl',
    FOMAR = 'FOmar',
}

export enum PlayerJob {
    HUNTER = 'HU',
    RANGER = 'RA',
    FORCE = 'FO',
}

export class Player {
    className: PlayerClass

    constructor(className: PlayerClass) {
        this.className = className
    }

    get job(): PlayerJob {
        return this.className.substring(0, 2) as PlayerJob
    }
}
