import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Column, Form, Row } from './styles';
import Modal from '../Modal';
import Input from '../form/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import Select from '../form/Select';
import ICategory from '../@types/categories';
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

interface ICreateFoodData {
  name: string;
  image_url: string;
  price: string;
  category: number;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const formRef = useRef<FormHandles>(null);

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
    async (data: ICreateFoodData) => {
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

        handleAddFood(data);
        setIsOpen();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar prato.',
          description:
            'Ocorreu um erro ao cadastrar o prato, tente novamente mais tarde',
        });
        throw new Error(error.message);
      }
    },
    [handleAddFood, setIsOpen, addToast],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
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
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
