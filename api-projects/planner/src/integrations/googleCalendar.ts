import {
  initGapiClient,
  initTokenClient,
  loadGIS,
  loadGooglePlatform,
} from '../lib/google';

const API_KEY = import.meta.env.VITE_GCAL_API_KEY as string;
const CLIENT_ID = import.meta.env.VITE_GCAL_CLIENT_ID as string;

let ready = false;
let tokenClient: any;

export async function ensureGoogleReady() {
  if (ready) return;
  await Promise.all([loadGooglePlatform(), loadGIS()]);
  await initGapiClient(API_KEY);
  tokenClient = initTokenClient(CLIENT_ID);
  ready = true;
}
export async function ensureToken(
  interactive = false,
  timeoutMs = 10000
): Promise<void> {
  await ensureGoogleReady();

  return new Promise((resolve, reject) => {
    if (!tokenClient) return reject(new Error('Token client not initialized'));

    const timer = setTimeout(() => {
      reject(new Error('Auth timeout'));
    }, timeoutMs);

    tokenClient.callback = (resp: any) => {
      clearTimeout(timer);
      if (resp?.access_token) {
        window.gapi.client.setToken(resp);
        return resolve();
      }
      if (resp?.error) return reject(new Error(resp.error));
      resolve();
    };

    tokenClient.error_callback = (err: any) => {
      clearTimeout(timer);
      reject(
        err instanceof Error
          ? err
          : new Error(String(err?.error ?? 'Auth error'))
      );
    };

    const existing = window.gapi.client.getToken?.();

    try {
      if (interactive || !existing?.access_token) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        tokenClient.requestAccessToken({ prompt: '' });
      }
    } catch (e: any) {
      clearTimeout(timer);
      reject(e);
    }
  });
}

type ListOpts = {
  calendarId?: string;
  timeMin: string;
  timeMax: string;
  maxResults?: number;
};

export async function listEvents({
  calendarId = 'primary',
  timeMin,
  timeMax,
  maxResults = 100,
}: ListOpts) {
  const res = await window.gapi.client.calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults,
    showDeleted: false,
  });
  return res.result.items ?? [];
}
