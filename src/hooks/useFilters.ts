import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FiltersType } from "../types";

export const useFilters = () => {
  const initialvalues = {
    bodyType: "",
  };

  const [filters, setFilters] = useState<FiltersType>(initialvalues);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && "filters" in router.query) {
      const values = JSON.parse(router.query.filters as string);
      setFilters(values);
    }
  }, [router]);

  return { filters };
};
