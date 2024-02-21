import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppShell,
  Navbar,
  Header,
  Container,
  Title,
  Group,
  Button,
} from "@mantine/core";
import { IconBook } from "@tabler/icons-react";
import Link from "next/link";

export default function Webpage({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      style={{ backgroundColor: "#F9FAFB" }}
      header={
        <Header height={84} p="xs" py="md">
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            size="xl"
          >
            <Link href="/">
              <Title color="#0B3D91" order={1}>
                License Logic
              </Title>
            </Link>
            <Group>
              <Button
                variant="subtle"
                color="gray"
                leftIcon={<IconBook size="1.25rem"></IconBook>}
              >
                Blog
              </Button>
              <SignedOut>
                <SignInButton redirectUrl="/">
                  <Button style={{ backgroundColor: "#0B3D91" }}>Login</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </Group>
          </Container>
        </Header>
      }
    >
      <div style={{ margin: "-16px", paddingBottom: "72px" }}>
        {/* <Container size="lg" pt={72}> */}
        {children}
        {/* </Container> */}
      </div>
    </AppShell>
  );
}
