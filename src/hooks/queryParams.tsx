import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const updateQueryParams = (key: string, values: number[]) => {
    values.forEach((value) => {
      if (!params.getAll(key).includes(value.toString())) {
        params.append(key, value.toString());
      }
    });

    setSearchParams(params);
  };

  const replaceQueryParam = (key: string, value: number) => {
    params.delete(key);

    if (value) {
      params.set(key, value.toString());
    }

    setSearchParams(params);
  };

  const getQueryParams = (key: string) => {
    const params = new URLSearchParams(searchParams);
    const values = params.getAll(key);
    return values;
  };

  const removeQueryParam = (key: string, value: number) => {
    const values = params.getAll(key).filter((v) => v !== value.toString());
    params.delete(key);
    values.forEach((v) => params.append(key, v));

    setSearchParams(params);
  };

  const clearQueryParams = (keys: Set<string>) => {
    keys.forEach((key) => params.delete(key));

    setSearchParams(params);
  };

  return {
    updateQueryParams,
    replaceQueryParam,
    getQueryParams,
    removeQueryParam,
    clearQueryParams,
  };
};

export default useQueryParams;
