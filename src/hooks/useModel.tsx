import { useReducer, useEffect } from 'react';
import { Model } from '../lib/model';

export function useModel<T extends Model>(model: T) {
  const [, dispatch] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    model.subscribe(dispatch);
  }, [model]);

  return model;
}
