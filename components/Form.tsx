import { InputWrapper, NumberInput, Button, Stack } from '@mantine/core';
import { useState } from 'react';
import { useSendTransaction } from 'wagmi';
import { ethers } from 'ethers';
import Balance from './Balance';

export default function Form() {
  const [amount, setAmount] = useState(1);

  const { sendTransaction, error, isLoading } =
    useSendTransaction({
      request: {
        to: '0x137F8009fc7795dD8a004fdb38852F54368194e8',
        value: ethers.utils.parseUnits(`${amount || 0}`),
      },
    });

  const submit = (event) => {
    sendTransaction();
    event.preventDefault();
  };

  return (
    <form onSubmit={submit}>
      <Stack spacing="lg">
        <InputWrapper label="Current Balance">
          <Balance />
        </InputWrapper>
        <InputWrapper label="Deposit Amount">
          <NumberInput
            max={1}
            min={0.01}
            step={0.01}
            size="lg"
            precision={2}
            value={amount} 
            onChange={setAmount} 
            error={error?.data?.message}
            disabled={isLoading} />
        </InputWrapper>
        <Button 
          size="lg"
          type="submit" 
          fullWidth
        >
          Deposit
        </Button>
      </Stack>
    </form>
  );
}