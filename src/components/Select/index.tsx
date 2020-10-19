import { useField } from '@unform/core';
import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';

import { Container } from './styles';

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: ISelectOptionsProps[];
}

interface ISelectOptionsProps {
  value: number | string;
  label: string;
}

const Select: React.FC<ISelectProps> = ({ name, label, options, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}

      <select
        className="custom-select"
        name={name}
        id={name}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;
