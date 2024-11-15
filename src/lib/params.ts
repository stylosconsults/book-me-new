export function createQueryParams(params: any) {
    const query = Object.keys(params)
      .reduce((acc, key) => {
        // @ts-ignore
        if (params[key]) {
          // @ts-ignore
          acc.push(`${key}=${params[key]}`)
        }
        return acc
      }, [])
      .join('&')
    return query
  }
  