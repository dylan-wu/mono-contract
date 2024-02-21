import NavbarNested from "../../components/layouts/Dashboard";
import {
  Flex,
  Group,
  Title,
  Text,
  Card,
  Badge,
  ThemeIcon,
  Header,
  Container,
  Button,
  Input,
  ActionIcon,
  Grid,
  Center,
  Image,
} from "@mantine/core";
import {
  IconAppsFilled,
  IconCalendarEvent,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconDotsVertical,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import DashboardData from "../../data/dashboard.json";
import MostUsedApps from "../../components/MostUsedApps";
import AppsData from "../../data/apps.json";
import Link from "next/link";

export default function AddSoftware() {
  return (
    <NavbarNested>
      <Container
        mx="-md"
        mt="-md"
        py="md"
        fluid
        style={{
          background:
            "linear-gradient(300deg, rgba(93,165,218,1) 0%, rgba(106,172,221,1) 35%, rgba(150,196,229,1) 100%)",
        }}
      >
        <Flex direction="column" gap="xl">
          <Title order={2} size="1.5rem" align="center" c="white">
            Find your apps to get started
          </Title>
          <Grid justify="center" align="center">
            <Grid.Col span={12}>
              <Input
                placeholder="Search 500+ Apps"
                rightSection={<IconSearch></IconSearch>}
              ></Input>
            </Grid.Col>
          </Grid>
        </Flex>
      </Container>
      <Card
        withBorder
        radius="xl"
        mt="lg"
        padding="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Flex direction="column">
          <Title order={3} size="1rem" align="center" mb="xl">
            License Logic works with everything you work with, search for an app
            that you want to investigate.
          </Title>
        </Flex>
        <Grid columns={10}>
          {AppsData.map((app) => (
            <Grid.Col span={1}>
              <Link
                href={`/add-software${app.link}`}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <Flex direction="column">
                  <Card
                    shadow="sm"
                    radius="xl"
                    h="100px"
                    style={{ backgroundColor: "#F2F5F8" }}
                  >
                    <Flex
                      justify="center"
                      align="center"
                      h="100%"
                      direction="column"
                    >
                      <Image width="30px" src={app.logo}></Image>
                    </Flex>
                  </Card>
                  <Text fz="0.85rem" mt="sm" fw={400} align="center">
                    {app.name}
                  </Text>
                </Flex>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </NavbarNested>
  );
}
