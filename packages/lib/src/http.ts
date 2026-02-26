export function apiSignatureMessage(path: string, timestamp: string): string {
  return `${path}:${timestamp}`
}

export const apiHeaders = {
  acceptLanguage: 'Accept-Language',
  accessToken: 'X-Access-Token',
  version: 'X-Version',
  timeZone: 'X-Time-Zone',
  timestamp: 'X-TIMESTAMP',
  signature: 'X-SIGNATURE',
  database: 'X-Database',
}

export const cookieNames = {
  database: 'database',
}
