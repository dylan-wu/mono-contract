import {
  Navbar,
  Group,
  ScrollArea,
  Title,
  AppShell,
  Flex,
  Button,
  ActionIcon,
  UnstyledButton,
  Box,
  ThemeIcon,
  Image,
} from "@mantine/core";
import {
  IconFileAnalytics,
  IconDatabasePlus,
  IconLayoutDashboard,
  IconWallet,
  IconRefresh,
  IconBell,
  IconCloudUpload,
} from "@tabler/icons-react";

import { UserButton } from "@clerk/nextjs";
import { LinksGroup } from "../NavbarLinksGroup";
import { Link } from "../NavbarLink";

const mockdata = [
  { label: "Dashboard", icon: IconLayoutDashboard, link: "/" },
  {
    label: "Active Spend",
    icon: IconWallet,
    links: [
      { label: "Spend by Vendor", link: "/vendors" },
      { label: "Spend by Department", link: "/departments" },
      { label: "Customize", link: "#" },
    ],
  },
  { label: "Send Report", icon: IconFileAnalytics, link: "#" },
  { label: "Renewals", icon: IconRefresh, link: "/renewals" },
  { label: "Contracts", icon: IconCloudUpload, link: "/contracts" },
];

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const links = mockdata.map((item) =>
    item.links ? (
      <LinksGroup {...item} key={item.label} />
    ) : (
      <Link key={item.label} {...item} />
    )
  );

  return (
    <AppShell style={{ backgroundColor: "#F9FAFB" }}>
      <Navbar width={{ sm: 300 }} p="md">
        <Navbar.Section py="sm" pl="md">
          <Flex direction="row" align="center" gap="sm" mb="xl">
            <Image src="/logo.svg" width="30px"></Image>
            <Title color="#0B3D91" size="2rem" order={1}>
              License Logic
            </Title>
          </Flex>
        </Navbar.Section>

        <Navbar.Section py="sm" pl="md" mb="xl">
          <Button
            leftIcon={<IconDatabasePlus></IconDatabasePlus>}
            sx={(theme) => ({
              backgroundColor: "#0B3D91",
            })}
            radius="xl"
            size="md"
            component="a"
            href="/add-software"
          >
            Add your software
          </Button>
        </Navbar.Section>

        <Navbar.Section grow component={ScrollArea}>
          <Group spacing="md">{links}</Group>
        </Navbar.Section>

        <Navbar.Section pl="md">
          <Group position="apart">
            <UserButton />
            <Group position="right">
              <ActionIcon color="blue" variant="light" size="lg">
                <IconBell />
              </ActionIcon>
            </Group>
          </Group>
        </Navbar.Section>
      </Navbar>
      <Flex direction="column" h="100%">
        {children}
      </Flex>
    </AppShell>
  );
}
