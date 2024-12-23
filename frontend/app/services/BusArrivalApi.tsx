// services/busApi.js

export const fetchBusArrivalData = async (busStopCode: any) => {
    console.log("Fetching bus data...");
    try {
      const response = await fetch(`http://10.0.2.2:3000/bus-arrival?BusStopCode=${busStopCode}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched bus data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching bus data:", error);
      return null;
    }
  };
  