import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
  Title,
  Text,
  ScrollArea,
  Table,
} from "@mantine/core";
import NavbarNested from "../components/layouts/Dashboard";
import { IconCloudUpload, IconFileDownload, IconPhoto, IconSearch, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Dropzone, DropzoneProps, FileWithPath } from "@mantine/dropzone";

import uploadFileDetails from "./api/UploadFileDetails";
import uploadFileToS3 from "./api/UploadFileToS3";
import { useUser } from "@clerk/nextjs";

import EmployeeData from "../data/employees.json"  
import EmployeeDataToAdd from "../data/employeesToAdd.json"
import { data } from "autoprefixer";
import { keys } from "@mantine/utils";

const cellStyle: React.CSSProperties = {
  backgroundColor: 'white',
  whiteSpace: "nowrap",
};

interface CardData {
  name: string
  data: string
  chart: string
  change: string
}

interface ContractData {
  companyName: string
  logoPath: string,
  contractID: number
  licenses: number
  amountCost: string
}

interface RowData {
  name: string;
  department: string;
  jobTitle: string;
  totalLicenses: string;
  company: string;
  email: string;
  // cards: CardData[]
  // contracts: ContractData[]
}

function filterData(data: RowData[], search: string) {
  const query = search.trim();
  return data.filter((item) => 
    keys(data[0]).some((key) => item[key].includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export default function Home(props: Partial<DropzoneProps>) {
  const { user } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const [acceptedFiles, setFiles] = useState<FileWithPath[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMount, setIsMount] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(EmployeeData);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    console.log(search);
    setSortedData(
      sortData(EmployeeData, { sortBy, search: value })
    );
  };

  const company = user?.emailAddresses[0]
    .toString()
    .split("@")[1]
    .split(".")[0];

  useEffect(() => {
    if (isMount) {
      setIsMount(false)
    } else {
      setTimeout(() => {
        handleFileUpload(acceptedFiles[0],company);
        setIsLoading(false);
      }, 5000);
    }
  }, [isLoading])

  useEffect(() => {
    if (isMount) {
      setIsMount(false)
    } else {
      setTimeout(() => {
        setIsConfirming(false);
      }, 3000)
    }
  }, [isConfirming]);

  async function handleFileUpload(
    file: FileWithPath,
    companyName: String | undefined
  ) {
    try {
      // First, get the pre-signed URL
      const url = await uploadFileDetails(file, companyName);
      // Next, use the URL to upload the file
      await uploadFileToS3(url, file, "text/csv");
      console.log("File upload process completed successfully.");
      setUploadStatus("success");
    } catch (error) {
      console.error("An error occurred during the file upload process:", error);
      setUploadStatus("failure");
    }
  }
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
    <NavbarNested>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        {uploadStatus == "success" ? (
          <>
            <Stack mb="xl">
              <Title order={3} c="#232859">
                Upload Success!
              </Title>
              <Text>
                Here's a preview of what the data looks like, feel free to edit
                this as needed:
              </Text>
              <TextInput
                label="EMPLOYEE NAME"
                defaultValue="Athena Weissnat"
              />
              <TextInput
                label="EMPLOYEE EMAIL"
                defaultValue="Athena.Weissnat@yahoo.com"
              />
              <TextInput
                label="COOMPANY NAME"
                defaultValue="Little - Rippin"
              />
              <TextInput
                label="DEPARTMENT"
                defaultValue="Technology"
              />
              <TextInput
                label="JOB TITLE"
                defaultValue="Product Owner"
              />
              <TextInput
                label="TOTAL LICENSES"
                defaultValue="5"
              />
              <Group position="right">
                <Button 
                  leftIcon={<IconCloudUpload />} 
                  onClick={() => {setIsConfirming(true), 
                    setSortedData([...EmployeeDataToAdd, ...sortedData])}}
                  loading={isConfirming}
                  bg="#0B3D91"
                >
                  Confirm
                </Button>
              </Group>
            </Stack>
          </>
        ) : uploadStatus == "failure" ? (
          <>
            <Stack mb="xl">
              <Title order={3} c="#232859">
                Upload Failed
              </Title>
              <Text>
                Something went wrong, try and upload a contract again:
              </Text>
              <TextInput
                label="COMPANY NAME"
                placeholder="Enter company name"
              />
              <TextInput
                label="CONTRACT NAME"
                placeholder="Select contract name"
              />
            </Stack>
            <Dropzone
              onDrop={(files) => setFiles(files)}
              onReject={(files) => console.log("rejected files", files)}
              accept={["text/csv"]}
              {...props}
            >
              <Group position="center" spacing="xl">
                <Dropzone.Accept>
                  <IconUpload size="3.2rem" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size="3.2rem" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <Group position="right">
              <Button
                mt="xl"
                onClick={() => handleFileUpload(acceptedFiles[0], company)}
                bg="#0B3D91"
              >
                Submit
              </Button>
            </Group>
          </>
        ) : (
          <>
            <Stack mb="xl">
              <Title order={3} c="#232859">
                Upload Employee(s)
              </Title>
              <TextInput
                label="COMPANY NAME"
                placeholder="Enter company name"
              />
              <TextInput
                label="CONTRACT NAME"
                placeholder="Select contract name"
              />
            </Stack>
            <Dropzone
              onDrop={(files) => setFiles(files)}
              onReject={(files) => console.log("rejected files", files)}
              accept={["text/csv"]}
              {...props}
            >
              <Group position="center" spacing="xl">
                <Dropzone.Accept>
                  <IconUpload size="3.2rem" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size="3.2rem" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <Group position="right">
              <Button
                mt="xl"
                onClick={() => window.location.href = './employees'}
                variant="outline"
                color="blue.9"
                c="#0B3D91"
              >
                Cancel
              </Button>
              <Button
                mt="xl"
                onClick={() => {setIsLoading(true)}}
                id="submit"
                loading={isLoading}
                bg="#0B3D91"
              >
                Submit
              </Button>
            </Group>
          </>
        )}
      </Modal>
      <ScrollArea>
        <Group my="xs" py="xs" position="apart">
          <Title size="h2" mb="md" color="#00008B">Employee Table</Title>
          <Group position="right">
            <TextInput
              placeholder="Search here..."
              mb="md"
              rightSection={<IconSearch size="0.9rem" stroke={1.5} />}
              value={search}
              onChange={handleSearchChange}
              radius="md"
              id="search"
            />
            <Button
              leftIcon={<IconFileDownload/>}
              variant="outline"
              radius="md"
              mb="md"
              color="blue.9"
              c="#0B3D91"
            >
              Download csv
            </Button>
            <Button
              onClick={open}
              leftIcon={<IconUpload size="1.25rem" />}
              radius="md"
              mb="md"
              bg="#0B3D91"
            >
              Upload Employee Data
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
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(sortedData[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </NavbarNested>
  );
}
