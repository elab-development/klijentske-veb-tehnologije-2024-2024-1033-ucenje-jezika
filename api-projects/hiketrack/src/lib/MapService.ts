export class MapService {
  static getMapConfig(lat: number, lon: number) {
    return {
      center: [lat, lon] as [number, number],
      zoom: 13,
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };
  }
}
