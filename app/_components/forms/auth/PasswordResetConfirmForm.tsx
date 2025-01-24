'use client'

import React from 'react';
import Form from './Form';
import { ConfirmPasswordSchema, ConfirmPasswordFormSchema } from '@/app/validators/auth'
import { useAuth } from '@/app/hooks/useAuth';


type FieldFormValid = ConfirmPasswordFormSchema;

interface Props {
  uid: string;
  token: string;
}

const PasswordResetConfirmForm = ({ uid, token }: Props) => {
  const { resetPasswordConfirm, isLoading } = useAuth();

  const fields = [
    { name: 'new_password', label: 'Senha', type: 'password' },
    { name: 're_new_password', label: 'Confirmar senha', type: 'password' },
  ];

  const handleFormSubmit = (data: FieldFormValid) => {

    const submitData = {
      uid: uid,
      token: token,
      new_password: data.new_password,
      re_new_password: data.re_new_password
    }
    resetPasswordConfirm(submitData)
  };

  return (
    <div className="p-4">
      <Form<FieldFormValid>
        schema={ConfirmPasswordSchema}
        onSubmit={handleFormSubmit}
        fields={fields}
        isLoading={isLoading}
        title='Cadastro nova senha'
      />
    </div>
  );
};

export default PasswordResetConfirmForm;