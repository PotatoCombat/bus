import { useState } from "react";
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
    busRoute: Array<any>,
    onSelectBusStop?: (busStopCode: string) => void,
    onDeselectBusStop?: (busStopCode: string) => void
  }
) {
  const [selectedBusStop, setSelectedBusStop] = useState<string>();

  const selectBusStop = function(busStopCode: string) {
    setSelectedBusStop(busStopCode);
    onSelectBusStop?.(busStopCode);
  }

  const deselectBusStop = function(busStopCode: string) {
    setSelectedBusStop('');
    onDeselectBusStop?.(busStopCode);
  }

  return (
    <>
      {busRoute.at(-1) &&
        <Marker
          key={'destination'}
          coordinate={getBusStopLatLng(busRoute.at(-1))}
          tappable={false}
        />
      }
      {busRoute.map(busStop => (
        <Marker
          key={busStop.BusStopCode}
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
        coordinates={busRoute.map(getBusStopLatLng)}
        strokeColor="#AA0000"
        strokeWidth={6}
      />
    </>
  );
};
