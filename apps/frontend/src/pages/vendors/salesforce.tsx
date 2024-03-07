import NavbarNested from "@/components/layouts/Dashboard";
import {
  Flex,
  Group,
  Title,
  Text,
  Card,
  Badge,
  Button,
  ActionIcon,
  Image,
  Table,
  Grid,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconChevronLeft,
  IconChevronRight,
  IconDotsVertical,
} from "@tabler/icons-react";
import SalesforceData from "../../data/vendors/salesforce.json";

export default function Home() {
  const rows = SalesforceData.breakdown.map((element) => (
    <tr key={element.name}>
      <td>
        <Group>
          <Image width={20} src="/logos/salesforce.png" />
          <Text
            component="a"
            href={`/vendors/${encodeURIComponent(element.name)}`}
            fz="1.25rem"
            fw={400}
            c="#0B3D91"
            tt="capitalize"
          >
            {element.name}
          </Text>
        </Group>
      </td>
      <td>
        <Badge>{element.cost}</Badge>
      </td>
      <td>
        <Text fz="1.25rem" fw={400} c="#0B3D91">
          {element.users}
        </Text>
      </td>
    </tr>
  ));

  return (
    <NavbarNested>
      <Group grow my="xl" py="xl" position="apart">
        <Group>
          <ActionIcon color="dark">
            <IconChevronLeft />
          </ActionIcon>
          <Card shadow="sm">
            <Image width={50} src="/logos/salesforce.png" />
          </Card>
          <Title size="h2">Salesforce</Title>
        </Group>
      </Group>

      <Group grow>
        {SalesforceData.cards.map((data) => (
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
            <Group position="apart" style={{ alignItems: "flex-start" }}>
              <Flex direction="column">
                <Text fz="1.15rem" tt="uppercase" fw={500} c="dimmed" mb="xs">
                  {data.name}
                </Text>
                <Text fz="2rem" fw={600} c="#0B3D91" mb="sm">
                  {data.data}
                </Text>
                <Text fz="sm" c="dimmed" italic>
                  <Badge> {data.change}</Badge> Since last month
                </Text>
              </Flex>
            </Group>
          </Card>
        ))}
      </Group>
      <Grid mt="md">
        <Grid.Col span={12}>
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
            <Table>
              <thead>
                <tr>
                  <th style={{ fontWeight: "400" }}>VENDOR BREAKDOWN</th>
                  <th style={{ fontWeight: "400" }}>LICENSE COST</th>
                  <th style={{ fontWeight: "400" }}>TOTAL USERS</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Card>
        </Grid.Col>
      </Grid>
    </NavbarNested>
  );
}
