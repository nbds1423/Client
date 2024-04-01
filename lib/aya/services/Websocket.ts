import ws from 'ws';
import ENDPOINT from '@aya/utils/endpoints';

export default new ws(ENDPOINT.CHANNEL);