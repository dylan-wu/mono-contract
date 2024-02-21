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
  Modal,
  AppShell,
  Navbar,
  ScrollArea,
  ActionIcon,
  Textarea,
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
import {
  IconArrowsSort,
  IconBell,
  IconCloudUpload,
  IconDatabasePlus,
  IconFileAnalytics,
  IconFilter,
  IconLayoutDashboard,
  IconPhoto,
  IconRefresh,
  IconUpload,
  IconWallet,
  IconX,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { LinksGroup } from "../components/NavbarLinksGroup";
import { Link } from "../components/NavbarLink";
import { UserButton } from "@clerk/nextjs";

export default function Home(props: Partial<DropzoneProps>) {
  const [opened, { open, close }] = useDisclosure(false);
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
        <Text
          component="a"
          href="/vendors/salesforce"
          fz="1.5rem"
          fw={600}
          c="#0B3D91"
          tt="capitalize"
        >
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
        <Text fw={400} fz="1.25rem" c="#0B3D91">
          {element.cost}
        </Text>
      </td>
      <td>
        <Text fw={400} fz="1.25rem" c="#0B3D91">
          {element.licenses}
        </Text>
      </td>
      <td>
        <Text fw={400} fz="1.25rem" c="#0B3D91">
          {element.department}
        </Text>
      </td>
      <td>
        <Text fw={400} fz="1.25rem" c="#0B3D91">
          {element.service}
        </Text>
      </td>
      <td>
        <Text fw={400} fz="1.25rem" c="#0B3D91">
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
  const mockdata = [
    { label: "Dashboard", icon: IconLayoutDashboard, link: "/" },
    {
      label: "Active Spend",
      icon: IconWallet,
      links: [
        { label: "Spend by Vendor", link: "/vendors" },
        { label: "Spend by Department", link: "/departments" },
        { label: "Customize", link: "#" },
      ],
    },
    { label: "Send Report", icon: IconFileAnalytics, link: "#" },
    { label: "Renewals", icon: IconRefresh, link: "/renewals" },
    { label: "Contracts", icon: IconCloudUpload, link: "/contracts" },
  ];

  const links = mockdata.map((item) =>
    item.links ? (
      <LinksGroup {...item} key={item.label} />
    ) : (
      <Link key={item.label} {...item} />
    )
  );
  return (
    <AppShell style={{ backgroundColor: "#F9FAFB" }}>
      <Navbar width={{ sm: 300 }} p="md">
        <Navbar.Section py="sm" pl="md">
          <Flex direction="row" align="center" gap="sm" mb="xl">
            <Image src="/logo.svg" width="30px"></Image>
            <Title color="#0B3D91" size="2rem" order={1}>
              License Logic
            </Title>
          </Flex>
        </Navbar.Section>

        <Navbar.Section py="sm" pl="md" mb="xl">
          <Button
            onClick={open}
            leftIcon={<IconUpload />}
            sx={(theme) => ({
              backgroundColor: "#0B3D91",
            })}
            radius="xl"
            size="md"
          >
            Upload Documents
          </Button>
        </Navbar.Section>

        <Navbar.Section grow component={ScrollArea}>
          <Group spacing="md">{links}</Group>
        </Navbar.Section>

        <Navbar.Section pl="md">
          <Group position="apart">
            <UserButton />
            <Group position="right">
              <ActionIcon color="blue" variant="light" size="lg">
                <IconBell />
              </ActionIcon>
            </Group>
          </Group>
        </Navbar.Section>
      </Navbar>
      <Flex direction="column" h="100%">
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            padding: "30px",
          }}
        >
          <Button
            onClick={open}
            leftIcon={<IconUpload />}
            sx={(theme) => ({
              backgroundColor: "#0B3D91",
            })}
          >
            Upload Documents
          </Button>
        </div>
        <Modal opened={opened} onClose={close} withCloseButton={false} centered>
          <Stack mb="xl">
            <Title order={3} ta="center">
              Tell us how to process your file:
            </Title>
            <Textarea
              label="Your Instructions"
              placeholder="Extract the contract start date..."
            />
          </Stack>
          <Dropzone
            onDrop={(files) => console.log("accepted files", files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
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
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Modal>
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
                    <th style={{ fontWeight: "400" }}>TOTAL LICENSES</th>
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
      </Flex>
    </AppShell>
  );
}
