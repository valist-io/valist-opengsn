import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNetwork } from 'wagmi';
import { Container, Space } from '@mantine/core';
import Form from '../components/Form';

const Home: NextPage = () => {
  const { activeChain } = useNetwork();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Container size="xs">
      <ConnectButton></ConnectButton>
      <Space h="md" />
      { mounted && activeChain && <Form /> }
    </Container>
  );
}

export default Home;
