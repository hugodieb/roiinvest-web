'use client'

import React from 'react';
import Form from './Form';
import { emailSchema, EmailFormSchema } from '@/app/validators/auth'
import { useAuth } from '@/app/hooks/useAuth';


type FieldFormValid = EmailFormSchema;

const PasswordResetForm = () => {
  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
  ];

  const handleFormSubmit = (data: FieldFormValid) => {
    resetPassword(data)
  };

  const { resetPassword, isLoading } = useAuth();

  return (
    <div className="p-4">
      <Form<FieldFormValid>
        schema={emailSchema}
        onSubmit={handleFormSubmit}
        fields={fields}
        isLoading={isLoading}
        title='Esqueci minha senha'
      />
    </div>
  );
};

export default PasswordResetForm;