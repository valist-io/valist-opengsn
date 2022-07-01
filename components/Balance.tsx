import { TextInput } from '@mantine/core';
import { useContractRead } from 'wagmi';
import { ethers } from 'ethers';

const paymasterABI = `[{
  "inputs": [],
  "name": "getRelayHubDeposit",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}]`;

export default function Balance() {
  const { data, error } = useContractRead(
    {
      addressOrName: '0x137F8009fc7795dD8a004fdb38852F54368194e8',
      contractInterface: paymasterABI,
    },
    'getRelayHubDeposit'
  );

  return (
    <TextInput
      size="lg"
      error={error as any}
      value={ethers.utils.formatUnits(`${data || 0}`)} 
      disabled 
    />
  );
}