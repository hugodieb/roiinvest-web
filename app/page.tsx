import type { Metadata } from 'next';
import { Home } from './_components/commons';


export const metadata: Metadata = {
  title: 'Roiinvest | Home',
  description: 'Investidor Inteligente',
};

export default function Page() {

  return (
    <main>
      <Home />
    </main>
  );
}
