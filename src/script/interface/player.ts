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

export enum SectionId {
    VIRIDIA = 'Viridia',
    GREENILL = 'Greenill',
    SKYLY = 'Skyly',
    BLUEFULL = 'Bluefull',
    PURPLENUM = 'Purplenum',
    PINKAL = 'Pinkal',
    REDRIA = 'Redria',
    ORAN = 'Oran',
    YELLOWBOZE = 'Yellowboze',
    WHITILL = 'Whitill',
}

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
}

export class Player {
    className: PlayerClass
    sectionId: SectionId

    constructor(className: PlayerClass, sectionId: SectionId) {
        this.className = className
        this.sectionId = sectionId
    }

    get job(): PlayerJob {
        return this.className.substring(0, 2) as PlayerJob
    }

    get gender(): Gender {
        const classNameLower = this.className.toLowerCase()
        
        // Female: marL, caseaL, newearL
        if (classNameLower.endsWith('l')) {
            return Gender.FEMALE
        }
        
        // Male: mar, cast, newm
        return Gender.MALE
    }
}
