import toast from 'react-hot-toast';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { PasswordField } from '@/components/PasswordField';
import { SearchInput } from '@/components/SearchInput';
import { ProgressBar } from '@/components/ProgressBar';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CircularProgressBar } from '@/components/CircularProgressBar';
import { SEO } from '@/components/SEO';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// This file is for developer use only, to get an overview of all the components
const Components = () => {
  return (
    <>
      <SEO title="Components" />
      <main className="container px-6 py-6 mx-auto space-y-10">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <SectionButtons />
        <SectionLoadingSpinner />
        <SectionTextField />
        <SectionPasswordField />
        <SectionSearchInput />
        <SectionErrorMessage />
        <SectionProgressBar />
        <SectionCircularProgressBar />
        <SectionToastNotification />
      </main>
    </>
  );
};

const SectionButtons = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Button</h2>
      <div className="space-x-4">
        <Button>Default</Button>
        <Button variant="bold">Bold</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="inverted">Inverted</Button>
        <Button variant="critical">Critical</Button>
      </div>

      <div className="space-x-4">
        <Button loading>Default</Button>
        <Button loading variant="bold">
          Bold
        </Button>
        <Button loading variant="subtle">
          Subtle
        </Button>
        <Button loading variant="inverted">
          Inverted
        </Button>
        <Button loading variant="critical">
          Critical
        </Button>
      </div>

      <div className="space-x-4">
        <Button disabled>Default</Button>
        <Button disabled variant="bold">
          Bold
        </Button>
        <Button disabled variant="subtle">
          Subtle
        </Button>
        <Button disabled variant="inverted">
          Inverted
        </Button>
        <Button disabled variant="critical">
          Critical
        </Button>
      </div>

      <div>
        <Button block>Block</Button>
      </div>
    </section>
  );
};

const SectionLoadingSpinner = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">LoadingSpinner</h2>
      <div className="space-x-4">
        <LoadingSpinner />
      </div>
    </section>
  );
};

const SectionTextField = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">TextField</h2>
      <TextField label="Label" />
      <TextField label="Label" placeholder="Placeholder" />
      <TextField label="Label" error="Something went wrong" />
    </section>
  );
};

const SectionPasswordField = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">PasswordField</h2>
      <PasswordField label="Label" />
      <PasswordField label="Label" placeholder="Placeholder" />
      <PasswordField label="Label" error="Something went wrong" />
    </section>
  );
};

const SectionSearchInput = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">SearchInput</h2>
      <SearchInput placeholder="Search" />
    </section>
  );
};

const SectionErrorMessage = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">ErrorMessage</h2>
      <ErrorMessage message="Something went wrong." />
    </section>
  );
};

const SectionProgressBar = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">ProgressBar</h2>
      <ProgressBar value={75} />
    </section>
  );
};

const SectionCircularProgressBar = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">CircularProgressBar</h2>
      <div className="flex flex-wrap gap-4">
        <CircularProgressBar value={0} />
        <CircularProgressBar value={20} />
        <CircularProgressBar value={40} />
        <CircularProgressBar value={60} />
        <CircularProgressBar value={80} />
        <CircularProgressBar value={100} />
        <CircularProgressBar value={100} error />
      </div>
    </section>
  );
};

const SectionToastNotification = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Toast</h2>
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast.success('Biscuit chocolate cheesecake pudding candy canes tart halvah sweet.', {
              title: 'Successfully added toast',
              appearance: 'success',
            })
          }
        >
          Open success toast
        </Button>

        <Button
          variant="critical"
          onClick={() =>
            toast.error('Biscuit chocolate cheesecake pudding candy canes tart halvah sweet.', {
              title: 'Something went wrong',
              appearance: 'critical',
            })
          }
        >
          Open critical toast
        </Button>
      </div>
    </section>
  );
};

export default Components;
