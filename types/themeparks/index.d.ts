// Type definitions for themeparks 4.6
// Project: https://github.com/cubehouse/themeparks#readme
// Definitions by: Jonathan Harrison <https://github.com/JonJam>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = themeparks;

type ParkClass = typeof Park;
// TODO Check these return types
type WaitTimesResult = WaitTimes[] | null;
type OpeningTimesResult = OpeningTimes[] | null;

declare const themeparks: {
    AllParks: ParkClass[];
    Parks: {
        AltonTowers: ParkClass;
        AsterixPark: ParkClass;
        BuschGardensTampaBay: ParkClass;
        BuschGardensWilliamsburg: ParkClass;
        CanadasWonderland: ParkClass;
        Carowinds: ParkClass;
        CedarPoint: ParkClass;
        ChessingtonWorldOfAdventures: ParkClass;
        DisneylandParisMagicKingdom: ParkClass;
        DisneylandParisWaltDisneyStudios: ParkClass;
        DisneylandResortCaliforniaAdventure: ParkClass;
        DisneylandResortMagicKingdom: ParkClass;
        Efteling: ParkClass;
        EuropaPark: ParkClass;
        HersheyPark: ParkClass;
        HongKongDisneyland: ParkClass;
        KingsIsland: ParkClass;
        KnottsBerryFarm: ParkClass;
        LaRondeMontreal: ParkClass;
        SeaworldOrlando: ParkClass;
        SeaworldSanAntonio: ParkClass;
        SeaworldSanDiego: ParkClass;
        SesamePlace: ParkClass;
        ShanghaiDisneyResortMagicKingdom: ParkClass;
        SixFlagsAmerica: ParkClass;
        SixFlagsDiscoveryKingdom: ParkClass;
        SixFlagsFiestaTexas: ParkClass;
        SixFlagsGreatAdventure: ParkClass;
        SixFlagsGreatAmerica: ParkClass;
        SixFlagsHurricaneHarborArlington: ParkClass;
        SixFlagsHurricaneHarborJackson: ParkClass;
        SixFlagsHurricaneHarborLosAngeles: ParkClass;
        SixFlagsMagicMountain: ParkClass;
        SixFlagsMexico: ParkClass;
        SixFlagsNewEngland: ParkClass;
        SixFlagsOverGeorgia: ParkClass;
        SixFlagsOverTexas: ParkClass;
        SixFlagsStLouis: ParkClass;
        SixFlagsWhiteWaterAtlanta: ParkClass;
        TheGreatEscape: ParkClass;
        ThorpePark: ParkClass;
        TokyoDisneyResortDisneySea: ParkClass;
        TokyoDisneyResortMagicKingdom: ParkClass;
        UniversalIslandsOfAdventure: ParkClass;
        UniversalStudiosFlorida: ParkClass;
        UniversalStudiosHollywood: ParkClass;
        UniversalStudiosSingapore: ParkClass;
        UniversalVolcanoBay: ParkClass;
        WaltDisneyWorldAnimalKingdom: ParkClass;
        WaltDisneyWorldEpcot: ParkClass;
        WaltDisneyWorldHollywoodStudios: ParkClass;
        WaltDisneyWorldMagicKingdom: ParkClass;
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

// TODO test this
// Source: https://github.com/cubehouse/themeparks/blob/master/lib/park.js
declare class Park {
    constructor();
    
    // There are actually implemented as get only Accessors but TypeScript doesn't support
    // these in declaration files: https://github.com/Microsoft/TypeScript/issues/10969#issuecomment-248192537
    Name: string;
    Timezone: string;
    Location: GeoLocation;
    SupportsWaitTimes: boolean;
    SupportsOpeningTimes: boolean;
    SupportsRideSchedules: boolean;
    FastPass: boolean;
    FastPassReturnTimes: boolean;
    UserAgent: string;
    Schedule: Schedule;
    ScheduleDays: number;

    TimeNow: (timeFormatObject?: {
        timeFormat?: string
    }) => string;

    DateNow: (dateFormatObject?: {
        dateFormat ?: string
    }) => string;

    GetWaitTimes : (callback?: (error : Error, data: WaitTimesResult) => void) => Promise<WaitTimesResult>;

    GetWaitTimesPromise : () => Promise<WaitTimesResult>;

    /** 
     * Fetch the ride data for the requested ID. If it doesn't exist, add a new ride to our park's ride set
     */
    GetRideObject : (ride?: {
        id: string;
        name: string
    }) => Ride;

    /**
    * Fetch the ride data for the requested ID. If it doesn't exist, returns null
    */
    FindRideObject: (ride?: {
        id: string;     
    }) => Ride | null;

    GetOpeningTimes : (callback?: (error : Error, data: OpeningTimesResult) => void) => Promise<OpeningTimesResult>;

    GetOpeningTimesPromise : () => Promise<OpeningTimesResult>;
}

// TODO Test this works 
// Source: https://github.com/cubehouse/themeparks/blob/master/lib/geoLocation.js
declare class GeoLocation {
    constructor(location: {
        longitude?: number;
        latitude?: number;
    });

    // There are actually implemented as get only Accessors but TypeScript doesn't support
    // these in declaration files: https://github.com/Microsoft/TypeScript/issues/10969#issuecomment-248192537
    Latitude : string;
    LatitudeRaw: number;
    Longitude: string;
    LongitudeRaw: number;

    static RandomBetween: (locationA: GeoLocation, locationB: GeoLocation) => GeoLocation

    toGoogleMaps: () => string;
    toString: () => string;
}

// https://github.com/cubehouse/themeparks/blob/master/lib/schedule.js
declare class Schedule {
    constructor(scheduleConfig?: {
        dateFormat?: string;
        timeFormat ?: number;
    });

    // There are actually implemented as get only Accessors but TypeScript doesn't support
    // these in declaration files: https://github.com/Microsoft/TypeScript/issues/10969#issuecomment-248192537
    IsDirty : boolean;

    toJSON : () => ScheduleData2;
    fromJSON : (scheduleData: ScheduleData2) => void;

    SetDate: ({
        date? : Moment | string;
        openingTime? : Moment | string;
        closingTime? : Moment | string;
        specialHours? : boolean;
        type? : string; 
    }) => boolean;

    SetRange: ({
        startDate? : Moment | string;
        endDate ? : Moment | string;
        openingTime? : Moment | string;
        closingTime? : Moment | string;
        specialHours ? : boolean;
        type? : string; 
    }) => boolean;

    GetDate: ({
        date? : Moment | string;
    }) => ScheduleData;

    GetDateRange: ({
        startDate? : Moment | string;
        endDate? : Moment | string;
    }) => ScheduleData;
}

declare interface ScheduleData {
    date : Moment;
    openingTime : Moment;
    closingTime : Moment;
    type : string; 
    special: ;
}