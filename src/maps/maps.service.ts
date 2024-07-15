import { Injectable } from "@nestjs/common";

@Injectable()
export class MapsService {

    async readMaps() {
        const maps={ apiKey: process.env.GOOGLE_MAPS_API_KEY }
        return maps;
      }
}