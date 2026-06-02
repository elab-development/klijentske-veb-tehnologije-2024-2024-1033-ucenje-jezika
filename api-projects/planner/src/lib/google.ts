const GSI_SRC = 'https://accounts.google.com/gsi/client';
const GAPI_SRC = 'https://apis.google.com/js/api.js';
const DISCOVERY_DOC =
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export async function loadGooglePlatform() {
  await loadScript(GAPI_SRC);
  await new Promise<void>((resolve) => window.gapi.load('client', resolve));
}

export async function loadGIS() {
  await loadScript(GSI_SRC);
}

export async function initGapiClient(apiKey: string) {
  await window.gapi.client.init({
    apiKey,
    discoveryDocs: [DISCOVERY_DOC],
  });
}

export function initTokenClient(clientId: string) {
  return window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: SCOPES,
    callback: () => {},
  });
}

export function revokeToken() {
  const token = window.gapi.client.getToken?.();
  if (token?.access_token) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken(null);
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}
