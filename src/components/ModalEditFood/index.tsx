import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { FiCheckSquare, FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
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
import { ButtonAddExtras, ExtrasTable } from '../ModalAddFood/styles';
import IFoodExtra from '../@types/foodExtra';
import IFood from '../@types/food';
import ModalAddExtra from '../ModalAddExtra';
import ModalEditExtra from '../ModalEditExtra';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Omit<IFood, 'id' | 'available'>) => void;
  editingFood: IFood;
}

interface IEditFoodData {
  name: string;
  image_url: string;
  price: string;
  category: number;
  description: string;
  extras: IFoodExtra[];
}

const ModalEditFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [addExtraModalOpen, setAddExtraModalOpen] = useState(false);
  const [extras, setExtras] = useState<IFoodExtra[]>([]);
  const [editExtraModalOpen, setEditExtraModalOpen] = useState(false);
  const [editingExtra, setEditingExtra] = useState({} as IFoodExtra);
  const { addToast } = useToast();

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      api.get('/categories').then(response => {
        setCategories(response.data);
      });
    }

    loadCategories();
  }, []);

  useEffect(() => {
    setExtras(editingFood.extras || []);

    return () => {
      setExtras([]);
    };
  }, [editingFood.extras, setExtras]);

  function toggleAddExtraModal(): void {
    setAddExtraModalOpen(!addExtraModalOpen);
  }

  function toggleEditExtraModal(): void {
    setEditExtraModalOpen(!editExtraModalOpen);
  }

  const handleEditExtra = useCallback((extra: IFoodExtra) => {
    setEditingExtra(extra);
    setEditExtraModalOpen(true);
  }, []);

  const handleDeleteExtra = useCallback(
    (id: number) => {
      setExtras(state => state.filter(extra => extra.id !== id));
    },
    [setExtras],
  );

  const handleAddExtra = useCallback((extra: Omit<IFoodExtra, 'id'>) => {
    setExtras(state => [...state, { id: state.length, ...extra }]);
  }, []);

  const handleUpdateFoodExtra = useCallback(
    (editedExtra: Omit<IFoodExtra, 'id'>) => {
      setExtras(state =>
        state.map(extra => {
          if (extra.id === editingExtra.id) {
            return { id: editingExtra.id, ...editedExtra };
          }
          return extra;
        }),
      );
    },
    [editingExtra],
  );

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

        handleUpdateFood({ ...data, extras });
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
    [handleUpdateFood, setIsOpen, addToast, extras],
  );

  return (
    <>
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
            <Column width="200px">
              <Input name="price" label="Preço" placeholder="Ex: 19.90" />
            </Column>
          </Row>

          <Select name="category" label="Categoria" options={cateriesOptions} />

          <Row>
            <Column width="100%">
              <span>Extras</span>
            </Column>
            <Column>
              <ButtonAddExtras type="button" onClick={toggleAddExtraModal}>
                <p className="text">Novo</p>
                <div className="icon">
                  <FiPlus size={18} />
                </div>
              </ButtonAddExtras>
            </Column>
          </Row>

          <ExtrasTable>
            <thead>
              <th align="left">Nome</th>
              <th align="right">Valor</th>
              <th align="right">Ações</th>
            </thead>
            {extras.map(extra => (
              <tbody key={extra.id}>
                <td>{extra.name}</td>
                <td align="right">{extra.value}</td>
                <td align="right">
                  <FiEdit onClick={() => handleEditExtra(extra)} />
                  <FiTrash onClick={() => handleDeleteExtra(extra.id)} />
                </td>
              </tbody>
            ))}
          </ExtrasTable>

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
      <ModalAddExtra
        setIsOpen={toggleAddExtraModal}
        isOpen={addExtraModalOpen}
        handleAddExtra={handleAddExtra}
      />
      <ModalEditExtra
        setIsOpen={toggleEditExtraModal}
        isOpen={editExtraModalOpen}
        handleUpdateFoodExtra={handleUpdateFoodExtra}
        editingExtra={editingExtra}
      />
    </>
  );
};

export default ModalEditFood;
