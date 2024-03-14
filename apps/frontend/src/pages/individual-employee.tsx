import { Group, Title, Table, Text, ActionIcon, Card, Center } from "@mantine/core";
import NavbarNested from "../components/layouts/Dashboard";
import EmployeeData from "../data/demo_athena.json" 

import {
    IconChevronLeft
} from "@tabler/icons-react";
import DataCard from "./custom/DataCard";
import app from "next/app";

const cellStyle: React.CSSProperties = {
    backgroundColor: 'white',
    whiteSpace: "nowrap",
};

export default function IndividualEmployee(/**props: any*/) { 

    const employeeRows = EmployeeData[0].contracts.map((element) => ( 
        <tr key={element.contractID}>
            <td style={cellStyle}>
                <Group spacing="xs">
                    <Card
                        style={{ backgroundColor: "#FFFFFF" }}
                        h="25px"
                        w="25px"
                    >
                        <Center w="100%" h="100%">
                            <img
                            src={element.logoPath}
                            style={{
                                maxWidth: "20px",
                                maxHeight: "20px",
                            }}
                            ></img>
                        </Center>
                    </Card>
                    <Text
                        component="a"
                        href="/vendors/salesforce" // make this dynamic to specific vendor
                        c="#0B3D91"
                        tt="capitalize"
                    >
                        {element.companyName}
                    </Text>
                </Group>
            </td>
            <td style={cellStyle}>
                <Text
                    c="dimmed"
                >
                    {element.contractID}
                </Text>
            </td>
            <td style={cellStyle}>
                <Text
                    c="dimmed"
                >
                    {element.licenses}
                </Text>
            </td>
            <td style={cellStyle}>
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
            <Group my="xs" py="xs">
                <ActionIcon color="dark" component="a" href="/employees">
                    <IconChevronLeft />
                </ActionIcon>
                <div>
                    <Text fz="xl">{EmployeeData[0].name}</Text>
                    <Text c="dimmed">{EmployeeData[0].email}</Text> 
                </div>
            </Group>
            <Group grow style={{ margin: "0 0 20px 0"}}>
                {EmployeeData[0].cards.map((card) => (
                    <DataCard name={card.name} data={card.data} chart={card.chart} change={card.change}/>
                ))}
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