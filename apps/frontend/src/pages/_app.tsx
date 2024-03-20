import type { AppProps } from "next/app";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";

function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ClerkProvider {...pageProps}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
        </MantineProvider>
      </ClerkProvider>
    </>
  );
}

export default trpc.withTRPC(App);
