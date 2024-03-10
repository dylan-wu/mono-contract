import NavbarNested from "../../components/layouts/Dashboard";
import {
  Flex,
  Group,
  Title,
  Text,
  Card,
  Container,
  Button,
  Input,
  ActionIcon,
  Grid,
  Center,
  Image,
  Divider,
} from "@mantine/core";
import {
  IconCheck,
  IconChevronDown,
  IconCloudStorm,
  IconDotsVertical,
} from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";
import { postData } from "../api/AddSoftware";

export default function Salesforce() {
  const [submitted, setSubmitted] = useState(false);

  const salesforceData = {
    Company: "John",
    Vendor: "Test",
    Email: "John@test.com",
    API: "fsfsdfsgsdgdsfdsafsdfsfd",
  };

  return (
    <NavbarNested>
      <Flex justify="center">
        <Container size="md" mx="-md" w="100%" pb="xl">
          {submitted ? (
            <>
              <Title order={2} size="h2" mt="xl">
                Your contract has been added! Check the information below.
              </Title>
              <Card
                withBorder
                radius="xl"
                mt="lg"
                padding="xl"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.white,
                })}
              >
                <Text fz="sm" c="gray">
                  This spreadsheet row was found in your Google Sheets account.
                </Text>
                <Flex direction="column" gap="xs" mt="xl">
                  <Text fw={400} fz="xs" color="gray">
                    CONTRACT
                  </Text>
                  <Input
                    component="select"
                    icon={
                      <Group>
                        <Image src="/logos/salesforce.png" width="20px"></Image>
                      </Group>
                    }
                    rightSection={<IconChevronDown></IconChevronDown>}
                  >
                    <option value="Salesforce">Salesforce</option>
                  </Input>
                </Flex>
                <Flex direction="column" gap="xs" mt="xl">
                  <Text fw={400} fz="xs" color="gray">
                    RENEWAL DATE
                  </Text>
                  <Input placeholder="2023-09-30"></Input>
                </Flex>
                <Flex direction="column" gap="xs" mt="xl">
                  <Text fw={400} fz="xs" color="gray">
                    LICENSE COST
                  </Text>
                  <Input placeholder="$10,000"></Input>
                </Flex>
                <Flex direction="column" gap="xs" mt="xl">
                  <Text fw={400} fz="xs" color="gray">
                    TOTAL LICENSES
                  </Text>
                  <Input placeholder="1200"></Input>
                </Flex>
                <Flex direction="column" gap="xs" mt="xl">
                  <Text fw={400} fz="xs" color="gray">
                    DEPARTMENT
                  </Text>
                  <Input placeholder="Finance"></Input>
                </Flex>
                <Flex direction="column" gap="xs" mt="xl">
                  <Text fw={400} fz="xs" color="gray">
                    CONTENT HASH
                  </Text>
                  <Input placeholder="yUifPnYuPfTTU4M79vC4WpoB"></Input>
                </Flex>
                <Flex justify="flex-end" mt="md">
                  <Button
                    style={{ backgroundColor: "#0B3D91" }}
                    component="a"
                    href="/"
                  >
                    Confirm
                  </Button>
                </Flex>
              </Card>
            </>
          ) : (
            <>
              <Card
                withBorder
                radius="xl"
                mt="lg"
                padding="xl"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.white,
                })}
              >
                <Grid>
                  <Grid.Col span={11}>
                    <Group>
                      <Card
                        shadow="sm"
                        radius="xl"
                        h="100px"
                        w="100px"
                        style={{ backgroundColor: "#F2F5F8" }}
                      >
                        <Flex
                          justify="center"
                          align="center"
                          h="100%"
                          direction="column"
                        >
                          <Image
                            width="4rem"
                            src="/logos/salesforce.png"
                          ></Image>
                        </Flex>
                      </Card>
                      <Flex direction="column">
                        <Title order={3} size="1rem">
                          1. Integrate Salesforce
                        </Title>
                        <Text fz="sm" italic>
                          Trigger
                        </Text>
                      </Flex>
                    </Group>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <Center h="100%">
                      <ActionIcon w="50px">
                        <IconDotsVertical></IconDotsVertical>
                      </ActionIcon>
                    </Center>
                  </Grid.Col>
                </Grid>
                <Divider my="xl"></Divider>
                <Input
                  component="select"
                  icon={<IconCheck></IconCheck>}
                  rightSection={<IconChevronDown></IconChevronDown>}
                >
                  <option value="appevent">App & Event</option>
                </Input>
                <Card mt="md" withBorder>
                  <Flex direction="column">
                    <Text>Account</Text>
                    <Group mt="md" grow>
                      <Card style={{ backgroundColor: "#F3F8FB" }}>
                        <Group position="apart">
                          <Flex direction="row" align="center">
                            <Card style={{ backgroundColor: "#FFFFFF" }}>
                              <Image
                                src="/logos/salesforce.png"
                                width="30px"
                              ></Image>
                            </Card>
                            <Text ml="md">Connect Salesforce</Text>
                          </Flex>
                          <Button>Sign In</Button>
                        </Group>
                      </Card>
                    </Group>
                  </Flex>
                </Card>
              </Card>
              <Center>
                <Divider
                  h="75px"
                  size="sm"
                  variant="dashed"
                  orientation="vertical"
                />
              </Center>
              <Card
                withBorder
                radius="xl"
                padding="xl"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.white,
                })}
              >
                <Grid>
                  <Grid.Col span={10}>
                    <Group>
                      <Card
                        shadow="sm"
                        radius="xl"
                        h="100px"
                        w="100px"
                        style={{ backgroundColor: "#F2F5F8" }}
                      >
                        <Flex
                          justify="center"
                          align="center"
                          h="100%"
                          direction="column"
                        >
                          <IconCloudStorm size="3rem"></IconCloudStorm>
                        </Flex>
                      </Card>
                      <Flex direction="column">
                        <Title order={3} size="1rem">
                          2. Enter Admin Credentials
                        </Title>
                        <Text fz="sm" italic>
                          An action will fire after the credentials are entered
                        </Text>
                      </Flex>
                    </Group>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Center h="100%">
                      <Button size="xs">Learn More</Button>
                      <ActionIcon w="50px">
                        <IconDotsVertical></IconDotsVertical>
                      </ActionIcon>
                    </Center>
                  </Grid.Col>
                </Grid>
                <Divider my="xl"></Divider>
                <Flex direction="column" gap="xs">
                  <Text>Enter Email:</Text>
                  <Input placeholder="you@company.com"></Input>
                </Flex>
                <Flex direction="column" gap="xs" mt="lg">
                  <Text>API Key:</Text>
                  <Input></Input>
                </Flex>
              </Card>
              <Center>
                <Divider
                  h="75px"
                  size="sm"
                  variant="dashed"
                  orientation="vertical"
                />
              </Center>
              <Card
                withBorder
                radius="xl"
                padding="xl"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.white,
                })}
              >
                <Grid>
                  <Grid.Col span={10}>
                    <Group>
                      <Flex direction="column">
                        <Title order={3} size="1rem">
                          Upload your Contract
                        </Title>
                        <Text fz="sm" color="gray" italic>
                          (Optional)
                        </Text>
                      </Flex>
                    </Group>
                  </Grid.Col>
                </Grid>
                <Divider my="xl"></Divider>
                <Dropzone
                  onDrop={(files) => console.log("accepted files", files)}
                  onReject={(files) => console.log("rejected files", files)}
                >
                  <Group position="center">
                    <div>
                      <Text size="xl" inline align="center">
                        Drag images here or click to select files
                      </Text>
                      <Text
                        size="sm"
                        color="dimmed"
                        inline
                        mt={7}
                        align="center"
                      >
                        Attach as many files as you like, each file should not
                        exceed 5mb
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
              </Card>
              <Center>
                <Divider
                  h="75px"
                  size="sm"
                  variant="dashed"
                  orientation="vertical"
                />
              </Center>
              <Center>
                <Button
                  style={{ backgroundColor: "#0B3D91" }}
                  size="xl"
                  onClick={() =>
                    postData(
                      "https://pnvc9fhceb.execute-api.us-east-1.amazonaws.com/dev/storage",
                      salesforceData
                    )
                      .then((responseData) => {
                        console.log(responseData);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      })
                  }
                >
                  Submit information
                </Button>
              </Center>
            </>
          )}
        </Container>
      </Flex>
    </NavbarNested>
  );
}
