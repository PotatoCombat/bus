import BusRouteInterface from "@/app/types/BusRouteInterface";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import { BUS_ROUTES_URL, SERVICE_NO_PARAM } from "./urls";

export default async function searchApi(
  serviceNo: string
): Promise<SearchResultInterface[]> {
  try {
    const response = await fetch(
      `${BUS_ROUTES_URL}?${SERVICE_NO_PARAM}=${serviceNo}`
    );

    if (response.status == 404) {
      return [];
    }
    if (!response.ok) {
      throw new Error(
        `${response.status.toString()}: ${await response.text()}`
      );
    }

    return await response.json()
      .then(data => data.Routes as BusRouteInterface[])
      .then(routes => routes.map(route => ({
        serviceNo: serviceNo,
        originRoadName: route.Origin.RoadName,
        destinationRoadName: route.Destination.RoadName,
      }) as SearchResultInterface));

  } catch (error) {
    console.error("Error fetching bus data:", error);

    return [];
  }
}
