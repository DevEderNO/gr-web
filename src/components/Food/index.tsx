import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import IFood from '../@types/food';

import { Container } from './styles';

interface IProps {
  food: IFood;
  handleDelete: (id: number) => {};
  handleEditFood: (food: IFood) => void;
}

const Food: React.FC<IProps> = ({
  food,
  handleDelete,
  handleEditFood,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(food.available);
  const { addToast } = useToast();

  async function toggleAvailable(): Promise<void> {
    // TODO UPDATE STATUS (available)
    const { id } = food;
    setIsAvailable(state => !state);
    api
      .put(`/foods/${id}`, { ...food, available: !isAvailable })
      .catch(error => {
        throw new Error(error.message);
      });

    addToast({
      type: 'success',
      title: 'Disponibilidade alterada com sucesso!',
    });
  }

  function setEditingFood(): void {
    // TODO - SET THE ID OF THE CURRENT ITEM TO THE EDITING FOOD AND OPEN MODAL
    handleEditFood(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image_url} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <div>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </div>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood()}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
