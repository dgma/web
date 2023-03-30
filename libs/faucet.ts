import { ethers } from 'ethers';
import { config } from '@/libs/constants';

export const provider = new ethers.providers.JsonRpcProvider(config().rpc);
export const wallet = new ethers.Wallet(process.env.FACET_WALLET_PK as string, provider);