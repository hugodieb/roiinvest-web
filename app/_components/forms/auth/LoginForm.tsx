import React from 'react';
import Form from './Form';
import { loginSchema, LoginFormSchema } from '@/app/validators/auth'
import { useAuth } from '@/app/hooks/useAuth';


type FieldFormValid = LoginFormSchema;

const LoginForm = () => {
  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Senha', type: 'password' },
  ];

  const handleFormSubmit = (data: FieldFormValid) => {
    login(data)
  };

  const { login, isLoading } = useAuth();

  return (
    <div>
      <Form<FieldFormValid>
        schema={loginSchema}
        onSubmit={handleFormSubmit}
        fields={fields}
        isLoading={isLoading}
        title='Entrar em sua conta'
      />
    </div>
  );
};

export default LoginForm;