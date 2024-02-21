import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
