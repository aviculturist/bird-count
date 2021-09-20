import { atom } from 'jotai';
import { AppConfig, UserSession } from '@stacks/auth';
import { atomWithDefault } from 'jotai/utils';

//const appDomain = 'https://www.myapp.com';
export const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://localhost:3000'); //document.location.href);
export const userSessionAtom = atom(() => new UserSession({ appConfig }));
export const userAtom = atomWithDefault(get => {
  const userSession = get(userSessionAtom);
  if (userSession.isUserSignedIn()) {
    return userSession.loadUserData();
  }
});
