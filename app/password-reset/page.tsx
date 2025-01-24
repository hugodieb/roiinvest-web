import type { Metadata } from 'next';
import PasswordResetForm from '../_components/forms/auth/PasswordResetForm';

export const metadata: Metadata = {
  title: 'Roiinvest | Reset de senha',
  description: 'Roiinvest página reset de senha.',
};

export default function Page() {
  return (
    <div>
      <PasswordResetForm />
    </div>
  )
}

