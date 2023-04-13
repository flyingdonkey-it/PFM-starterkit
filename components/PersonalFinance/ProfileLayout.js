import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAccountVerificationForm } from '../AccountVerificationForm/AccountVerificationFormProvider';
import { axios } from '@/utils/axios';

export function ProfileLayout({ open, setMenuOpen }) {
  const [consentOpen, setConsentOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const router = useRouter();

  const { goToConsent } = useAccountVerificationForm();

  function manageTabs(isConsentManagement) {
    if (isConsentManagement) {
      setNotificationsOpen(false);
      setConsentOpen(!consentOpen);
      return;
    }

    setConsentOpen(false);
    setNotificationsOpen(!notificationsOpen);
  }

  function onCloseButtonClick() {
    router.push('/personal-finance');
  }

  function onRevokeConsentClick() {
    const userId = sessionStorage.getItem('userId');
    axios
      .get(`/api/consents?userId=${userId}`)
      .then(async res => {
        const activeConsents = res.data.data.filter(x => x.status === 'active');
        if (activeConsents && activeConsents.length > 0) {
          const consentId = activeConsents[0].id;

          axios
            .delete(`/api/delete-consent?userId=${userId}&consentId=${consentId}`)
            .then(async res => {
              if (res.status === 200) {
                goToConsent();
              }
            })
            .catch(error => {
              console.log('Error: ', error);
            });
        }
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  function onManageConsentClick() {
    goToConsent();
  }

  return (
    <>
      <div className="relative">
        <div className="hidden w-full sm:block">
          {open && (
            <div
              className={`fixed bottom-0 right-0 z-40 hidden top-[9.5rem] bg-menu shadow-smenu sm:block xl:w-1/4 sm:w-1/2`}
            >
              <div className="flex flex-col font-semibold text-2xl2 text-blue h-5/6">
                <div
                  className="flex items-center justify-between mt-5 mb-5 ml-14 mr-14"
                  onClick={() => manageTabs(true)}
                >
                  <div className="flex">
                    <div>
                      <img className="w-6 h-6" src="/setting.svg" alt="Setting" />
                    </div>
                    <div className="ml-6">Consent Management</div>
                  </div>
                  <div>
                    <img
                      className="w-4 h-2"
                      src={`${consentOpen ? '/hide-tab.svg' : '/show-tab.svg'}`}
                      alt="Show or Hide Tab"
                    />
                  </div>
                </div>
                {consentOpen && (
                  <div className="font-medium">
                    <div className="pt-5 pb-5 bg-[#ECF3FF]">
                      <div className="ml-16" onClick={onRevokeConsentClick}>
                        Revoke consent
                      </div>
                    </div>
                    <div className="pt-5 pb-5 mt-1 bg-[#ECF3FF]">
                      <div className="ml-16" onClick={onManageConsentClick}>
                        Manage consent
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-[#FBFBFA]">
                  <div className="flex items-center mt-5 mb-5 ml-14 mr-14">
                    <div>
                      <img className="w-6 h-6" src="/edit-profile.svg" alt="Edit Profile" />
                    </div>
                    <div className="ml-6">Edit Personal details</div>
                  </div>
                </div>
                <div className="bg-[#FAFAFA]">
                  <div
                    className="flex items-center justify-between mt-5 mb-5 ml-14 mr-14"
                    onClick={() => manageTabs(false)}
                  >
                    <div className="flex">
                      <div>
                        <img className="w-6 h-6" src="/has-notification.svg" alt="Notifications" />
                      </div>
                      <div className="ml-6">Notifications</div>
                    </div>
                    <div>
                      <img
                        className="w-4 h-2"
                        src={`${notificationsOpen ? '/hide-tab.svg' : '/show-tab.svg'}`}
                        alt="Show or Hide Tab"
                      />
                    </div>
                  </div>
                  {notificationsOpen && (
                    <div className="font-normal text-sm2">
                      <div className="flex pt-5 pb-5 bg-[#ECF3FF]">
                        <div className="ml-16">
                          <img className="w-6 h-5" src="/user-activity.svg" alt="User Activity" />
                        </div>
                        <div className="ml-4 mr-16">This month, your spendings are above average</div>
                      </div>
                      <div className="flex pt-5 pb-5 mt-1 bg-[#ECF3FF]">
                        <div className="ml-16">
                          <img className="w-5 h-5" src="/danger-circle.svg" alt="Danger" />
                        </div>
                        <div className="ml-4 mr-16">Upcoming payment: Disney+</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col pl-8 pr-6 text-blue">
                <div className="border-t-2 text-border-color"></div>
                <div className="pt-8">
                  <div className="flex items-center">
                    <img className="w-16 h-16" src="/product-logo-square.svg" alt="Logo" />
                    <div className="text-sm2">
                      <p className="w-3/4 font-semibold text-center">Personal Finance Management</p>
                    </div>
                  </div>
                  <div className="self-end float-right font-medium underline text-base2">Privacy Policy</div>
                </div>
              </div>
            </div>
          )}
          <div
            id="overlay"
            className={`fixed bottom-0 left-0 z-40 ${
              open ? 'visible' : 'invisible'
            } xl:w-3/4 sm:w-1/2 h-full xl:right-1/4 sm:right-1/2 top-[9.5rem] bg-overlay sm:flex`}
            onClick={setMenuOpen}
          ></div>
        </div>
        <div className="sm:hidden">
          <div className="flex justify-between mt-5 ml-5 mr-5">
            <div>
              <img className="w-12 h-12" src="/product-logo-square.svg" alt="Logo" />
            </div>
            <div className="flex flex-col items-center">
              <div>
                <img className="w-24 h-24" src="/profile-photo.svg" alt="Profile Photo" />
              </div>
              <div className="mt-5 font-semibold text-2xl2 text-primary-bold">Jane Doe</div>
            </div>
            <div>
              <img className="w-8 h-8" src="/close-button.svg" alt="Close" onClick={onCloseButtonClick} />
            </div>
          </div>
          <div className="flex flex-col mt-12 text-base2">
            <div className="bg-[#FBFBFB]">
              <div className="flex items-center justify-between mt-5 mb-5 ml-14 mr-14" onClick={() => manageTabs(true)}>
                <div className="flex">
                  <div>
                    <img className="w-6 h-6" src="/setting.svg" alt="Setting" />
                  </div>
                  <div className="ml-6">Consent Management</div>
                </div>
                <div>
                  <img
                    className="w-4 h-2"
                    src={`${consentOpen ? '/hide-tab.svg' : '/show-tab.svg'}`}
                    alt="Show or Hide Tab"
                  />
                </div>
              </div>
              {consentOpen && (
                <div className="font-medium">
                  <div className="pt-5 pb-5 bg-[#ECF3FF]">
                    <div className="ml-16" onClick={onRevokeConsentClick}>
                      Revoke consent
                    </div>
                  </div>
                  <div className="pt-5 pb-5 mt-1 bg-[#ECF3FF]">
                    <div className="ml-16" onClick={onManageConsentClick}>
                      Manage consent
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-[#FBFBFA]">
              <div className="flex items-center mt-5 mb-5 ml-14 mr-14">
                <div>
                  <img className="w-6 h-6" src="/edit-profile.svg" alt="Edit Profile" />
                </div>
                <div className="ml-6">Edit Personal details</div>
              </div>
            </div>
            <div className="bg-[#FAFAFA]">
              <div
                className="flex items-center justify-between mt-5 mb-5 ml-14 mr-14"
                onClick={() => manageTabs(false)}
              >
                <div className="flex">
                  <div>
                    <img className="w-6 h-6" src="/has-notification.svg" alt="Notifications" />
                  </div>
                  <div className="ml-6">Notifications</div>
                </div>
                <div>
                  <img
                    className="w-4 h-2"
                    src={`${notificationsOpen ? '/hide-tab.svg' : '/show-tab.svg'}`}
                    alt="Show or Hide Tab"
                  />
                </div>
              </div>
              {notificationsOpen && (
                <div className="font-normal text-sm2">
                  <div className="flex pt-5 pb-5 bg-[#ECF3FF]">
                    <div className="ml-16">
                      <img className="w-6 h-5" src="/user-activity.svg" alt="User Activity" />
                    </div>
                    <div className="ml-4 mr-16">This month, your spendings are above average</div>
                  </div>
                  <div className="flex pt-5 pb-5 mt-1 bg-[#ECF3FF]">
                    <div className="ml-16">
                      <img className="w-5 h-5" src="/danger-circle.svg" alt="Danger" />
                    </div>
                    <div className="ml-4 mr-16">Upcoming payment: Disney+</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
