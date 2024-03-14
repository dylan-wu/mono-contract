import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Button,
  Title,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconFileDownload,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

const cellStyle: React.CSSProperties = {
  backgroundColor: 'white',
  whiteSpace: "nowrap",
};

interface RowData {
  name: string;
  department: string;
  jobTitle: string;
  totalLicenses: string;
  company: string;
  email: string;
}

interface TableSortProps {
  data: RowData[];
}

// interface ThProps {
//   children: React.ReactNode;
//   reversed: boolean;
//   sorted: boolean;
//   onSort(): void;
// }

// function Th({ children, reversed, sorted, onSort }: ThProps) {
//   const { classes } = useStyles();
//   const Icon = sorted
//     ? reversed
//       ? IconChevronUp
//       : IconChevronDown
//     : IconSelector;
//   return (
//     <th className={classes.th}>
//       <UnstyledButton onClick={onSort} className={classes.control}>
//         <Group position="apart">
//           <Text fw={500} fz="sm">
//             {children}
//           </Text>
//           <Center className={classes.icon}>
//             <Icon size="0.9rem" stroke={1.5} />
//           </Center>
//         </Group>
//       </UnstyledButton>
//     </th>
//   );
// }

function filterData(data: RowData[], search: string) {
  const query = search.trim();
  return data.filter((item) => 
    keys(data[0]).some((key) => item[key].includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
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

export function TableSort({ data }: TableSortProps ) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row: RowData) => (
    <tr key={row.name}>
      <td style={cellStyle}>
        <Text
          component="a"
          href="/individual-employee"
          c="#0B3D91"
          tt="capitalize"
        >
          {row.name}
        </Text>
      </td>
      <td style={cellStyle}>
        <Text
          c="dimmed"
        >
          {row.email}
        </Text>
      </td>
      <td style={cellStyle}>
        <Text
          c="dimmed"
        >
          {row.company}
        </Text>
      </td>
      <td style={cellStyle}>
        <Text
          c="dimmed"
        >
          {row.department}
        </Text>
      </td>
      <td style={cellStyle}>
        <Text
          c="dimmed"
        >
        {row.jobTitle}
        </Text>
      </td>
      <td style={cellStyle}>
        <Text
          c="dimmed"
        >
        {row.totalLicenses}
        </Text>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Group position="apart">
        <Title size="h2">Employee Table</Title>
        <Group position="right">
          <TextInput
            placeholder="Search by any field"
            mb="md"
            icon={<IconSearch size="0.9rem" stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
            radius="md"
          />
          <Button
            leftIcon={<IconFileDownload/>}
            variant="default"
            radius="md"
            mb="md"
          >
            Download csv
          </Button>
        </Group>
      </Group>
      <Table highlightOnHover withBorder
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: "fixed" }}
        fontSize="xs"
      >
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>COMPANY NAME</th>
            <th>DEPARTMENT</th>
            <th>JOB TITLE</th>
            <th>TOTAL LICENSES</th>
            {/* <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === "email"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("email")}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === "company"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("company")}
            >
              Company Name
            </Th>
            <Th
              sorted={sortBy === "department"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("department")}
            >
              Department 
            </Th>
            <Th
              sorted={sortBy === "jobTitle"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("jobTitle")}
            >
              Job Title
            </Th>
            <Th
              sorted={sortBy === "totalLicenses"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("totalLicenses")}
            >
              Total Licenses
            </Th> */}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
