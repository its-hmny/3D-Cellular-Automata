import { Button, Container, Input, Image, Text, Spacer } from '@nextui-org/react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Container
      id="home"
      as="main"
      display="flex"
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Spacer />
      <Image src="/vercel.svg" alt="Vercel Logo" width={200} height={200} />

      <Spacer />
      <Text h1>
        Welcome to&nbsp;
        <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Next.js
        </Link>
        &nbsp; & &nbsp;
        <Link href="https://nextui.org" target="_blank" rel="noopener noreferrer">
          NextUI
        </Link>
      </Text>

      <Spacer />
      <Input clearable labelPlaceholder="Type something" />
      <Spacer />
      <Button>Show on Github</Button>
    </Container>
  );
};

export default Home;
