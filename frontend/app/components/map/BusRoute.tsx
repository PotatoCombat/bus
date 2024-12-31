import BusRouteInterface from "@/app/types/BusRouteInterface";
import { useRef, useState } from "react";
import { Marker, Polyline } from "react-native-maps";

const getBusStopLatLng = function(busStop: any) {
  return {latitude: busStop.Latitude, longitude: busStop.Longitude};
}

export default function BusRoute(
  {
    busRoute,
    onSelectBusStop,
    onDeselectBusStop
  }: {
    busRoute: BusRouteInterface,
    onSelectBusStop?: (busStopCode: string) => void,
    onDeselectBusStop?: (busStopCode: string) => void
  }
) {
  const [selectedBusStop, setSelectedBusStop] = useState<string>();
  const deselectPending = useRef(false);

  const selectBusStop = function (busStopCode: string) {
    deselectPending.current = false;
    setSelectedBusStop(busStopCode);
    onSelectBusStop?.(busStopCode);
  };

  const deselectBusStop = function (busStopCode: string) {
    deselectPending.current = true;
    setSelectedBusStop((prevBusStop) => {
      Promise.resolve().then(() => {
        if (deselectPending.current && prevBusStop === busStopCode) {
          deselectPending.current = false;
          onDeselectBusStop?.(busStopCode);
        }
      });
      return '';
    });
  };

  return (
    <>
      {busRoute.Destination &&
        <Marker
          key={'destination'}
          coordinate={getBusStopLatLng(busRoute.Destination)}
          tappable={false}
        />
      }
      {busRoute.BusStops.map((busStop, index) => (
        <Marker
          key={index}
          coordinate={getBusStopLatLng(busStop)}
          title={busStop.Description}
          description={busStop.RoadName}
          image={
            (selectedBusStop === busStop.BusStopCode)
              ? require('@/assets/images/circle-purple.png')
              : require('@/assets/images/circle-red.png')
          }
          anchor={{x: 0.5, y: 0.5}} // Centre of image (1/2 width, 1/2 height)
          onSelect={() => selectBusStop(busStop.BusStopCode)}
          onDeselect={() => deselectBusStop(busStop.BusStopCode)}
        >
        </Marker>
      ))}
      <Polyline
        coordinates={busRoute.BusStops.map(getBusStopLatLng)}
        strokeColor="#AA0000"
        strokeWidth={6}
      />
    </>
  );
};
