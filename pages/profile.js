import { ProfileLayout } from '@/components/PersonalFinance';
import { SEO } from '@/components/SEO';

export default function Profile() {
  return (
    <>
      <SEO title="Personal Finance" />
      <main className="text-black bg-header">
        <ProfileLayout />
      </main>
    </>
  );
}
