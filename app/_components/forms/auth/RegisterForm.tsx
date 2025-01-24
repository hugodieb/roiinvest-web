import React from 'react';
import Form from './Form'
import { registerSchema, RegisterFormSchema } from '@/app/validators/auth'
import { useAuth } from '@/app/hooks/useAuth';


type FieldFormValid = RegisterFormSchema;

const RegisterForm = () => {
  const fields = [
    { name: 'first_name', label: 'Nome', type: 'text' },
    { name: 'last_name', label: 'Sobrenome', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Senha', type: 'password' },
    { name: 're_password', label: 'Repetir senha', type: 'password' },
  ];

  const handleFormSubmit = (data: FieldFormValid) => {
    newRegister(data)
  };

  const { newRegister, isLoading } = useAuth();

  return (
    <div className="p-4">
      <Form<FieldFormValid>
        schema={registerSchema}
        onSubmit={handleFormSubmit}
        fields={fields}
        isLoading={isLoading}
        title='Cadastre-se agora...'
      />
    </div>
  );
};

export default RegisterForm;