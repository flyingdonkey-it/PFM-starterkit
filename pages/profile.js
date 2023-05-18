import { ProfileLayout } from '@/components/PersonalFinance';
import { SEO } from '@/components/SEO';

const Profile = () => {
  return (
    <>
      <SEO title="Personal Finance" />
      <main className="text-black bg-header">
        <ProfileLayout />
      </main>
    </>
  );
};

export default Profile;
