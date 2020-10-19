import { useField } from '@unform/core';
import React, { TextareaHTMLAttributes } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error, LabelInput } from './styles';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  label?: string;
}

const TextArea: React.FC<ITextareaProps> = ({
  name,
  icon: Icon,
  label,
  rows = 2,
  ...rest
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!textAreaRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <LabelInput htmlFor={name}>{label}</LabelInput>}
      <Container isFilled={isFilled} isFocused={isFocused} isErrored={!!error}>
        {Icon && <Icon size={20} />}

        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          rows={rows}
          ref={textAreaRef}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default TextArea;
