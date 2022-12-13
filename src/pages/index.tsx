import { useResizeObserver } from "@volvo-cars/react-layout-utils";
import clsx from "clsx";
import { NextPage } from "next";
import React, { useState } from "react";
import CarCard from "../components/CarCard";
import { Chevron } from "../components/ChevronIcon";
import Filter from "../components/Filter";
import { useVehicles } from "../conext/VehiclesContext";

const HomePage: NextPage = () => {
  const { vehiclesToRender } = useVehicles();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { ref, width } = useResizeObserver();

  const isMobile = width && width < 1024;
  const CAR_PER_VIEW = isMobile ? 1 : 4;

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = vehiclesToRender.length / CAR_PER_VIEW - 1;
    } else if (newIndex >= vehiclesToRender.length / CAR_PER_VIEW) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className="flex h-screen flex-col justify-center" ref={ref}>
      <div className="max-w-6xl mx-auto flex flex-col">
        <Filter />
        {vehiclesToRender ? (
          <>
            <div className="flex justify-between gap-4">
              {vehiclesToRender
                .slice(activeIndex, activeIndex + CAR_PER_VIEW)
                .map((car) => (
                  <CarCard data={car} key={car.id} />
                ))}
            </div>
            {!isMobile ? (
              <>
                {vehiclesToRender?.length > CAR_PER_VIEW && (
                  <div className="ml-auto mt-8 flex items-center gap-2">
                    <button onClick={() => updateIndex(activeIndex - 1)}>
                      <Chevron circle left />
                    </button>
                    <button onClick={() => updateIndex(activeIndex + 1)}>
                      <Chevron circle />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex gap-2 mx-auto mt-14">
                {[...Array(vehiclesToRender.length)].map((_, item) => (
                  <button key={item} onClick={() => setActiveIndex(item)}>
                    <div
                      className={clsx(
                        activeIndex === item ? "bg-black" : "bg-gray-200",
                        "w-2 h-2 rounded-full"
                      )}
                    ></div>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Any cars...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
