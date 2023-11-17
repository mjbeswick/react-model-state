import { FC } from 'react';
import { useModel } from './hooks/useModel';
import { useInput } from './hooks/useInput';

import './App.css';
import { Model } from './lib/model';

class ItemModel extends Model {
  public items: string[] = [];

  public addItem(name: string) {
    this.items.push(name);
  }

  public removeItem(name: string) {
    this.items = this.items.filter((item) => item !== name);
  }
}

const itemModel = new ItemModel();

export const App: FC<{ name: string }> = ({ name }) => {
  const nameField = useInput('');
  const { items, addItem, removeItem } = useModel(itemModel);

  const handleAddItem = () => {
    addItem(nameField.value);
    nameField.setValue('');
  };

  const handleRemoveItem = (item: string) => {
    removeItem(item);
  };

  const isDisabled = nameField.value === '' || items.includes(nameField.value);

  return (
    <div>
      <h1>To Do List for</h1>
      <ul className="list">
        {items.map((item) => (
          <li key={item} className="item">
            {item}
            <button onClick={() => handleRemoveItem(item)}>Remove</button>
          </li>
        ))}
        {items.length === 0 && <li className="item">All done!</li>}
      </ul>
      <div className="new-item">
        <input
          type="text"
          {...nameField}
          required
          placeholder="Add something..."
        />
        <button onClick={handleAddItem} disabled={isDisabled}>
          Add
        </button>
      </div>
    </div>
  );
};
