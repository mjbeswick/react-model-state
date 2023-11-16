import { FC, useReducer } from 'react';
import { ItemModel } from './itemModel';
import { Model } from './model';

import './style.css';

const itemModel = new ItemModel();

const useModelPropety = <T>(model: Model<T>) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffec(() => {
    model.subscribe(dispatch);
  });
};

export const App: FC<{ name: string }> = ({ name }) => {
  const {} = useModel(itemModel);

  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
};
