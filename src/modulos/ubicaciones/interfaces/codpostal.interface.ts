export interface MapboxPostalCodeResponse {
  features: {
    geometry: {
      coordinates: [number, number];
    };
    properties?: {
      context?: {
        country?: {
          name?: string;
        };
        region?: {
          name?: string;
        };
        place?: {
          name?: string;
        };
      };
    };
  }[];
}
