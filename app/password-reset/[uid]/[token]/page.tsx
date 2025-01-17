import PasswordResetConfirmForm from '@/app/_components/forms/PasswordResetConfirmForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roiinvest | Confirmar senha',
  description: 'Roiinvest página para confirmação de senha.',
};

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

export default function Page({ params: { uid, token } }: Props) {
  return (
    <div>
      <PasswordResetConfirmForm uid={uid} token={token} />
    </div>
  );
}