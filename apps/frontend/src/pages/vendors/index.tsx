import NavbarNested from "@/components/layouts/Dashboard";
import { Flex, Group, Text, Card, Badge, Table } from "@mantine/core";
import VendorsData from "../../data/vendors/vendors.json";

export default function Home() {
  const rows = VendorsData.map((element) => (
    <tr key={element["App Name"]}>
      <td>
        <Group>
          <Flex w={30} h={30} align="center" justify="center">
            <img
              src={element.logo}
              style={{ maxHeight: "25px", maxWidth: "25px" }}
            ></img>
          </Flex>
          <Text
            component="a"
            href={`/vendors/${encodeURIComponent(element["App Name"])}`}
            fz="1.25rem"
            fw={400}
            c="#0B3D91"
            tt="capitalize"
          >
            {element["App Name"]}
          </Text>
        </Group>
      </td>
      <td>
        <Badge color={`${element.color}`}>{element["Status"]}</Badge>
      </td>
      <td>
        <Text fz="1.25rem" fw={400} c="#0B3D91">
          {element["Total Users"]}
        </Text>
      </td>
      <td>
        <Text fz="1.25rem" fw={400} c="#0B3D91">
          {element["Last 90 Users"]}
        </Text>
      </td>
      <td>
        <Text fz="1.25rem" fw={400} c="#0B3D91">
          {element["Category"]}
        </Text>
      </td>
      <td>
        <Text fz="1.25rem" fw={400} c="#0B3D91">
          {element["Last 12 Spend"]}
        </Text>
      </td>
      <td>
        <Text fz="1.25rem" fw={400} c="#0B3D91">
          {element["App Owner"]}
        </Text>
      </td>
    </tr>
  ));

  return (
    <NavbarNested>
      {/* <Container
        mx="-md"
        mt="-md"
        py="md"
        fluid
        style={{ backgroundColor: "white", borderBottom: "1px solid #E8E8E8" }}
      >
        <Title size="h2" c="#0B3D91">
          All your vendors
        </Title>
      </Container> */}

      <Group grow mt="md">
        <Card
          withBorder
          radius="xl"
          padding="xl"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Table>
            <thead>
              <tr>
                <th style={{ fontWeight: "400" }}>APP NAME</th>
                <th style={{ fontWeight: "400" }}>STATUS</th>
                <th style={{ fontWeight: "400" }}>TOTAL USERS</th>
                <th style={{ fontWeight: "400" }}>LAST 90 USERS</th>
                <th style={{ fontWeight: "400" }}>CATEGORY</th>
                <th style={{ fontWeight: "400" }}>LAST 12 SPEND</th>
                <th style={{ fontWeight: "400" }}>APP OWNER</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Card>
      </Group>
    </NavbarNested>
  );
}
