import BusStopInterface from "../types/BusStopInterface";
import { BUS_STOP_CODE_PARAM, BUS_STOP_URL } from "./urls";

export default async function busStopApi(
  code: string
): Promise<BusStopInterface | null> {
  try {
    const response = await fetch(
      `${BUS_STOP_URL}?${BUS_STOP_CODE_PARAM}=${code}`
    );

    if (!response.ok) {
      throw new Error(
        `${response.status.toString()}: ${await response.text()}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching bus data:", error);

    return new Promise((resolve) => {
      resolve(null);
    });
  }
}
