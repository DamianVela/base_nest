export interface MapboxResponse {
  features: {
    geometry: {
      coordinates: [number, number];
    };
  }[];
}
