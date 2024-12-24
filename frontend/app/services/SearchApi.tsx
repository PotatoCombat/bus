import BusRouteInterface from "../types/BusRouteInterface";
import SearchResultInterface from "../types/SearchResultInterface";
import busStopApi from "./BusStopApi";
import { BUS_ROUTES_URL, SERVICE_NO_PARAM } from "./urls";

export default async function searchApi(
  serviceNo: string
): Promise<SearchResultInterface[]> {
  try {
    const response = await fetch(
      `${BUS_ROUTES_URL}?${SERVICE_NO_PARAM}=${serviceNo}`
    );

    if (response.status == 404) {
      return new Promise((resolve) => {
        resolve([]);
      });
    } else if (!response.ok) {
      throw new Error(
        `${response.status.toString()}: ${await response.text()}`
      );
    }

    const data = await response.json();

    return Promise.all(
      data.Routes.map(async (route: BusRouteInterface) => ({
        serviceNo,
        originRoadName: (await busStopApi(route.OriginCode))?.RoadName,
        destinationRoadName: (await busStopApi(route.DestinationCode))
          ?.RoadName,
      }))
    );
  } catch (error) {
    console.error("Error fetching bus data:", error);

    return new Promise((resolve) => {
      resolve([]);
    });
  }
}
