// Type definitions for themeparks 4.6
// Project: https://github.com/cubehouse/themeparks#readme
// Definitions by: Jonathan Harrison <https://github.com/JonJam>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as moment from "moment";
import cacheManger = require("cache-manager");

export = themeparks;

type ParkClass = typeof Park;
type WaitTimesResult = RideData[];
type OpeningTimesResult = ScheduleData[];

declare enum RideStatus {
  "Operating",
  "Down",
  "Closed",
  "Refurbishment"
}

declare enum ScheduleType {
  "Operating",
  "Closed"
}

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
    // This is an implementation of Cache from cache-manager.
    Cache: any;
    DefaultCacheOpeningTimesLength: number;
    DefaultCacheWaitTimesLength: number;
    DefaultDateFormat: string;
    DefaultOpenTimeout: number;
    DefaultParkName: string;
    DefaultParkTimeFormat: string | null;
    DefaultParkTimezone: string;
    DefaultReadTimeout: number;
    DefaultScheduleDays: number;
    DefaultTimeFormat: string;
    ProxyURL: string | null;
  };
};

// Source: https://github.com/cubehouse/themeparks/blob/master/lib/park.js
declare class Park {
  constructor(options?: {
    name?: string;
    timezone?: string;
    timeFormat?: string;
    dateFormat?: string;
    cacheWaitTimesLength?: number;
    cacheOpeningTimesLength?: number;
    latitude?: number;
    longitude?: number;
    useragent?: string;
    scheduleDaysToReturn?: number;
  });

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

  TimeNow: (
    timeFormatObject?: {
      timeFormat?: string;
    }
  ) => string;

  DateNow: (
    dateFormatObject?: {
      dateFormat?: string;
    }
  ) => string;

  // Data will be null if error is present.
  GetWaitTimes: (
    callback?: (error: Error, data: WaitTimesResult) => void
  ) => Promise<WaitTimesResult>;

  GetWaitTimesPromise: () => Promise<WaitTimesResult>;

  // Fetch the ride data for the requested ID. If it doesn't exist, add a new ride to our park's ride set
  GetRideObject: (
    ride: {
      id: string;
      name: string;
    }
  ) => Ride | null;

  // Fetch the ride data for the requested ID. If it doesn't exist, returns null
  FindRideObject: (
    ride: {
      id: string;
    }
  ) => Ride | null;

  // Data will be null if error is present.
  GetOpeningTimes: (
    callback?: (error: Error, data: OpeningTimesResult) => void
  ) => Promise<OpeningTimesResult>;

  GetOpeningTimesPromise: () => Promise<OpeningTimesResult>;
}

// Source: https://github.com/cubehouse/themeparks/blob/master/lib/geoLocation.js
declare class GeoLocation {
  constructor(location: { longitude?: number; latitude?: number });

  // There are actually implemented as get only Accessors but TypeScript doesn't support
  // these in declaration files: https://github.com/Microsoft/TypeScript/issues/10969#issuecomment-248192537
  Latitude: string;
  LatitudeRaw: number;
  Longitude: string;
  LongitudeRaw: number;

  static RandomBetween: (
    locationA: GeoLocation,
    locationB: GeoLocation
  ) => GeoLocation;

  toGoogleMaps: () => string;
  toString: () => string;
}

// https://github.com/cubehouse/themeparks/blob/master/lib/schedule.js
declare class Schedule {
  constructor(scheduleConfig?: { dateFormat?: string; timeFormat?: number });

  // There are actually implemented as get only Accessors but TypeScript doesn't support
  // these in declaration files: https://github.com/Microsoft/TypeScript/issues/10969#issuecomment-248192537
  IsDirty: boolean;

  toJSON: () => ScheduleRaw;
  fromJSON: (scheduleData: ScheduleRaw) => void;

  SetDate: (
    scheduleData: {
      date?: moment.Moment | string;
      openingTime?: moment.Moment | string;
      closingTime?: moment.Moment | string;
      specialHours?: boolean;
      type?: ScheduleType;
    }
  ) => boolean;

  SetRange: (
    scheduleData: {
      startDate?: moment.Moment | string;
      endDate?: moment.Moment | string;
      openingTime?: moment.Moment | string;
      closingTime?: moment.Moment | string;
      specialHours?: boolean;
      type?: ScheduleType;
    }
  ) => boolean;

  GetDate: (
    dateDate: {
      date?: moment.Moment | string;
    }
  ) => ScheduleData | boolean;

  GetDateRange: (
    dateData: {
      startDate?: moment.Moment | string;
      endDate?: moment.Moment | string;
    }
  ) => ScheduleData[];
}

// https://github.com/cubehouse/themeparks/blob/master/lib/ride.js
declare class Ride {
  constructor(options: { ride_id?: string; ride_name?: number });

  // There are actually implemented as get only Accessors but TypeScript doesn't support
  // these in declaration files: https://github.com/Microsoft/TypeScript/issues/10969#issuecomment-248192537
  Name: string;
  WaitTime: number;
  FastPass: boolean;
  FastPassReturnTimeAvailable: boolean | undefined;
  // The set for this is a moment
  FastPassReturnTimeStart: string;
  // The set for this is a moment.
  FastPassReturnTimeEnd: string;
  Active: boolean;
  Status: RideStatus;
  LastUpdate: number | undefined;
  Schedule: Schedule;

  toJSON: () => RideData;
  fromJSON: (rideData: RideData) => void;
}

interface RideData {
  id: string | number;
  name: string;
  active: boolean;
  waitTime: number;
  fastPass: boolean;
  lastUpdate: number | undefined;
  status: RideStatus;
  schedule?: ScheduleData;
  fastPassReturnTime?: {
    startTime: string;
    endTime: string;
    lastUpdate: number | undefined;
  };
}

interface ScheduleRaw {
  dates: Map<number, ScheduleData>;
  datesSpecial: Map<number, SpecialScheduleData[]>;
}

interface ScheduleData {
  date: string;
  openingTime: string;
  closingTime: string;
  type: ScheduleType;
  special?: SpecialScheduleData[];
}

interface SpecialScheduleData {
  openingTime: string;
  closingTime: string;
  type: string;
}
