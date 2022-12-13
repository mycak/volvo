import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

const Filter: FC = () => {
  const router = useRouter();
  const DELAY = 1000;
  const [bodyType, setBodyType] = useState<string>("");

  useEffect(() => {
    if (router.isReady && "filters" in router.query) {
      const values = JSON.parse(router.query.filters as string);
      setBodyType(values.bodyType);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const search = setTimeout(() => {
      if (router.isReady && bodyType !== null) {
        router.replace({
          query: {
            ...router.query,
            filters: JSON.stringify({
              bodyType,
            }),
          },
        });
      }
    }, DELAY);

    return () => clearTimeout(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyType]);

  return (
    <div className="mx-auto mb-10">
      <label>
        Body type
        <input
          type="text"
          className="bg-gray-200 pl-2 ml-2 max-w-[120px]"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBodyType(e.target.value)
          }
          placeholder="Brand"
          value={bodyType}
        />
      </label>
    </div>
  );
};

export default Filter;
