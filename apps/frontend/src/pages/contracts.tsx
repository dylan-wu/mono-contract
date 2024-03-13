import { Group, Text, Title, Badge, Table, Stack, Tabs, Button, TextInput, ActionIcon } from "@mantine/core";
import ContractData from "../data/contracts.json";
import PendingData from "../data/pending.json";
import { IconArrowsSort, IconFilter } from "@tabler/icons-react";
import NavbarNested from "../components/layouts/Dashboard";
import { IconExternalLink, IconFileDownload } from '@tabler/icons-react';

const cellStyle: React.CSSProperties = {
  backgroundColor: 'white',
  whiteSpace: "nowrap",
};

const headingCellStyle: React.CSSProperties = {
  fontWeight: "400",
  whiteSpace: "nowrap",
}

const tableStyle: React.CSSProperties = {
  tableLayout: "auto"
}

interface TableDataProp {
  name: string,
  start: string
  end: string
  cost: string
  users: string
  clients: string
  licenses: string
  department: string
  service: string
  renewal: string
}

function getRows(data: TableDataProp[]) {
  return (
    data.map((element) => (
      <tr key={element.department}>
        <td style={cellStyle}>
            <Group spacing="xs">
              <Text
                component="a"
                href="/vendors/salesforce"
                c="#0B3D91"
              >
                <u>{element.name}</u>
              </Text>
              <ActionIcon color="#0B3D91" size="xs"><IconExternalLink/></ActionIcon>
            </Group>
        </td>
        <td style={{ backgroundColor: 'white' }}>
          <Text 
            c="dimmed"
          >
            {element.clients}
          </Text>
        </td>
        <td style={cellStyle}>
          <Group spacing="xs">
            <Text 
              component="a"
              c="#0B3D91"
              href="/employees"
            >
              <u>{element.users}</u>
            </Text>
            <ActionIcon color="#0B3D91" size="xs"><IconExternalLink/></ActionIcon>
          </Group>
        </td>
        <td style={cellStyle}>
          <Text 
            c="dimmed"
          >
            {element.start}
          </Text>
        </td>
        <td style={cellStyle}>
          <Text 
            c="dimmed"
          >
            {element.end}
          </Text>
        </td>
        <td style={cellStyle}>
          <Text 
            c="dimmed"
          >
            {element.cost}
          </Text>
        </td>
        <td style={cellStyle}>
          <Text c="dimmed">
            {element.licenses}
          </Text>
        </td>
        <td style={cellStyle}>
          <Text c="dimmed">
            {element.department}
          </Text>
        </td>
        <td style={{ backgroundColor: 'white' }}>
          <Text c="dimmed">
            {element.service}
          </Text>
        </td>
        <td style={{ backgroundColor: 'white' }}>
          <Text c="dimmed">
            {element.renewal}
          </Text>
        </td>
      </tr>
    ))
  );
} 

export default function Home() {
  const contractRows = getRows(ContractData)

  const pendingRows = getRows(PendingData)

  return (
    <NavbarNested>
      <Group my="xs" py="xs" position="apart">
        <Title size="h2">Contracts</Title>
        <TextInput
          placeholder="Search by any field"
        />
      </Group>
      <Tabs defaultValue="processed">
        <Group position="apart" spacing="xs">
          <Tabs.List>
            <Tabs.Tab value="processed">
              <Text fz="1rem">Processed</Text>
            </Tabs.Tab>
            <Tabs.Tab value="queue">
              <Text fz="1rem">Queue</Text>
            </Tabs.Tab>
          </Tabs.List>
          <Group>
            <Button
              leftIcon={<IconArrowsSort></IconArrowsSort>}
              variant="default"
            >
              Sort
            </Button>
            <Button leftIcon={<IconFilter></IconFilter>} variant="default">
              Filter
            </Button>
            <Button
              leftIcon={<IconFileDownload/>}
              variant="default"
            >
              Download csv
            </Button>
          </Group>
        </Group>
        <Tabs.Panel value="processed" py="xl">
          <Stack h="100%">
            <div style={{ overflowX: "auto", width: "99%"}}>
              <Table highlightOnHover withBorder
                horizontalSpacing="md"
                verticalSpacing="xs"
                sx={{ tableLayout: "fixed" }}
                fontSize="xs"
                style={tableStyle}
              >
                <thead>
                  <tr>
                    <th style={headingCellStyle}>VENDOR NAME</th>
                    <th style={headingCellStyle}>COVERED CLIENTS</th>
                    <th style={headingCellStyle}>TOTAL USERS</th>
                    <th style={headingCellStyle}>START DATE</th>
                    <th style={headingCellStyle}>END DATE</th>
                    <th style={headingCellStyle}>COST</th>
                    <th style={headingCellStyle}>TOTAL LICENSES</th>
                    <th style={headingCellStyle}>DEPARTMENT</th>
                    <th style={headingCellStyle}>SERVICE DESCRIPTION</th>
                    <th style={headingCellStyle}>RENEWAL TERMS</th>
                  </tr>
                </thead>
                <tbody>{contractRows}</tbody>
              </Table>
            </div>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="queue" py="xl">
          <Stack h="100%">
            <div style={{ overflowX: "auto", width: "99%"}}>
              <Table highlightOnHover withBorder
                horizontalSpacing="md"
                verticalSpacing="xs"
                sx={{ tableLayout: "fixed" }}
                fontSize="xs"
                style={tableStyle}
              >
                <thead>
                  <tr>
                    <th style={headingCellStyle}>VENDOR NAME</th>
                    <th style={headingCellStyle}>COVERED CLIENTS</th>
                    <th style={headingCellStyle}>TOTAL USERS</th>
                    <th style={headingCellStyle}>START DATE</th>
                    <th style={headingCellStyle}>END DATE</th>
                    <th style={headingCellStyle}>COST</th>
                    <th style={headingCellStyle}>TOTAL LICENSES</th>
                    <th style={headingCellStyle}>DEPARTMENT</th>
                    <th style={headingCellStyle}>SERVICE DESCRIPTION</th>
                    <th style={headingCellStyle}>RENEWAL TERMS</th>
                  </tr>
                </thead>
                <tbody>{pendingRows}</tbody>
              </Table>
            </div>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </NavbarNested>
  );
}
