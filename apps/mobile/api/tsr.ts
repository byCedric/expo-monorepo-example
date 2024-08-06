import { contract } from './contract';
import { initTsrReactQuery } from '@ts-rest/react-query/v5';

import { getBaseUrl } from '../utils/getBaseUrl';

const tsr = initTsrReactQuery(contract, {
  baseUrl: getBaseUrl() + '/api/v1',
  baseHeaders: {},
});

export { tsr };
