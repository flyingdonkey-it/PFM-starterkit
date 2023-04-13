import { AccountVerificationForm } from '@/components/AccountVerificationForm';
import { SEO } from '@/components/SEO';

export default function AccountVerification() {
  return (
    <>
      <SEO title="Account Verification" />
      <main className="text-black bg-white">
        <AccountVerificationForm />
      </main>
    </>
  );
}
