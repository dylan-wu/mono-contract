import { Group, Title, Table, Text, ActionIcon } from "@mantine/core";
import NavbarNested from "../components/layouts/Dashboard";
import EmployeeData from "../data/employees.json" 

import {
    IconChevronLeft
} from "@tabler/icons-react";

export default function IndividualEmployee(/**props: any*/) { 

    const employeeRows = EmployeeData.find((elem) => elem.name === "Athena Doe"/**props.name*/)?.contracts.map((element) => ( 
        <tr key={element.contractID}>
            <td>
                <Text
                    component="a"
                    href="/vendors/salesforce" // make this dynamic to specific vendor
                    c="#0B3D91"
                    tt="capitalize"
                >
                    {element.companyName}
                </Text>
            </td>
            <td>
                <Text
                    c="dimmed"
                >
                    {element.contractID}
                </Text>
            </td>
            <td>
                <Text
                    c="dimmed"
                >
                    {element.licenses}
                </Text>
            </td>
            <td>
                <Text
                    c="dimmed"
                >
                    {element.amountCost}
                </Text>
            </td>
        </tr>
    ))
    return (
        <NavbarNested>
            <Group my="xl" py="xl">
                <ActionIcon color="dark">
                    <IconChevronLeft />
                </ActionIcon>
                <div>
                    <Text fz="xl">{EmployeeData[0].name}</Text>
                    <Text c="dimmed">{EmployeeData[0].email}</Text> 
                </div>
            </Group>
            <Table highlightOnHover withBorder>
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