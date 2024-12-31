import BusStopInterface from "./BusStopInterface";

export default interface BusRouteInterface {
  Origin: BusStopInterface;
  Destination: BusStopInterface;
  BusStops: BusStopInterface[];
}
