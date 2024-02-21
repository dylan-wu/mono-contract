import Webpage from "@/components/layouts/Webpage";
import { Carousel } from "@mantine/carousel";
import {
  AspectRatio,
  Container,
  Flex,
  Group,
  Title,
  Text,
  Grid,
  Center,
  Divider,
  Card,
  Image,
  Button,
} from "@mantine/core";

export default function Home() {
  return (
    <Webpage>
      <Container size="lg" pt={72} p={0}>
        <Grid gutter="xl" mb={72}>
          <Grid.Col span={6}>
            <Title c="#0B3D91" mb="xl" size="3.25rem">
              Your Secret Weapon for SaaS Optimization
            </Title>
            <Text fw={600} c="#0B3D91" mb="xl" size="1.5rem">
              Effortlessly manage, optimize,
              <br /> and save on your SaaS stack.
            </Text>
            <Container p={0} pr={128}>
              <Text fz="lg" c="gray" fs="italic">
                We're committed to your privacy. LL uses the information you
                provide to us to contact you about our relevant content,
                products, and services. You may unsubscribe from these
                communications at any time. For more information, check out our
                Privacy Policy.
              </Text>
            </Container>
          </Grid.Col>
          <Grid.Col span={6}>
            <Title c="#0B3D91" order={2} align="center">
              Say Goodbye to SaaS Chaos
            </Title>
            <Text c="#0B3D91" align="center" mb="md" fz="xl">
              All your applications in one, centralized, location
            </Text>
            <AspectRatio ratio={16 / 9}>
              <iframe
                style={{ borderRadius: "10px" }}
                src="https://www.youtube.com/embed/r1XHwtkBDWI"
                title="YouTube video player"
                frameBorder="0"
                allow=""
                allowFullScreen
              />
            </AspectRatio>
          </Grid.Col>
        </Grid>
        <Title c="#0B3D91" mb="8rem" size="3.25rem" align="center">
          How It Works
        </Title>
        <Flex direction="row" mb="10rem">
          <Flex direction="column" miw="50%" maw="50%">
            <Title c="#0B3D91" mb="xl" size="3.25rem">
              Integrate Your SaaS Stack in Minutes
            </Title>
            <Divider size="md" mb="xl" color="#8274EB" w={140} />
            <Text c="gray" mb="md" fz="lg" fw={400} pr="5rem">
              Supercharge your SaaS management with our intuitive platform
              enabling you to easily connect and centralize all your SaaS
              vendors in just a few minutes.
            </Text>
          </Flex>
          <Card
            radius="lg"
            style={{ boxShadow: "0px 0px 125px 0px rgba(126,111,233,0.35)" }}
            miw="50%"
            maw="50%"
          >
            <Flex
              direction="row"
              mih="100%"
              justify="center"
              align="center"
              gap="xl"
            >
              <Flex direction="column" justify="center">
                <Title c="#0B3D91" mb="xl" size="1.75rem" fw={500}>
                  <span style={{ color: "#8BC34A" }}>500+ apps,</span> Unlimited
                  Potential
                </Title>
                <Text c="#0B3D91" fz="md" fw={300}>
                  License Logic supports more apps than any other platform, so
                  you san connect the tools you use today and tomorrow.
                </Text>
              </Flex>
              <Image src="/landingpage/landing-1.png"></Image>
            </Flex>
          </Card>
        </Flex>
        <Flex direction="row" mb="10rem">
          <Card
            radius="lg"
            style={{ boxShadow: "0px 0px 125px 0px rgba(240,154,194,0.35)" }}
            miw="45%"
            maw="45%"
            mr="4rem"
          >
            <Image src="/landingpage/landing-2.png"></Image>
          </Card>
          <Flex direction="column" miw="50%" maw="50%">
            <Title c="#0B3D91" mb="xl" size="3.25rem">
              Easily Manage and Optimize SaaS Spend
            </Title>
            <Divider size="md" mb="xl" color="#F09AC2" w={140} />
            <Text c="gray" mb="md" fz="lg" fw={400}>
              Maximize your SaaS spend with unrivaled control. Identify unused
              licenses, optimize usage, and uncover cost-saving opportunities.
              Gain deep visibility, track expenses by department or vendor, and
              make data-driven decisions.
            </Text>
          </Flex>
        </Flex>
        <Flex direction="row" mb="10rem">
          <Flex direction="column" miw="50%" maw="50%">
            <Title c="#0B3D91" mb="xl" size="3.25rem">
              No More Renewal Surprises
            </Title>
            <Divider size="md" mb="xl" color="#8274EB" w={140} />
            <Text c="gray" mb="md" fz="lg" fw={400} pr="5rem">
              Receive automated reminders, track renewal negotiations, and avoid
              unnecessary costs. Plan and budget effectively, never missing a
              deadline or incurring unnecessary penalties.
            </Text>
          </Flex>
          <Card
            radius="lg"
            style={{ boxShadow: "0px 0px 125px 0px rgba(126,111,233,0.35)" }}
            miw="50%"
            maw="50%"
          >
            <Image src="/landingpage/landing-3.png"></Image>
          </Card>
        </Flex>
      </Container>
      <Container
        style={{
          width: "100%",
          maxWidth: "100%",
          marginRight: "0",
          padding: "0",
          background:
            "linear-gradient(135deg, rgba(104,79,244,0.3) 0%, rgba(33,149,227,0.3) 38%, rgba(104,79,244,0.3) 71%, rgba(216,232,249,0.3) 100%)",
        }}
      >
        <Container size="lg" p={0}>
          <Flex direction="column" py="72px">
            <Title c="#0B3D91" mb="4rem" size="3.25rem" align="center">
              Testimonial
            </Title>
            <Title c="#0B3D91" mb="4rem" size="2.5rem" align="center" fw={600}>
              “License Logic is the way that every high-growth company should be
              managing their SaaS stack -{" "}
              <span style={{ color: "#7E6EEC", fontWeight: 700 }}>
                the savings are tremendous.
              </span>
              ”
            </Title>
            <Center>
              <Flex direction="row" align="center" gap="md">
                <Image src="/landingpage/david-vital.png" maw={72}></Image>
                <Flex direction="column">
                  <Title c="#0B3D91" order={3}>
                    David Vital
                  </Title>
                  <Text c="#6B7280" italic>
                    SR. DIRECTOR FINANCE
                  </Text>
                </Flex>
              </Flex>
            </Center>
          </Flex>
        </Container>
      </Container>
      <Container size="lg" p={0}>
        <Flex direction="column" py="72px">
          <Title c="#0B3D91" mb="4rem" size="3.25rem" align="center">
            Your first integration is free!
          </Title>
          <Carousel
            height="100%"
            align="start"
            slideGap="md"
            slideSize="15%"
            slidesToScroll={1}
            mb="72px"
            loop={true}
          >
            <Carousel.Slide>
              <Card shadow="xl">
                <Center>
                  <Image
                    src="/landingpage/carousel/mailchimp-logo.svg"
                    height={56}
                    width={56}
                  ></Image>
                </Center>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card shadow="xl">
                <Center>
                  <Image
                    src="/landingpage/carousel/slack-logo.svg"
                    height={56}
                    width={56}
                  ></Image>
                </Center>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card shadow="xl">
                <Center>
                  <Image
                    src="/landingpage/carousel/creative-cloud-logo.svg"
                    height={56}
                    width={56}
                  ></Image>
                </Center>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card shadow="xl">
                <Center>
                  <Image
                    src="/landingpage/carousel/discord-logo.svg"
                    height={56}
                    width={56}
                  ></Image>
                </Center>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card shadow="xl">
                <Center>
                  <Image
                    src="/landingpage/carousel/oracle-peoplesoft-logo.svg"
                    height={56}
                    width={92}
                  ></Image>
                </Center>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card shadow="xl">
                <Center>
                  <Image
                    src="/landingpage/carousel/tableau-software-logo.svg"
                    height={56}
                    width={56}
                  ></Image>
                </Center>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card shadow="xl">
                <Center>
                  <Image
                    src="/landingpage/carousel/epic-logo.svg"
                    height={56}
                    width={56}
                  ></Image>
                </Center>
              </Card>
            </Carousel.Slide>
          </Carousel>
          <Text c="#6B7280" italic px="10rem" align="center" fz="lg" mb="72px">
            License logic with 1,000 of your favorite tools. Sync your team
            calendars, messaging apps, cloud storage, and more to keep all of
            your work organized in one place.
          </Text>
          <Center>
            <a href="https://calendly.com/joel-hereth/30min">
              <Button
                style={{ backgroundColor: "#0B3D91" }}
                size="lg"
                radius="lg"
              >
                Get Started
              </Button>
            </a>
          </Center>
        </Flex>
      </Container>
    </Webpage>
  );
}
