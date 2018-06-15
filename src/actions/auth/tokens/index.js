import { invokeApi } from 'libs/aws';

export const exchangeCodeForToken = code => {
  return invokeApi({
    path: '/auth/tokens/exchange',
    method: 'POST',
    body: { provider: 'youtube', code }
  });
};
