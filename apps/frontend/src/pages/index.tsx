import NavbarNested from "../components/layouts/Dashboard";
import {
  Flex,
  Group,
  Title,
  Text,
  Card,
  Badge,
  Container,
  Button,
  Image,
  Center,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import DashboardData from "../data/dashboard.json";
//import MostUsedAppsUpdate from "@/components/MostUsedAppsUpdate";
import MostUsedAppsData from "../data/mostUsedApps.json";

export default function Home() {
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <NavbarNested>
      <Container
        mx="-md"
        mt="-md"
        py="md"
        fluid
        style={{ backgroundColor: "white", borderBottom: "1px solid #E8E8E8" }}
      ></Container>

      <Group grow my="xl" py="xl" position="apart">
        <Title size="h2">Dashboard</Title>
        {/* <Flex justify="flex-end" gap="md">
          <Button
            color="gray"
            rightIcon={<IconChevronRight />}
            variant="outline"
            size="lg"
          >
            Department
          </Button>
        </Flex> */}
      </Group>

      <Group grow>
        {/*{DashboardData.map((data) => (*/}
        {/*  <Card*/}
        {/*    withBorder*/}
        {/*    radius="xl"*/}
        {/*    padding="xl"*/}
        {/*    sx={(theme) => ({*/}
        {/*      backgroundColor:*/}
        {/*        theme.colorScheme === "dark"*/}
        {/*          ? theme.colors.dark[7]*/}
        {/*          : theme.white,*/}
        {/*    })}*/}
        {/*  >*/}

        {DashboardData.map((data, index) => (
          <Card
            key={index} // Adding a unique key here
            withBorder
            radius="xl"
            padding="xl"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            <Group position="apart" style={{ alignItems: "flex-start" }}>
              <Flex direction="column">
                <Text fz="1.25rem" tt="uppercase" fw={500} c="dimmed" mb="xs">
                  {data.name}
                </Text>
                <Text fz="2rem" fw={600} c="#0B3D91" mb="sm">
                  {data.data}
                </Text>
                <Text fz="sm" c="dimmed" italic>
                  <Badge color={data.color}>{data.change}</Badge> Since last
                  month
                </Text>
              </Flex>
              <Image src={data.image} width="3rem"></Image>
            </Group>
          </Card>
        ))}
      </Group>
      <Flex justify="center" align="flex-start" gap="md" mt="md">
        <Card
          w="50%"
          withBorder
          radius="xl"
          padding="xl"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Group position="apart">
            <Title fw={600} c="#0B3D91" mb="xl">
              Top 10 Most Used Apps
            </Title>
            <Group>
              <Badge color="green">+15%</Badge>
              <Text color="gray" size="sm">
                Last 12 months
              </Text>
            </Group>
          </Group>
          <Card
            withBorder
            radius="xl"
            padding="xl"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            {MostUsedAppsData.map((data) => (
              <Flex direction="row" mb="sm" align="center">
                <Card
                  radius="md"
                  padding="md"
                  shadow="xl"
                  mr="xl"
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[7]
                        : theme.white,
                  })}
                >
                  <Image width={22} src={data.logo}></Image>
                </Card>
                <Flex
                  w={data.width}
                  h={18}
                  style={{
                    backgroundColor: "#5DA5DA",
                    borderRadius: "10px",
                  }}
                ></Flex>
                <Text ml="xl" c="#0B3D91" fw={600} size="lg">
                  {data.value}
                </Text>
              </Flex>
            ))}
          </Card>
        </Card>
        <Card
          w="50%"
          withBorder
          radius="xl"
          padding="xl"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Title fw={600} c="#0B3D91" mb="xl">
            Top 5 Underutilized Application Licenses
          </Title>
          <Card
            withBorder
            radius="xl"
            mt="xl"
            padding="xl"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            <Container>
              <Center>
                <Image src="dashboard/top5.png"></Image>
              </Center>
            </Container>
          </Card>
        </Card>
      </Flex>
    </NavbarNested>
  );
}
