import { Badge, Card, Text, Flex, Group } from "@mantine/core";

interface CardProps {
    name: string
    data: string
    chart: string
    change: string
}

export default function DataCard({ name, data, chart, change }: CardProps) {
    return (
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
            <Group position="apart" style={{ alignItems: "flex-start" }}>
              <Flex direction="column">
                <Text fz="1.15rem" tt="uppercase" fw={500} c="dimmed" mb="xs">
                  {name}
                </Text>
                <Text fz="2rem" fw={600} c="#0B3D91" mb="sm">
                  {data}
                </Text>
                <Text fz="sm" c="dimmed" italic>
                  <Badge> {change}</Badge> Since last month
                </Text>
              </Flex>
            </Group>
          </Card>
    )
        
}