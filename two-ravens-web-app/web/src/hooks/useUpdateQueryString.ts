import { useCallback } from 'react';

import { omit } from 'lodash';
import { parse, stringify } from 'query-string';

import { navigate, useLocation } from '@redwoodjs/router';

export default function useUpdateQueryString() {
  const { search, pathname } = useLocation();
  const updateQueryString = useCallback(
    (query: Record<string, unknown>) => {
      const existingSearch = parse(search);
      const keysToRemove = Object.keys(query).filter((k) => query[k] === null);
      const newQuery = omit({ ...existingSearch, ...query }, keysToRemove);
      navigate(`${pathname}?${stringify(newQuery)}`);
    },
    [pathname, search]
  );
  return updateQueryString;
}
