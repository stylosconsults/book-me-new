// convert object to query params
export const objectToQueryParams = (obj: { [key: string]: string | number | undefined }) => {
    const params = Object.entries(obj)
      .filter(([_, value]) => Boolean(value))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`);
  
    return params.join('&');
  };
  
  // convert query params to object
  export const queryParamsToObject = (query: string) => {
    const obj: any = {};
    const params = new URLSearchParams(query);
    params.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };
  