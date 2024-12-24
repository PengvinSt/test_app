import {
  Box,
  ScrollArea,
  Stack,
  Group,
  Accordion,
  Badge,
  Drawer,
  Text,
  Button,
} from "@mantine/core";
import { useState, type FC } from "react";

import classes from "./HomeMain.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../../providers/AuthProvider";
type Category = { title: string; links?: string[] };

interface CategoryProps {
  category: Category;
}

const CategoryItem: FC<CategoryProps> = ({ category: { title, links } }) => {
  return (
    <Accordion classNames={classes} w="80%">
      <Accordion.Item key={title} value={title}>
        <Accordion.Control>{title}</Accordion.Control>
        <Accordion.Panel>
          <Group gap={5}>
            {links?.map((link, i) => (
              <Badge
                size="xl"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
                key={link + i}
              >
                {link}
              </Badge>
            ))}
            <Text>+</Text>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

const data = [
  { title: "category1", links: ["link1", "link2"] },
  { title: "category2", links: ["link1", "link6"] },
  { title: "category3", links: ["link1", "link3"] },
  { title: "category4", links: ["link1"] },
];

export const HomeMain: FC = () => {
  const { logout } = useAuth();
  const [category, setCategory] = useState<Category[]>(data);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer opened={opened} onClose={close} title="Menu">
        <Stack>
          <Button variant="outline" color="red" onClick={() => logout()}>
            Log Out
          </Button>
        </Stack>
      </Drawer>
      <Box w="100%" h="100%" bg="#e8eaed">
        <Stack>
          <Group p={10} px={20} bg="red" justify="space-between">
            <Button variant="filled" onClick={open}>
              Menu
            </Button>
          </Group>
          <Group w="100%" h="100%" justify="center">
            {category.map((category, i) => (
              <CategoryItem key={category.title + i} category={category} />
            ))}
          </Group>
        </Stack>
      </Box>
    </>
  );
};
