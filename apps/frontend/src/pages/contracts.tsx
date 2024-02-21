import NavbarNested from "@/components/layouts/Dashboard";
import {
  Group,
  Text,
  Card,
  Badge,
  Table,
  Flex,
  Image,
  SimpleGrid,
  Title,
  Stack,
  Tabs,
  Button,
} from "@mantine/core";
import ContractData from "../data/contracts.json";
import PendingData from "../data/pending.json";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { useRef, useState } from "react";
import { IconArrowsSort, IconFilter, IconUpload } from "@tabler/icons-react";

export default function Home(props: Partial<DropzoneProps>) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const openRef = useRef<() => void>(null);
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });
  const contractRows = ContractData.map((element) => (
    <tr key={element.department}>
      <td>
        <Text component="a" fz="1.25rem" fw={400} c="#0B3D91" tt="capitalize">
          {element.name}
        </Text>
      </td>
      <td>
        <Badge fw={400}>{element.start}</Badge>
      </td>
      <td>
        <Badge fw={400}>{element.end}</Badge>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.cost}
        </Text>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.licenseCost}
        </Text>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.department}
        </Text>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.service}
        </Text>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.renewal}
        </Text>
      </td>
    </tr>
  ));
  const pendingRows = PendingData.map((element) => (
    <tr key={element.department}>
      <td>
        <Text component="a" fz="1.25rem" fw={400} c="#0B3D91" tt="capitalize">
          {element.name}
        </Text>
      </td>
      <td>
        <Badge fw={400}>{element.start}</Badge>
      </td>
      <td>
        <Badge fw={400}>{element.end}</Badge>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.cost}
        </Text>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.licenseCost}
        </Text>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.department}
        </Text>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.service}
        </Text>
      </td>
      <td>
        <Text fw={400} c="#0B3D91">
          {element.renewal}
        </Text>
      </td>
    </tr>
  ));

  return (
    <NavbarNested>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          padding: "30px",
        }}
      >
        <Dropzone openRef={openRef} onDrop={() => {}} activateOnClick={false}>
          <Button
            onClick={() => openRef.current?.()}
            style={{ pointerEvents: "all" }}
            leftIcon={<IconUpload />}
          >
            Upload Documents
          </Button>
        </Dropzone>
      </div>
      <Tabs defaultValue="processed">
        <Tabs.List>
          <Tabs.Tab value="processed">
            <Text fz="1.25rem">Processed</Text>
          </Tabs.Tab>
          <Tabs.Tab value="queue">
            <Text fz="1.25rem">Queue</Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="processed" py="xl">
          <Stack h="100%">
            <Group position="right">
              <Button
                leftIcon={<IconArrowsSort></IconArrowsSort>}
                variant="default"
              >
                Sort
              </Button>
              <Button leftIcon={<IconFilter></IconFilter>} variant="default">
                Filter
              </Button>
            </Group>
            <Table>
              <thead>
                <tr>
                  <th style={{ fontWeight: "400" }}>VENDOR NAME</th>
                  <th style={{ fontWeight: "400" }}>START DATE</th>
                  <th style={{ fontWeight: "400" }}>END DATE</th>
                  <th style={{ fontWeight: "400" }}>COST</th>
                  <th style={{ fontWeight: "400" }}>LICENSE COST</th>
                  <th style={{ fontWeight: "400" }}>DEPARTMENT</th>
                  <th style={{ fontWeight: "400" }}>SERVICE DESCRIPTION</th>
                  <th style={{ fontWeight: "400" }}>RENEWAL TERMS</th>
                </tr>
              </thead>
              <tbody>{contractRows}</tbody>
            </Table>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="queue" py="xl">
          <Stack h="100%">
            <Table>
              <thead>
                <tr>
                  <th style={{ fontWeight: "400" }}>VENDOR NAME</th>
                  <th style={{ fontWeight: "400" }}>START DATE</th>
                  <th style={{ fontWeight: "400" }}>END DATE</th>
                  <th style={{ fontWeight: "400" }}>COST</th>
                  <th style={{ fontWeight: "400" }}>LICENSE COST</th>
                  <th style={{ fontWeight: "400" }}>DEPARTMENT</th>
                  <th style={{ fontWeight: "400" }}>SERVICE DESCRIPTION</th>
                  <th style={{ fontWeight: "400" }}>RENEWAL TERMS</th>
                </tr>
              </thead>
              <tbody>{pendingRows}</tbody>
            </Table>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </NavbarNested>
  );
}
