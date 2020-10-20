import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';

import Modal from '../Modal';
import IFoodExtra from '../@types/foodExtra';
import getValidationErrors from '../../utils/getValidationErrors';
import { Form } from './styles';
import { useToast } from '../../hooks/toast';
import { Input } from '../form';

interface ICreateFoodExtraData {
  name: string;
  value: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddExtra: (extra: Omit<IFoodExtra, 'id'>) => void;
}

const ModalAddExtra: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddExtra,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ICreateFoodExtraData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          value: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        // add function
        handleAddExtra(data);
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
    [addToast, setIsOpen, handleAddExtra],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Extra</h1>

        <Input name="name" label="Nome do extra" placeholder="Bacon" />
        <Input name="value" label="Valor" placeholder="Ex: 5.59" />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Extra</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddExtra;
