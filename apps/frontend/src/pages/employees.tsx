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
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Dropzone, DropzoneProps, FileWithPath } from "@mantine/dropzone";

import uploadFileDetails from "./api/UploadFileDetails";
import uploadFileToS3 from "./api/UploadFileToS3";
import { useUser } from "@clerk/nextjs";

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
  } catch (error) {
    console.error("An error occurred during the file upload process:", error);
  }
}

export default function Home(props: Partial<DropzoneProps>) {
  const tableData = [
    {
      name: "Athena Weissnat",
      department: "Unassigned",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Little - Rippin",
      email: "Elouise.Prohaska@yahoo.com",
    },
    {
      name: "Deangelo Runolfsson",
      department: "Account Management",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Greenfelder - Krajcik",
      email: "Kadin_Trantow87@yahoo.com",
    },
    {
      name: "Danny Carter",
      department: "Technology",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Kohler and Sons",
      email: "Marina3@hotmail.com",
    },
    {
      name: "Trace Tremblay PhD",
      department: "Brand",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Crona, Aufderhar and Senger",
      email: "Antonina.Pouros@yahoo.com",
    },
    {
      name: "Derek Dibbert",
      department: "Operations",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Gottlieb LLC",
      email: "Abagail29@hotmail.com",
    },
    {
      name: "Viola Bernhard",
      department: "Operations",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Funk, Rohan and Kreiger",
      email: "Jamie23@hotmail.com",
    },
    {
      name: "Austin Jacobi",
      department: "R&D",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Botsford - Corwin",
      email: "Genesis42@yahoo.com",
    },
    {
      name: "Hershel Mosciski",
      department: "Finance",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Okuneva, Farrell and Kilback",
      email: "Idella.Stehr28@yahoo.com",
    },
    {
      name: "Mylene Ebert",
      department: "Investors",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Kirlin and Sons",
      email: "Hildegard17@hotmail.com",
    },
    {
      name: "Lou Trantow",
      department: "Interns",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Parisian - Lemke",
      email: "Hillard.Barrows1@hotmail.com",
    },
    {
      name: "Dariana Weimann",
      department: "Unassigned",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Schowalter - Donnelly",
      email: "Colleen80@gmail.com",
    },
    {
      name: "Dr. Christy Herman",
      department: "Unassigned",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "VonRueden - Labadie",
      email: "Lilyan98@gmail.com",
    },
    {
      name: "Katelin Schuster",
      department: "Unassigned",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Jacobson - Smitham",
      email: "Erich_Brekke76@gmail.com",
    },
    {
      name: "Melyna Macejkovic",
      department: "Unassigned",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Schuster LLC",
      email: "Kylee4@yahoo.com",
    },
    {
      name: "Pinkie Rice",
      department: "Unassigned",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Wolf, Trantow and Zulauf",
      email: "Fiona.Kutch@hotmail.com",
    },
    {
      name: "Brain Kreiger",
      department: "Unassigned",
      jobTitle: "Product Owner",
      totalLicenses: "5",
      company: "Lueilwitz Group",
      email: "Rico98@hotmail.com",
    },
  ];
  const { user } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const [acceptedFiles, setFiles] = useState<FileWithPath[]>([]);

  const company = user?.emailAddresses[0]
    .toString()
    .split("@")[1]
    .split(".")[0];

  return (
    <NavbarNested>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Stack mb="xl">
          <Title order={3} c="#232859">
            Upload Employee(s)
          </Title>
          <TextInput label="COMPANY NAME" placeholder="Enter company name" />
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
                Attach as many files as you like, each file should not exceed
                5mb
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
      </Modal>
      <Group my="xs" py="xs" position="apart">
        <Title size="h2">Employees</Title>
        <Button
          onClick={open}
          leftIcon={<IconUpload size="1.25rem" />}
          bg="#0B3D91"
        >
          Upload Employee Data
        </Button>
      </Group>
      <TableSort data={tableData}/>
    </NavbarNested>
  );
}
