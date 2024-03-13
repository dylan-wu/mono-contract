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
  TextInput,
  NumberInput,
} from "@mantine/core";
import {
  IconFileAnalytics,
  IconRefresh,
  IconBell,
  IconUpload,
  IconX,
  IconPhoto,
  IconUsers,
  IconPlus,
  IconCloudUpload
} from "@tabler/icons-react";


import uploadFileDetails from "../../pages/api/UploadFileDetails";
import uploadFileToS3 from "../../pages/api/UploadFileToS3";

import { UserButton, useUser } from "@clerk/nextjs";
import { Link } from "../NavbarLink";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState, useEffect } from "react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";

const navData = [
  { label: "Employees", icon: IconUsers, link: "/employees" },
  { label: "Renewals", icon: IconRefresh, link: "/renewals" },
  { label: "Contracts", icon: IconCloudUpload, link: "/contracts" },
];

export default function Dashboard(
  { children }: { children: React.ReactNode },
  props: Partial<DropzoneProps>
) {
  const { user } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [numContracts, setNumContracts] = useState(1);
  const [additionalContracts, setAdditionalContracts] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMount, setIsMount] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const another = <TextInput label="CONTRACT NAME" placeholder="Enter contract name" key={numContracts}/> 
    setAdditionalContracts([...additionalContracts, another])
  }, [numContracts]);

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
        window.location.href = './contracts'
        setIsConfirming(false);
      }, 3000)
    }
  }, [isConfirming]);

  const [acceptedFiles, setFiles] = useState<FileWithPath[]>([]);

  const links = navData.map((item) => <Link key={item.label} {...item} />);

  const company = user?.emailAddresses[0]
    .toString()
    .split("@")[1]
    .split(".")[0];

  async function handleFileUpload(
    file: FileWithPath,
    companyName: String | undefined
  ) {
    try {
      // First, get the pre-signed URL
      const url = await uploadFileDetails(file, companyName);
      // Next, use the URL to upload the file
      await uploadFileToS3(url, file, "application/pdf");
      console.log("File upload process completed successfully.");
      setUploadStatus("success");
    } catch (error) {
      console.error("An error occurred during the file upload process:", error);
      setUploadStatus("failure");
    }
  }

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
            leftIcon={<IconCloudUpload />}
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
          {uploadStatus == "success" ? (
            <>
              <Stack mb="xl">
                <Title order={3} c="#232859">
                  Upload Success!
                </Title>
                <Text>
                  Here's a preview of what the data looks like, feel free to
                  edit this as needed:
                </Text>
                <TextInput
                  label="Vendor Name"
                  defaultValue="OneStream Software LLC"
                />
                <TextInput
                  label="CLIENT NAME"
                  defaultValue="The Texas A&M University System"
                />
                <TextInput
                  label="Start date of contract"
                  defaultValue="05/17/2021"
                />
                <TextInput
                  label="End date of contract"
                  defaultValue="5/17/2024"
                />
                <TextInput
                  label="Total cost of the contract"
                  defaultValue="$49,200 annually"
                />
                <NumberInput
                  label="Total Licenses"
                  defaultValue={10}
                />
                <TextInput
                  label="DEPARTMENT"
                  defaultValue="Finance"
                />
                <TextInput
                  label="Description of the service"
                  defaultValue="SaaS financial management"
                />
                <TextInput
                  label="Renewal terms"
                  defaultValue="Automatically renew for an additional two years unless notice is given 60 days prior to the end of the initial term, with up to a 5% price increase."
                />
                <Group position="right">
                  <Button 
                    leftIcon={<IconCloudUpload />} 
                    onClick={() => setIsConfirming(true)}
                    loading={isConfirming}
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
                  label="CONTRACT NAME"
                  placeholder="Enter contract name"
                />
                <TextInput
                  label="COMPANY NAME"
                  placeholder="Enter company name"
                />
                <Select
                  label="Data Template"
                  placeholder="Select template"
                  data={["Abacus", "InSource", "Custom", "TalentGroups"]}
                />
              </Stack>
              <Dropzone
                onDrop={(files) => setFiles(files)}
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
                >
                  Submit Files
                </Button>
              </Group>
            </>
          ) : (
            <>
              <Stack mb="xl">
                <Title order={3} c="#232859">
                  Upload Contract
                </Title>
                {additionalContracts.map((contract) => (
                  contract
                ))}
                <Group position="left">
                  <Button
                    onClick={()=>setNumContracts(numContracts+1)}
                    variant="subtle"
                    leftIcon={<IconPlus />}
                  >
                    <Text fz="xs">Add Another Contract</Text>
                  </Button>
                </Group>
                <TextInput
                  label="COMPANY NAME"
                  placeholder="Enter company name"
                />
                <Select
                  label="Data Template"
                  placeholder="Select template"
                  data={["Abacus", "InSource", "Custom", "TalentGroups"]}
                />
              </Stack>
              <Dropzone
                onDrop={(files) => setFiles(files)}
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
                      Attach as many files as you like, each file should not
                      exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
              <Group position="right">
                <Button
                  mt="xl"
                  onClick={() => window.location.href = './contracts'}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  mt="xl"
                  onClick={() => setIsLoading(true)}
                  id="submit"
                  loading={isLoading}
                >
                  Submit
                </Button>
              </Group>
            </>
          )}
        </Modal>
        {children}
      </Flex>
    </AppShell>
  );
}
