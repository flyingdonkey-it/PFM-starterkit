import { PersonalFinanceLayout } from '@/components/PersonalFinance';
import { SEO } from '@/components/SEO';

const PersonalFinance = () => {
  return (
    <>
      <SEO title="Personal Finance" />
      <main className="h-screen text-black bg-header">
        <PersonalFinanceLayout />
      </main>
    </>
  );
};

export default PersonalFinance;
