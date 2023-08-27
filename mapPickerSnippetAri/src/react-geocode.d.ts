declare module 'react-geocode' {
    export function setApiKey(apiKey: string): void;
    export function fromLatLng(lat: number, lng: number): Promise<any>;
  }
  