'use client'

import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
import { PasswordInput } from '@/app/_components/commons/Password-input';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LinkButton from '@/app/_components/commons/LinkButton';


interface Props<T extends FieldValues> {
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  fields: Array<{ name: keyof T; label: string; type: string }>;
  isLoading: boolean;
  title?: string;
}

const Form = <T extends FieldValues>({ schema, onSubmit, fields, isLoading, title }: Props<T>) => {

  const { register, handleSubmit, formState: { errors } } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const pathname = usePathname();
  const isLoginPage = pathname === '/auth/login';

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-8 lg:px-8">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto border border-gray-800">
        <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" py-2 text-center text-4xl font-bold tracking-tight text-gray-700">
            {title ? title : 'Começe por aqui...'}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {fields.map((field) => (
              <div key={field.name as string}>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 
                  font-bold
                text-gray-600"
                  >
                    {field.label}
                  </label>
                  {field.type === 'password' && isLoginPage ?
                    <div className="text-sm">
                      <LinkButton href="/password-reset"
                        title='Esqueceu a senha?'
                        className="font-semibold text-indigo-600 hover:text-indigo-500" />
                    </div>
                    :
                    ''
                  }

                </div>
                {field.type === 'password' ?
                  <PasswordInput id={field.type}
                    register={register(field.name as string)}
                    className='block w-full rounded-md bg-white px-3 py-2.5
                text-base text-gray-900 outline outline-1
              -outline-offset-1 outline-gray-300 placeholder:text-gray-400
               focus:outline focus:outline-2 focus:-outline-offset-2
                focus:outline-slate-500 sm:text-sm/6'
                  />
                  :
                  <Input
                    className="block w-full rounded-md bg-white px-3 py-2.5
                text-base text-gray-900 outline outline-1
              -outline-offset-1 outline-gray-300 placeholder:text-gray-400
               focus:outline focus:outline-2 focus:-outline-offset-2
                focus:outline-slate-500 sm:text-sm/6"
                    type={field.type}
                    {...register(field.name as string)}
                  />
                }
                <div
                  className="h-1 text-sm text-red-500"
                  style={{
                    visibility: errors[field.name as string] ? "visible" : "hidden",
                  }}
                >
                  {(errors[field.name as string]?.message as string) || 'Este campo é obrigatório.'}
                </div>
              </div>
            ))}
            <div className='mt-10'>
              <Button
                type="submit"
                variant="outline"
                className="flex w-full justify-center
           rounded-md bg-slate-900 px-3 py-2.5 text-sm/6 font-semibold
            text-white shadow-sm hover:bg-slate-950 focus-visible:outline
             focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Entrar'}
              </Button>
            </div>
            {!isLoginPage ?
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Já possui uma conta?{' '}
                <Link href={'/auth/login'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Bora fazer login
                </Link>
              </p>
              :
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Não têm sua conta ainda?{' '}
                <Link href={'/auth/register'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Criar minha conta
                </Link>
              </p>
            }

          </form>
        </div>
      </div>
    </div>

  );
};

export default Form;
