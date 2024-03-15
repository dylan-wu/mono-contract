import NavbarNested from "@/components/layouts/Dashboard";
import {
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
  Select,
  Modal,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronLeft,
} from "@tabler/icons-react";
import SalesforceData from "../../data/vendors/salesforce.json";
import DataCard from "../custom/DataCard";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  
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
          <ActionIcon color="dark" component="a" href="/contracts">
            <IconChevronLeft />
          </ActionIcon>
          <Card shadow="sm">
            <Image width={50} src="/logos/salesforce.png" />
          </Card>
          <Title size="h2">Salesforce</Title>
          <Select
            defaultValue="Pending Feedback"
            data={["Needs Consolidation", "Active", "Evaluate", "Pending Feedback", "Not Renewing"]}
            variant="filled"
            radius="xl"
            c="#0B3D91"
            rightSection={<IconChevronDown/>}
          />
          <Modal opened={opened} onClose={close}>
            <Image height={80} src="./download.png" alt="Contract"/>
          </Modal>
          <Button onClick={open} radius="xl">View Contract</Button>
        </Group>
      </Group>

      <Group grow>
        {SalesforceData.cards.map((data) => (
          <DataCard name={data.name} data={data.data} chart={data.chart} change={data.change}/>
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
