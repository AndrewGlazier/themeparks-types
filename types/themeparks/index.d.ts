// Type definitions for themeparks 4.6
// Project: https://github.com/cubehouse/themeparks#readme
// Definitions by: Jonathan Harrison <https://github.com/JonJam>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = themeparks;

declare const themeparks: {
    AllParks: any[];
    Parks: {
        AltonTowers: any;
        AsterixPark: any;
        BuschGardensTampaBay: any;
        BuschGardensWilliamsburg: any;
        CanadasWonderland: any;
        Carowinds: any;
        CedarPoint: any;
        ChessingtonWorldOfAdventures: any;
        DisneylandParisMagicKingdom: any;
        DisneylandParisWaltDisneyStudios: any;
        DisneylandResortCaliforniaAdventure: any;
        DisneylandResortMagicKingdom: any;
        Efteling: any;
        EuropaPark: any;
        HersheyPark: any;
        HongKongDisneyland: any;
        KingsIsland: any;
        KnottsBerryFarm: any;
        LaRondeMontreal: any;
        SeaworldOrlando: any;
        SeaworldSanAntonio: any;
        SeaworldSanDiego: any;
        SesamePlace: any;
        ShanghaiDisneyResortMagicKingdom: any;
        SixFlagsAmerica: any;
        SixFlagsDiscoveryKingdom: any;
        SixFlagsFiestaTexas: any;
        SixFlagsGreatAdventure: any;
        SixFlagsGreatAmerica: any;
        SixFlagsHurricaneHarborArlington: any;
        SixFlagsHurricaneHarborJackson: any;
        SixFlagsHurricaneHarborLosAngeles: any;
        SixFlagsMagicMountain: any;
        SixFlagsMexico: any;
        SixFlagsNewEngland: any;
        SixFlagsOverGeorgia: any;
        SixFlagsOverTexas: any;
        SixFlagsStLouis: any;
        SixFlagsWhiteWaterAtlanta: any;
        TheGreatEscape: any;
        ThorpePark: any;
        TokyoDisneyResortDisneySea: any;
        TokyoDisneyResortMagicKingdom: any;
        UniversalIslandsOfAdventure: any;
        UniversalStudiosFlorida: any;
        UniversalStudiosHollywood: any;
        UniversalStudiosSingapore: any;
        UniversalVolcanoBay: any;
        WaltDisneyWorldAnimalKingdom: any;
        WaltDisneyWorldEpcot: any;
        WaltDisneyWorldHollywoodStudios: any;
        WaltDisneyWorldMagicKingdom: any;
    };
    Settings: {
        Cache: {
            del: any;
            get: any;
            ignoreCacheErrors: boolean;
            keys: any;
            reset: any;
            set: any;
            store: {
                del: any;
                get: any;
                keys: any;
                name: string;
                reset: any;
                set: any;
                usePromises: boolean;
            };
            wrap: any;
        };
        DefaultCacheOpeningTimesLength: number;
        DefaultCacheWaitTimesLength: number;
        DefaultDateFormat: string;
        DefaultOpenTimeout: number;
        DefaultParkName: string;
        DefaultParkTimeFormat: any;
        DefaultParkTimezone: string;
        DefaultReadTimeout: number;
        DefaultScheduleDays: number;
        DefaultTimeFormat: string;
        ProxyURL: any;
    };
};
