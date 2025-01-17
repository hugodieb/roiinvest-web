'use client'

import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";

interface Props {
  params: {
    uid: string;
    token: string
  }
}

export default function Page({ params }: Props) {

  const { activation, isLoading } = useAuth();

  useEffect(() => {
    const { uid, token } = params

    if (!isLoading) {
      activation({ uid, token })
    }
  }, [activation, params, isLoading])

  return (
    <div>
      {!isLoading ?
        (<div className='flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Conta ativada....\O/
            </h1>
          </div>
        </div>
        ) : (
          <div className='flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
              <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                Ativando conta....
              </h1>
            </div>
          </div>
        )
      }
    </div>

  )
}