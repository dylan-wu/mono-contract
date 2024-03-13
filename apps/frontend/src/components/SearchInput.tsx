import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { keys } from "@mantine/utils";

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

export default function SearchInput({ data }: any) {
  const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<keyof TableDataProp | null>(null);
    const [sortedData, setSortedData] = useState(data);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(
          sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
        );
    };

    return (
        <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />);
}