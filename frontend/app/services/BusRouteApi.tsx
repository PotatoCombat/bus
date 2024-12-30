import BusRoutesInterface from "@/app/types/BusRoutesInterface";
import { BUS_ROUTES_URL, SERVICE_NO_PARAM } from "./urls";

export default async function busRouteApi(
  busNumber: string
): Promise<BusRoutesInterface> {
  try {
    const response = await fetch(
      `${BUS_ROUTES_URL}?${SERVICE_NO_PARAM}=${busNumber}`
    );

    if (!response.ok) {
      throw new Error(
        `${response.status.toString()}: ${await response.text()}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching bus data:", error);

    return {
        ServiceNo: busNumber,
        Routes: [],
    };
  }
}
