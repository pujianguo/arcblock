import { _get } from './request';

export const getInfo = (hash) => _get(`/rawblock/${hash}`);
