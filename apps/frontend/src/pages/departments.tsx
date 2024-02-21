import NavbarNested from "@/components/layouts/Dashboard";
import { Group, Text, Card, Badge, Table, Flex } from "@mantine/core";
import DepartmentData from "../data/department.json";

export default function Home() {
  const rows = DepartmentData.map((element) => (
    <tr key={element.department}>
      <td>
        <Text component="a" fz="1.25rem" fw={400} c="#0B3D91" tt="capitalize">
          {element.department}
        </Text>
      </td>
      <td>
        <Badge fw={400}>{element.users}</Badge>
      </td>
      <td>
        <Badge fw={400}>{element.cost}</Badge>
      </td>
      <td>
        <Text fz="1.25rem" fw={400} c="#0B3D91">
          {element.totalApps}
        </Text>
      </td>
      <td>
        <Text fz="1.25rem" fw={400} c="#0B3D91">
          {element.totalContracts}
        </Text>
      </td>
    </tr>
  ));

  return (
    <NavbarNested>
      <Flex align="center" h="100vh">
        <Card
          withBorder
          w="100%"
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
                <th style={{ fontWeight: "400" }}>DEPARTMENT</th>
                <th style={{ fontWeight: "400" }}>TOTAL USERS</th>
                <th style={{ fontWeight: "400" }}>ANNUAL COSTS</th>
                <th style={{ fontWeight: "400" }}>TOTAL APPS</th>
                <th style={{ fontWeight: "400" }}>TOTAL CONTRACTS</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Card>
      </Flex>
    </NavbarNested>
  );
}
