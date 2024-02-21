import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
  Center,
  Title,
  Divider,
  AppShell,
  Container,
  Flex,
  Card,
  Progress,
  Text,
} from "@mantine/core";
import { IconAppsFilled } from "@tabler/icons-react";

export default function StatsCard(props: {
  description: String;
  data: String;
}) {
  return (
    <Card
      withBorder
      radius="xl"
      padding="xl"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Text fz="1.25rem" tt="uppercase" fw={500} c="dimmed" mb="xs">
        {props.description}
      </Text>
      <Text fz="2rem" fw={600} c="#0B3D91">
        {props.data}
      </Text>
      <IconAppsFilled></IconAppsFilled>
    </Card>
  );
}
