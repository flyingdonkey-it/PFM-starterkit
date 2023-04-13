import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchInput } from '../SearchInput';
import { ErrorScene } from '../ErrorScene';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';

export function AccountVerificationFormStep2InstitutionPicker() {
  const { goForward, updateAccountVerificationFormState } = useAccountVerificationForm();
  const [searchValue, setSearchValue] = useState('');
  const { data, loading, error, refetch } = useInstitutionsData();

  const errorOrNoData = error || !data || data.length === 0;

  // When a user selects a bank, update the form state and push the user to the next step
  function onInstitutionClick(selectedInstitution) {
    updateAccountVerificationFormState({ selectedInstitution });
    goForward();
  }

  // FILTERING INSTITUTIONS
  // If the user is searching, filter out any institutions which do not match the search term
  // We use both the "name" and "shortName" attributes for searching
  const filteredInstitutions = data
    ? searchValue
      ? data.filter(({ name, shortName }) => {
          const val = searchValue.toLocaleLowerCase();
          return name.toLocaleLowerCase().includes(val) || shortName.toLocaleLowerCase().includes(val);
        })
      : data
    : [];

  return (
    <div className="flex flex-col space-y-8 sm:space-y-12">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <StepLogo src="/product-logo-square.svg" alt="Piper logo" />

      <div className="flex flex-col space-y-8">
        {/* STEP HEADING */}
        {/* A short as possible heading to help the user quickly recognise the task at hand. */}
        <StepHeading>Find your bank</StepHeading>

        {/* INSTITUTIONS */}
        <div className="space-y-3">
          {(loading || !errorOrNoData) && (
            <SearchInput
              labelScreenReader="Search"
              placeholder="Search"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              disabled={loading}
            />
          )}
          {loading ? (
            <InstitutionsLoadingSkeleton />
          ) : errorOrNoData ? (
            <ErrorScene
              title="Failed to load banks"
              message="Something went wrong whilst fetching the list of banks. If the problem persists, please contact support."
              actionOnClick={refetch}
            />
          ) : (
            <>
              {filteredInstitutions.length ? (
                <div className="space-y-3">
                  {filteredInstitutions.map(institution => (
                    <button
                      key={institution.id}
                      className="relative flex w-full p-3 bg-white border rounded-lg outline-none cursor-pointer border-neutral-dim active:bg-primary-subtle focus:border-primary-bold focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent transition-colors"
                      onClick={() => onInstitutionClick(institution)}
                      data-cy={`institution-${institution.id}`}
                    >
                      <div className="flex items-center w-full space-x-3">
                        {/* Institution logo */}
                        <img
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-md"
                          src={institution.logo.links.square}
                          alt={`Logo of ${institution.name}`}
                        />

                        {/* Institution shortName */}
                        <span className="flex flex-grow font-medium">{institution.shortName}</span>

                        {/* Icon: chevron-right (outline) */}
                        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            className="stroke-current text-neutral-muted"
                            d="M7.5 4.167 13.333 10 7.5 15.833"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <NoMatchingResults />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// RETRIEVE INSTITUTIONS
// Custom react hook for managing our fetch request to retrieves a list institutions
// The code for this API route can be found in `pages/api/institutions`
function useInstitutionsData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchInstitutions = useCallback(() => {
    axios
      .get('/api/institutions')
      .then(res => {
        setData(res.data);
        setError(undefined);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchInstitutions();
  }, [fetchInstitutions]);

  return { data, loading, error, refetch };
}

// INSTITUTIONS LOADING SKELETON
// Keeps the user visually occupied whilst loading,
// making the experience seem quicker than it might be.
const skeletonItems = [...new Array(10).keys()];
function InstitutionsLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {skeletonItems.map(i => (
        <div key={i} className="flex p-3 bg-white border rounded-lg border-neutral-subtle-darker animate-pulse">
          <div className="flex items-center w-full space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-neutral-subtle-darker" />
            <div className="w-48 h-4 rounded bg-neutral-subtle-darker" />
          </div>
        </div>
      ))}
    </div>
  );
}

// NO MATCHING RESULTS
function NoMatchingResults() {
  return (
    <div className="py-3 space-y-6 sm:space-y-8">
      <div className="flex flex-col items-center rounded-lg space-y-6 sm:space-y-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-neutral-muted"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-center">No matching results</h2>
          <p className="text-sm leading-relaxed text-center text-neutral-muted-darker">
            There were no banks matching your search text. Please double-check spelling again. If the problem persists,
            contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
