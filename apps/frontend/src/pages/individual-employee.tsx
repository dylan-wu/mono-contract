import { Group, Title, Table, Text } from "@mantine/core";
import NavbarNested from "../components/layouts/Dashboard";
import EmployeeData from "../data/employees.json"

export default function Home() {
    const employeeRows = EmployeeData.map((element) => (
        <tr key={element.contractID}>
            <td>
                <Text
                    component="a"
                    href="/vendors/salesforce" // make this dynamic to specific vendor
                    fz="1.5rem"
                    fw={600}
                    c="#0B3D91"
                    tt="capitalize"
                >
                    {element.companyName}
                </Text>
            </td>
            <td>
                <Text>
                    {element.contractID}
                </Text>
            </td>
            <td>
                <Text>
                    {element.licenses}
                </Text>
            </td>
            <td>
                <Text>
                    {element.amountCost}
                </Text>
            </td>
        </tr>
    ))
    return (
        <NavbarNested>
            <Group>
                <Title size="h2"></Title>
            </Group>
            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>CONTRACT ID</th>
                        <th>LICENSES</th>
                        <th>AMOUNT COST</th>
                    </tr>
                </thead>
                <tbody>{employeeRows}</tbody>
            </Table>
        </NavbarNested>
    );
}