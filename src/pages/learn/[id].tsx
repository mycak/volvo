import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CarCard from "../../components/CarCard";
import { useVehicles } from "../../conext/VehiclesContext";
import { VehicleType } from "../../types";

const LearnPage: NextPage = () => {
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const { vehicles } = useVehicles();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query) {
      setVehicle(vehicles.find((item) => item.id === router.query.id) || null);
    }
  }, [router, vehicles]);

  return (
    <div className="flex h-screen flex-col justify-center">
      <div className="max-w-6xl mx-auto flex flex-col">
        {vehicle && <CarCard basic data={vehicle} />}
      </div>
    </div>
  );
};

export default LearnPage;
