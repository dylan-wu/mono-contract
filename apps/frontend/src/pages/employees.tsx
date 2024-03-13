import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { TableSort } from "../components/TableSort";
import NavbarNested from "../components/layouts/Dashboard";
import { IconCloudUpload, IconFileDownload, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Dropzone, DropzoneProps, FileWithPath } from "@mantine/dropzone";

import uploadFileDetails from "./api/UploadFileDetails";
import uploadFileToS3 from "./api/UploadFileToS3";
import { useUser } from "@clerk/nextjs";

import EmployeeData from "../data/employees.json"  

export default function Home(props: Partial<DropzoneProps>) {
  const { user } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const [acceptedFiles, setFiles] = useState<FileWithPath[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMount, setIsMount] = useState(true);

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
      }, 2000);
    }
  }, [isLoading])

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
                label="COMPANY NAME"
                placeholder="Enter company name"
              />
              <Select
                label="CONTRACT NAME"
                placeholder="Select contract name"
                data={["Default", "Salesforce", "Microsoft 365"]}
              />
              <Group position="right">
                <Button leftIcon={<IconCloudUpload />} onClick={() => {window.location.href = './employees'}}>
                  Back to Dashboard
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
              <Select
                label="CONTRACT NAME"
                placeholder="Select contract name"
                data={["Default", "Salesforce", "Microsoft 365"]}
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
              <Select
                label="CONTRACT NAME"
                placeholder="Select contract name"
                data={["Default", "Salesforce", "Microsoft 365"]}
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
      <Group my="xs" py="xs" position="apart">
        <Title size="h2">Employee Table</Title>
        <Group>
          <Button
            onClick={open}
            leftIcon={<IconUpload size="1.25rem" />}
            bg="#0B3D91"
            radius="md"
          >
            Upload Employee Data
          </Button>
        </Group>
      </Group>
      <TableSort data={EmployeeData}/>
    </NavbarNested>
  );
}
