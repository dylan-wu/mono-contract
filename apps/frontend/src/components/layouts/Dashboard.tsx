import {
  Navbar,
  Group,
  ScrollArea,
  Title,
  AppShell,
  Flex,
  Button,
  ActionIcon,
  Image,
  Modal,
  Stack,
  Select,
  Text,
} from "@mantine/core";
import {
  IconFileAnalytics,
  IconRefresh,
  IconBell,
  IconCloudUpload,
  IconUpload,
  IconX,
  IconPhoto,
  IconUsers,
} from "@tabler/icons-react";

import uploadFileDetails from "../../pages/api/UploadFileDetails";
import uploadFileToS3 from "../../pages/api/UploadFileToS3";

import { UserButton, useUser } from "@clerk/nextjs";
import { Link } from "../NavbarLink";
import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";

const navData = [
  { label: "Send Report", icon: IconFileAnalytics, link: "#" },
  { label: "Employees", icon: IconUsers, link: "/employees" },
  { label: "Renewals", icon: IconRefresh, link: "/renewals" },
  { label: "Contracts", icon: IconCloudUpload, link: "/contracts" },
  { label: "Test", icon: IconBell, link: "/individual-employee" },
];

async function handleFileUpload(
  file: FileWithPath,
  companyName: String | undefined
) {
  try {
    // First, get the pre-signed URL
    const url = await uploadFileDetails(file, companyName);
    // Next, use the URL to upload the file
    await uploadFileToS3(url, file);
    console.log("File upload process completed successfully.");
  } catch (error) {
    console.error("An error occurred during the file upload process:", error);
  }
}

export default function Dashboard(
  { children }: { children: React.ReactNode },
  props: Partial<DropzoneProps>
) {
  const { user } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);

  const links = navData.map((item) => <Link key={item.label} {...item} />);

  const company = user?.emailAddresses[0]
    .toString()
    .split("@")[1]
    .split(".")[0];

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
        <Modal opened={opened} onClose={close} withCloseButton={false} centered>
          <Stack mb="xl">
            <Title order={3} ta="center">
              Tell us how to process your file:
            </Title>
            <Select
              label="Data Template"
              placeholder="Default"
              data={["Default", "Salesforce", "Microsoft 365"]}
            />
          </Stack>
          <Dropzone
            onDrop={(files) => handleFileUpload(files[0], company)}
            onReject={(files) => console.log("rejected files", files)}
            accept={PDF_MIME_TYPE}
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
        {children}
      </Flex>
    </AppShell>
  );
}
