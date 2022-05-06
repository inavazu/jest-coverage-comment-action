import { getInput, info, error } from '@actions/core';

const createHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'scope': 'rentals'
  };

  const token = getInput('auth-token');
  const headerParameter = getInput('auth-header-parameter') ?? 'bearer';

  if (token) {
    headers[headerParameter] = token;
  }

  return headers;
};

export const sendCoverage = async (branch: string, percentage: number): Promise<void> => {
  const url: string = 'https://0d30-81-61-118-50.eu.ngrok.io/v1/testing/report/coverage';
  info(` [action] sendCoverage - Sending to url: ${url} for branch: ${branch} coverage percentage: ${percentage}`);
  const request: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: createHeaders(),
    body: JSON.stringify({ branch, percentage })
  };

  const response = await fetch(url, request);
  info(` [action] sendCoverage - Response ${response.status}`);
  if (response.status < 200 && response.status >= 300) {
    error(` [action] sendCoverage - Not expected response ${response.status}`);
    throw new Error(` [action] sendCoverage - Not expected response ${response.status}`);
  }
};