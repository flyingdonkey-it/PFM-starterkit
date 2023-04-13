import { PersonalFinanceLayout } from '@/components/PersonalFinance';
import { SEO } from '@/components/SEO';

export default function PersonalFinance() {
  return (
    <>
      <SEO title="Personal Finance" />
      <main className="h-screen text-black bg-header">
        <PersonalFinanceLayout />
      </main>
    </>
  );
}
