import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { RowData, TableSortProps} from "./commonInterfaces"
import { keys } from "@mantine/utils";

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
      keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
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

export default function SearchInput({ data }: any) {
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [sortedData, setSortedData] = useState(data);
    const [search, setSearch] = useState("");
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