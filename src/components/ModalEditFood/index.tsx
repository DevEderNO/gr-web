import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form, Column, Row } from './styles';
import Modal from '../Modal';
import Input from '../form/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import Select from '../form/Select';
import ICategory from '../@types/categories';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import TextArea from '../form/TextArea';

interface IFoodPlate {
  id: number;
  name: string;
  image_url: string;
  price: string;
  category: number;
  description: string;
  available: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
  editingFood: IFoodPlate;
}

interface IEditFoodData {
  name: string;
  image_url: string;
  price: string;
  category: number;
  description: string;
}

const ModalEditFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      api.get('/categories').then(response => {
        setCategories(response.data);
      });
    }

    loadCategories();
  }, []);

  const cateriesOptions = useMemo(() => {
    return categories.map(category => {
      return {
        value: category.id,
        label: category.title,
      };
    });
  }, [categories]);

  const handleSubmit = useCallback(
    async (data: IEditFoodData) => {
      // EDIT A FOOD PLATE AND CLOSE THE MODAL
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          image_url: Yup.string().required('Campo obrigatório'),
          price: Yup.string().required('Campo obrigatório'),
          category: Yup.number().required('Campo obrigatório'),
          description: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleUpdateFood(data);
        setIsOpen();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar prato.',
          description:
            'Ocorreu um erro ao atualizar o prato, tente novamente mais tarde',
        });
        throw new Error(error.message);
      }
    },
    [handleUpdateFood, setIsOpen, addToast],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input
          name="image_url"
          label="URL da imagem"
          placeholder="Cole o link aqui"
        />

        <Row>
          <Column width="100%">
            <Input
              name="name"
              label="Nome do prato"
              placeholder="Ex: Moda Italiana"
            />
          </Column>
          <Column>
            <Input name="price" label="Preço" placeholder="Ex: 19.90" />
          </Column>
        </Row>

        <Select name="category" label="Categoria" options={cateriesOptions} />

        <TextArea
          name="description"
          label="Descrição do prato"
          placeholder="Descrição"
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
