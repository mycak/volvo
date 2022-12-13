import React, { createContext, useContext, useEffect, useState } from "react";
import { useFilters } from "../hooks/useFilters";
import { VehicleType } from "../types";

interface IVehicleContext {
  vehicles: VehicleType[];
  vehiclesToRender: VehicleType[];
}

const VehiclesContext = createContext<IVehicleContext>({
  vehicles: [],
  vehiclesToRender: [],
});

/**
 * Provider
 */
const VehiclesContextProvider = (props: any) => {
  const [vehicles, setVehicles] = useState<VehicleType[] | []>([]);
  const { filters } = useFilters();

  const [vehiclesToRender, setVehiclesToRender] = useState<VehicleType[] | []>(
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT_V2 as string, {
      signal,
    })
      .then((res) => res.json())
      .then((data) => setVehicles(data));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (vehicles) {
      setVehiclesToRender(
        vehicles.filter((item: VehicleType) =>
          item.bodyType.includes(filters.bodyType)
        )
      );
    }
  }, [filters, vehicles]);

  return (
    <VehiclesContext.Provider
      value={{ vehiclesToRender, vehicles }}
      {...props}
    />
  );
};

const useVehicles = () => {
  const context = useContext(VehiclesContext);

  if (context === undefined) {
    throw new Error("useVehicles must be used within a AuthProvider");
  }

  return context;
};

export { VehiclesContextProvider, useVehicles };
