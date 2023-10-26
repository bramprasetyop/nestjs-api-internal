export interface GeographicCoordinate {
  lat: number;
  lng: number;
}

// equatorial mean radius of Earth (in km)
const R = 6371;

/**
 * calculates distance using haversine formula
 * @returns Distance in km
 */
export function distanceBetweenGeographicCoordinates(
  coordinate1: GeographicCoordinate,
  coordinate2: GeographicCoordinate
): number {
  // convert to radians
  coordinate1.lng = (coordinate1.lng * Math.PI) / 180;
  coordinate2.lng = (coordinate2.lng * Math.PI) / 180;
  coordinate1.lat = (coordinate1.lat * Math.PI) / 180;
  coordinate2.lat = (coordinate2.lat * Math.PI) / 180;

  // haversine formula
  let dlng = coordinate2.lng - coordinate1.lng;
  let dlat = coordinate2.lat - coordinate1.lat;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(coordinate1.lat) *
      Math.cos(coordinate2.lat) *
      Math.pow(Math.sin(dlng / 2), 2);

  return 2 * Math.asin(Math.sqrt(a)) * R;
}
