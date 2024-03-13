import { Group, Text, Title, Badge, Table, Stack, Tabs, Button, TextInput, ActionIcon } from "@mantine/core";
import ContractData from "../data/contracts.json";
import PendingData from "../data/pending.json";
import { IconArrowsSort, IconFilter, IconSearch } from "@tabler/icons-react";
import NavbarNested from "../components/layouts/Dashboard";
import { IconExternalLink, IconFileDownload } from '@tabler/icons-react';
import { useEffect, useState } from "react";
import { keys } from "@mantine/utils";

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

function filterData(data: TableDataProp[], search: string) {
  const query = search.trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].includes(query))
  );
}

function sortData(
  data: TableDataProp[],
  payload: { sortBy: keyof TableDataProp | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

function getRows(data: TableDataProp[]) {
  return (
    data.map((element) => (
      <tr key={element.department}>
        <td style={cellStyle}>
            {/* <Group spacing="xs"> */}
              <Text
                component="a"
                href="/vendors/salesforce"
                c="#0B3D91"
              >
                {element.name}
              </Text>
              {/* <ActionIcon color="#0B3D91" size="xs"><IconExternalLink/></ActionIcon> */}
            {/* </Group> */}
        </td>
        <td style={{ backgroundColor: 'white' }}>
          <Text 
            c="dimmed"
          >
            {element.clients}
          </Text>
        </td>
        <td style={cellStyle}>
          {/* <Group spacing="xs"> */}
            <Text 
              component="a"
              c="#0B3D91"
              href="/employees"
            >
              {element.users}
            </Text>
            {/* <ActionIcon color="#0B3D91" size="xs"><IconExternalLink/></ActionIcon> */}
          {/* </Group> */}
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
  const [sortBy, setSortBy] = useState<keyof TableDataProp | null>(null);
  const [search, setSearch] = useState("");
  const [onProcessed, setOnProcessed] = useState(true);
  const [sortedProcessedData, setSortedProcessedData] = useState(ContractData);
  const [sortedQueuedData, setSortedQueuedData] = useState(PendingData);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  // const [displayedData, setDisplayedData] = useState(getRows(ContractData));

  // useEffect(() => {
  //   if (onProcessed) {
  //     setDisplayedData(getRows(sortedProcessedData))
  //   } else {
  //     setDisplayedData(getRows(sortedQueuedData))
  //   }
  // }, [search])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    if (onProcessed) {
      setSortedProcessedData(
        sortData(sortedProcessedData, { sortBy, reversed: reverseSortDirection, search: value })
      );
    } else {
      setSortedQueuedData(
        sortData(sortedQueuedData, { sortBy, reversed: reverseSortDirection, search: value })
      );
    }
  };

  return (
    <NavbarNested>
      <Group my="xs" py="xs" position="apart">
        <Title size="h2">Contracts</Title>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          radius="md"
        />
      </Group>
      <Tabs defaultValue="processed">
        <Group position="apart" spacing="xs">
          <Tabs.List>
            <Tabs.Tab value="processed" onClick={() => setOnProcessed(true)}>
              <Text fz="1rem">Processed</Text>
            </Tabs.Tab>
            <Tabs.Tab value="queue" onClick={() => setOnProcessed(false)}>
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
                <tbody>{getRows(sortedProcessedData)}</tbody>
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
                <tbody>{getRows(sortedQueuedData)}</tbody>
              </Table>
            </div>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </NavbarNested>
  );
}
