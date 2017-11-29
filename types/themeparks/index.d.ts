// Type definitions for themeparks 4.6
// Project: https://github.com/cubehouse/themeparks#readme
// Definitions by: Jonathan Harrison <https://github.com/JonJam>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

import * as moment from "moment";
import cacheManger = require("cache-manager");

// tslint:disable-next-line:strict-export-declare-modifiers
type WaitTimesResult = RideData[];
// tslint:disable-next-line:strict-export-declare-modifiers
type OpeningTimesResult = ScheduleData[];

export enum RideStatus {
  Operating = "Operating",
  Down = "Down",
  Closed = "Closed",
  Refurbishment = "Refurbishment"
}

export enum ScheduleType {
  Operating = "Operating",
  Closed = "Closed"
}

export interface RideData {
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

export interface ScheduleRaw {
  dates: Map<number, ScheduleData>;
  datesSpecial: Map<number, SpecialScheduleData[]>;
}

export interface ScheduleData {
  date: string;
  openingTime: string;
  closingTime: string;
  type: ScheduleType;
  special?: SpecialScheduleData[];
}

export interface SpecialScheduleData {
  openingTime: string;
  closingTime: string;
  type: string;
}

// Source: https://github.com/cubehouse/themeparks/blob/master/lib/park.js
// As themeparks doesn't export this class using interface to export type only.
export interface Park {
  // tslint:disable-next-line:no-misused-new
  new (options?: {
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
  }): Park;

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
// As themeparks doesn't export this class using interface to export type only.
export interface GeoLocation {
  // tslint:disable-next-line:no-misused-new
  new (location: { longitude?: number; latitude?: number }): GeoLocation;

  // There are actually implemented as get only Accessors but TypeScript doesn't support
  // these in declaration files: https://github.com/Microsoft/TypeScript/issues/10969#issuecomment-248192537
  Latitude: string;
  LatitudeRaw: number;
  Longitude: string;
  LongitudeRaw: number;

  // Interfaces don't allow static methods
  // static RandomBetween: (
  //   locationA: GeoLocation,
  //   locationB: GeoLocation
  // ) => GeoLocation;

  toGoogleMaps: () => string;
  toString: () => string;
}

// https://github.com/cubehouse/themeparks/blob/master/lib/schedule.js
// As themeparks doesn't export this class using interface to export type only.
export interface Schedule {
  // tslint:disable-next-line:no-misused-new
  new (scheduleConfig?: { dateFormat?: string; timeFormat?: number }): Schedule;

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
// As themeparks doesn't export this class using interface to export type only.
export interface Ride {
  // tslint:disable-next-line:no-misused-new
  new (options: { ride_id?: string; ride_name?: number }): Ride;

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

export const AllParks: Park[];

export const Parks: {
  AltonTowers: Park;
  AsterixPark: Park;
  BuschGardensTampaBay: Park;
  BuschGardensWilliamsburg: Park;
  CanadasWonderland: Park;
  Carowinds: Park;
  CedarPoint: Park;
  ChessingtonWorldOfAdventures: Park;
  DisneylandParisMagicKingdom: Park;
  DisneylandParisWaltDisneyStudios: Park;
  DisneylandResortCaliforniaAdventure: Park;
  DisneylandResortMagicKingdom: Park;
  Efteling: Park;
  EuropaPark: Park;
  HersheyPark: Park;
  HongKongDisneyland: Park;
  KingsIsland: Park;
  KnottsBerryFarm: Park;
  LaRondeMontreal: Park;
  SeaworldOrlando: Park;
  SeaworldSanAntonio: Park;
  SeaworldSanDiego: Park;
  SesamePlace: Park;
  ShanghaiDisneyResortMagicKingdom: Park;
  SixFlagsAmerica: Park;
  SixFlagsDiscoveryKingdom: Park;
  SixFlagsFiestaTexas: Park;
  SixFlagsGreatAdventure: Park;
  SixFlagsGreatAmerica: Park;
  SixFlagsHurricaneHarborArlington: Park;
  SixFlagsHurricaneHarborJackson: Park;
  SixFlagsHurricaneHarborLosAngeles: Park;
  SixFlagsMagicMountain: Park;
  SixFlagsMexico: Park;
  SixFlagsNewEngland: Park;
  SixFlagsOverGeorgia: Park;
  SixFlagsOverTexas: Park;
  SixFlagsStLouis: Park;
  SixFlagsWhiteWaterAtlanta: Park;
  TheGreatEscape: Park;
  ThorpePark: Park;
  TokyoDisneyResortDisneySea: Park;
  TokyoDisneyResortMagicKingdom: Park;
  UniversalIslandsOfAdventure: Park;
  UniversalStudiosFlorida: Park;
  UniversalStudiosHollywood: Park;
  UniversalStudiosSingapore: Park;
  UniversalVolcanoBay: Park;
  WaltDisneyWorldAnimalKingdom: Park;
  WaltDisneyWorldEpcot: Park;
  WaltDisneyWorldHollywoodStudios: Park;
  WaltDisneyWorldMagicKingdom: Park;
};

export const Settings: {
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
