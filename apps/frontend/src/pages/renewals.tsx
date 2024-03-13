import NavbarNested from "../components/layouts/Dashboard";
import {
  Flex,
  Group,
  Title,
  Text,
  Card,
  Grid,
  Center,
  Container,
  Button,
} from "@mantine/core";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import RenewalsData from "../data/renewals.json";
import { assign } from "lodash";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";

export default function Home() {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const pieData = [
    { x: "Operation", y: 27, amount: "10k" },
    { x: "Design", y: 20, amount: "20k" },
    { x: "Finances", y: 5, amount: "20k" },
    { x: "Human Resource", y: 15, amount: "30k" },
    { x: "Developer Tools", y: 10, amount: "40k" },
    { x: "IT & Security", y: 10, amount: "50k" },
    { x: "Analytics & BI", y: 5, amount: "60k" },
    { x: "Sales & Marketing", y: 8, amount: "70k" },
  ];

  const totalAmount = pieData.reduce(
    (acc, item) => acc + parseInt(item.amount, 10),
    0
  );

  const updatedPieData = pieData.map((item) => ({
    ...item,
    y: (parseInt(item.amount, 10) / totalAmount) * 100,
  }));

  const colorScale = [
    "#EB8995",
    "#7DDC92",
    "#0B3D91",
    "#2450F2",
    "#33D5FC",
    "#88A9F0",
    "#4EBFA4",
    "#B590D1",
  ];
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const RenewalBar = (props: any) => {
    const { x, y, width, height } = props;

    return (
      <svg
        width={16}
        height={96}
        viewBox="0 0 16 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={16} height={96} rx="3.87619" fill="#469EDF" />
      </svg>
    );
  };

  const ChartTheme = {
    axis: assign({
      style: {
        grid: {
          fill: "none",
          stroke: "none",
          pointerEvents: "painted",
        },
      },
      ticks: {
        fill: "transparent",
        size: 5,
        stroke: "#EFEFEF",
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      tickLabels: {
        padding: 24,
      },
    }),
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <NavbarNested>
      <Group grow mt="md" align="top">
        <Card
          withBorder
          radius="xl"
          padding="xl"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Flex direction="column" mb="xl">
            <Title c="#0B3D91" size="h2" align="left">
              Renewals
            </Title>
          </Flex>
          <Container px="0">
            <Card withBorder radius="xl">
              <VictoryChart
                domainPadding={{ x: 15 }}
                theme={VictoryTheme.material}
                width={500}
              >
                <VictoryAxis></VictoryAxis>
                <VictoryAxis
                  dependentAxis
                  tickValues={[200, 400, 600, 800]}
                  tickFormat={(x) => `$${x}k`}
                ></VictoryAxis>
                <VictoryBar
                  data={[
                    { x: "Jan", y: 210 },
                    { x: "Feb", y: 423 },
                    { x: "Mar", y: 703 },
                    { x: "Apr", y: 584 },
                    { x: "May", y: 177 },
                    { x: "Jun", y: 698 },
                    { x: "July", y: 439 },
                  ]}
                  barRatio={0.4}
                  cornerRadius={{
                    topLeft: 3,
                    topRight: 3,
                  }}
                  style={{
                    data: { fill: "#469EDF" },
                  }}
                  labels={({ datum }) => `$${datum.y}k`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutPadding={({ text }) =>
                        text.length > 1
                          ? { top: 8, bottom: 8, left: 8, right: 8 }
                          : 7
                      }
                      flyoutStyle={{ fill: "#EFF6FC", strokeWidth: 0 }}
                    />
                  }
                />
              </VictoryChart>
            </Card>
          </Container>
        </Card>
        <Card
          withBorder
          radius="xl"
          padding="xl"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Flex direction="column" mb="xl">
            <Title c="#0B3D91" size="h2" align="left">
              Renewal by Department
            </Title>
            <Text c="gray" align="left">
              Next 12 months. Contracts with renewal costs
            </Text>
          </Flex>
          <Center h="80%">
            <Grid w="100%" align="center">
              <Grid.Col span={6}>
                <VictoryPie
                  colorScale={colorScale}
                  data={updatedPieData}
                  padAngle={0.5}
                  innerRadius={100}
                  labelRadius={({ innerRadius }) =>
                    (innerRadius ? Number(innerRadius) : 100) + 14
                  }
                  labels={({ datum }) => datum.x}
                  style={{
                    labels: { fill: "transparent" }, // This will hide the labels
                  }}
                  events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onMouseOver: () => [
                          {
                            target: "data",
                            mutation: (props) => {
                              setHoveredSlice(props.datum.x);
                              // @ts-ignore
                              return {
                                radius: ({ datum }: { datum: { x: string } }) =>
                                  datum.x === props.datum.x ? 175 : 100, // Adjust the value to get the desired effect
                              };
                            },
                          },
                        ],
                        onMouseOut: () => [
                          {
                            target: "data",
                            mutation: () => {
                              setHoveredSlice(null);
                              return null;
                            },
                          },
                        ],
                      },
                    },
                  ]}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Grid align="center">
                  {pieData.map((item, index) => (
                    <React.Fragment key={item.x}>
                      <Grid.Col span={1}>
                        <svg width="16" height="16" fill={colorScale[index]}>
                          <rect
                            width="16"
                            height="16"
                            rx="4"
                            fill={colorScale[index]}
                          />
                        </svg>
                      </Grid.Col>
                      <Grid.Col span={9}>
                        <Text
                          style={{
                            color: hoveredSlice === item.x ? "#0B3D91" : "gray",
                            fontWeight:
                              hoveredSlice === item.x ? "bold" : "normal",
                          }}
                        >
                          {item.x}
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Text
                          style={{
                            color: hoveredSlice === item.x ? "#0B3D91" : "gray",
                          }}
                        >
                          ${item.amount}
                        </Text>
                      </Grid.Col>
                    </React.Fragment>
                  ))}
                  <Grid.Col span={10} style={{ fontWeight: 600 }}>
                    <Text c="#0B3D91">Total</Text>
                  </Grid.Col>
                  <Grid.Col span={2} style={{ fontWeight: 600 }}>
                    <Text c="#0B3D91">${totalAmount}k</Text>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </Center>
        </Card>
      </Group>
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
          <Flex direction="column" mb="xl">
            <Group position="apart">
              <Title c="#0B3D91" size="h2">
                2024
              </Title>
              <Button
                size="lg"
                leftIcon={<IconPlus />}
                style={{ backgroundColor: "#0B3D91" }}
              >
                Reminder
              </Button>
            </Group>
            <Grid mt="xl">
              {RenewalsData.map((month) => (
                <Grid.Col span={3}>
                  <Card
                    withBorder
                    radius="md"
                    style={{ backgroundColor: "#EFF9FF" }}
                  >
                    <Flex direction="column">
                      <Text>{month.month}</Text>
                      <Text fz="sm" color="gray">
                        {month.numApps} apps
                      </Text>
                      <Flex direction="row" wrap="wrap" gap="md" mt="xl">
                        {month.apps.map((app) => (
                          <Card
                            style={{ backgroundColor: "#FFFFFF" }}
                            h="40px"
                            w="40px"
                          >
                            <Center w="100%" h="100%">
                              <img
                                src={app.logo}
                                style={{
                                  maxWidth: "30px",
                                  maxHeight: "30px",
                                }}
                              ></img>
                            </Center>
                          </Card>
                        ))}
                      </Flex>
                    </Flex>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Flex>
        </Card>
      </Group>
    </NavbarNested>
  );
}
