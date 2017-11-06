import themeparks = require("themeparks");

// $ExpectType typeof Park
themeparks.Parks.AltonTowers;

// $ExpectType Park
new themeparks.Parks.DisneylandParisMagicKingdom();

const park = new themeparks.Parks.DisneylandParisMagicKingdom();

// $ExpectType string
park.Name;

// $ExpectType string
park.Timezone;

// $ExpectType GeoLocation
park.Location;

// $ExpectType boolean
park.SupportsWaitTimes;

// $ExpectType boolean
park.SupportsOpeningTimes;

// $ExpectType boolean
park.SupportsRideSchedules;

// $ExpectType boolean
park.FastPass;

// $ExpectType boolean
park.FastPassReturnTimes;

// $ExpectType Schedule
park.Schedule;

// $ExpectType number
park.ScheduleDays;

// $ExpectType string
park.TimeNow();

// $ExpectType string
park.DateNow();

park.GetWaitTimes((err, data) => {
  // $ExpectType Error
  err;

  // $ExpectType RideData[]
  data;

  // $ExpectType string | number
  data[0].id;

  // $ExpectType string
  data[0].name;

  // $ExpectType boolean
  data[0].active;

  // $ExpectType number
  data[0].waitTime;

  // $ExpectType boolean
  data[0].fastPass;

  // $ExpectType number | undefined
  data[0].lastUpdate;

  // $ExpectType RideStatus
  data[0].status;

  // $ExpectType ScheduleData | undefined
  data[0].schedule;

  // $ExpectType { startTime: string; endTime: string; lastUpdate: number | undefined; } | undefined
  data[0].fastPassReturnTime;
});

// $ExpectType Ride | null
park.FindRideObject({ id: "test" });

const ride = park.FindRideObject({ id: "test" });

if (ride !== null) {
  // $ExpectType string
  ride.Name;

  // $ExpectType number
  ride.WaitTime;

  // $ExpectType boolean | undefined
  ride.FastPassReturnTimeAvailable;

  // $ExpectType string
  ride.FastPassReturnTimeStart;

  // $ExpectType string
  ride.FastPassReturnTimeEnd;

  // $ExpectType boolean
  ride.Active;

  // $ExpectType RideStatus
  ride.Status;

  // $ExpectType number | undefined
  ride.LastUpdate;

  // $ExpectType Schedule
  ride.Schedule;
}

park.GetOpeningTimes((error, data) => {
  // $ExpectType Error
  error;

  // $ExpectType ScheduleData[]
  data;

  // $ExpectType Moment
  data[0].date;

  // $ExpectType Moment
  data[0].openingTime;

  // $ExpectType Moment
  data[0].closingTime;

  // $ExpectType ScheduleType
  data[0].type;
});
