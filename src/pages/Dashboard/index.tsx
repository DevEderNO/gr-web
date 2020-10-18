import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';
import { useToast } from '../../hooks/toast';

interface IFoodPlate {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      api.get('/foods').then(response => {
        setFoods(response.data);
      });
    }

    loadFoods();
  }, []);

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    const { image_url } = food;
    try {
      api
        .post('foods', {
          ...food,
          available: true,
          thumbnail_url: image_url,
          extras: [],
        })
        .then(response => {
          setFoods(state => [...state, response.data]);
        });

      addToast({
        type: 'success',
        title: 'Prato cadastrado com sucesso!',
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    // TODO UPDATE A FOOD PLATE ON THE API
    const { id, available, image_url } = editingFood;
    api
      .put(`/foods/${id}`, { id, available, thumbnail_url: image_url, ...food })
      .then(response => {
        const itemIndex = foods.findIndex(stateItem => stateItem.id === id);
        const foodsCloned = [...foods];

        foodsCloned[itemIndex] = response.data;
        setFoods(foodsCloned);
      });
  }

  async function handleDeleteFood(id: number): Promise<void> {
    api.delete(`foods/${id}`).then(() => {
      setFoods(state => state.filter(stateItem => stateItem.id !== id));
      addToast({
        type: 'success',
        title: 'Prato removido com sucesso!',
      });
    });
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
