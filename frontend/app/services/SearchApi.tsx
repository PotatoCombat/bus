import BusRouteInterface from "../types/BusRouteInterface";
import SearchResultInterface from "../types/SearchResultInterface";
import { BUS_ROUTES_URL, SERVICE_NO_PARAM } from "./urls";

export default async function searchApi(
  serviceNo: string
): Promise<SearchResultInterface[]> {
  try {
    const response = await fetch(`${BUS_ROUTES_URL}?${SERVICE_NO_PARAM}=${serviceNo}`);

    if (response.status == 404) {
      return new Promise((resolve) => {
        resolve([]);
      });
    } else if (!response.ok) {
      throw new Error(`${response.status.toString()}: ${await response.text()}`);
    }

    const data = await response.json();

    const searchResults: SearchResultInterface[] = [];
    data.Routes.forEach((route: BusRouteInterface) => {
      searchResults.push({
        serviceNo,
        originRoadName: route.OriginCode,
        destinationRoadName: route.DestinationCode,
      });
    });

    return new Promise((resolve) => {
      resolve(searchResults);
    });
  } catch (error) {
    console.error("Error fetching bus data:", error);

    return new Promise((resolve) => {
      resolve([]);
    });
  }
}
