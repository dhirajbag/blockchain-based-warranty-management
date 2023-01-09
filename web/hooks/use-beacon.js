import { useCallback, useState } from 'react';

import { TezosToolkit } from '@taquito/taquito';
//import { TempleWallet } from '@temple-wallet/dapp';
import { BeaconWallet } from '@taquito/beacon-wallet';

//export const RPC_URL = 'https://rpc.florence.tzstats.com';
export const RPC_URL = 'https://rpc.tzbeta.net';
const options = {
  name: 'Warranty on Tezos',
};

export const Tezos = new TezosToolkit(RPC_URL);

export default function useBeacon() {
  const [pkh, setUserPkh] = useState();
  const connect = useCallback(async () => {
    //const { BeaconWallet } = await import('@taquito/beacon-wallet');
    
    const wallet = new BeaconWallet(options);

    Tezos.setProvider({ wallet });

    await wallet.requestPermissions({
      network: {
        type: 'mainnet' | 'hangzhounet' | 'ithacanet' | 'custom',
        rpcUrl: RPC_URL,
      },
    });

    setUserPkh(await wallet.getPKH());
  }, []);

  return { connect, pkh };
}
