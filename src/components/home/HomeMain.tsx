import {
  Box,
  Stack,
  Group,
  Accordion,
  Badge,
  Drawer,
  Button,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useState, useEffect, type FC } from "react";

import classes from "./HomeMain.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../../providers/AuthProvider";
type Category = { title: string; links?: string[] };
/**
 * КОД ПОЛНЕЙШИ КАЛ ГОВНА, ПЕРЕДЕЛАТЬ ПО СУТИ 99% ЛОГИКИ ОБЯЗАТЕЛЬНО. НЕ ДОБАВЛЯТЬ ЛИНКИ И КАТЕГОРИИ С ОДИНАКОВЫМ НАЗВАНИЕМ
 * ЭТО НЕ ХЕНДЛИТЬСЯ АБСОЛЮТНО И УДАЛЕНИЕ БУДЕТ НЕ ПРАВИЛЬНЫМ, ЭТО ВСЕ ОДНА ГИГАТСКАЯ ЗАГЛУШКА ЧИСТО ЧТО БЫ ПОКАЗАТЬ НА ДЕМО
 * ПЛЮС НАДО ПОЛНОСТЬЮ ПЕРЕДЕЛАТЬ АУТЕНТИФИКАЦИЮ, ПОТОМУ ЧТО ЭТО ТОЖЕ ГОВНО
 * ЕЩЁ РАЗ, ЭТО ГОВНО, НЕ ДЕЛАТЬ ТАК, НЕ ПОВТОРЯТЬ, ДЕРЖАТЬСЯ ОТ КОДА ПОДАЛЬШЕ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
interface CategoryProps {
  category: Category;
  onRemove: () => void;
}

const AddLinkModal: FC<{
  opened: boolean;
  onClose: () => void;
  onAdd: (link: string) => void;
}> = ({ opened, onClose, onAdd }) => {
  const [link, setLink] = useState("");

  const handleAdd = () => {
    onAdd(link);
    setLink("");
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add new link">
      <Stack>
        <TextInput
          value={link}
          onChange={(event) => setLink(event.currentTarget.value)}
        />
        <Button onClick={handleAdd}>Add Link</Button>
      </Stack>
    </Modal>
  );
};
const CategoryItem: FC<CategoryProps> = ({
  category: { title, links },
  onRemove,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryLinks, setCategoryLinks] = useState(links || []);

  const handleAddLink = (newLink: string) => {
    const updatedLinks = [...categoryLinks, newLink];
    setCategoryLinks(updatedLinks);
    updateLocalStorage(updatedLinks);
  };

  const handleRemoveLink = (linkToRemove: string) => {
    const updatedLinks = categoryLinks.filter((link) => link !== linkToRemove);
    setCategoryLinks(updatedLinks);
    updateLocalStorage(updatedLinks);
  };

  const updateLocalStorage = (updatedLinks: string[]) => {
    const savedCategories = getSavedCategories();
    const updatedCategories = savedCategories.map((cat: Category) =>
      cat.title === title ? { ...cat, links: updatedLinks } : cat
    );
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const getSavedCategories = (): Category[] => {
    return JSON.parse(localStorage.getItem("categories") || "[]");
  };

  return (
    <>
      <AddLinkModal opened={opened} onClose={close} onAdd={handleAddLink} />
      <Accordion classNames={classes} w="80%">
        <Accordion.Item key={title} value={title}>
          <Accordion.Control>
            <Group>
              {title}
              <Text onClick={onRemove} style={{ cursor: "pointer" }} c='red'>
                X
              </Text>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Group gap={5}>
              {categoryLinks.map((link, i) => (
                <Badge
                  size="xl"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                  key={link + i}
                >
                  <Group>
                    {link}
                    <Text
                      onClick={() => handleRemoveLink(link)}
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </Text>
                  </Group>
                </Badge>
              ))}
              <Badge
                size="xl"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
                onClick={open}
              >
                + add new
              </Badge>
            </Group>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

const data = [
  { title: "category1", links: ["link1", "link2"] },
  { title: "category2", links: ["link1", "link6"] },
  { title: "category3", links: ["link1", "link3"] },
  { title: "category4", links: ["link1"] },
];

const AddCategoryModal: FC<{
  opened: boolean;
  onClose: () => void;
  onAdd: (category: Category) => void;
}> = ({ opened, onClose, onAdd }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    onAdd({ title, links: [] });
    setTitle("");
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add new category">
      <Stack>
        <TextInput
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          placeholder="Enter new category title"
        />
        <Button onClick={handleAdd}>Add Category</Button>
      </Stack>
    </Modal>
  );
};

export const HomeMain: FC = () => {
  const { logout } = useAuth();
  const [category, setCategory] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : data;
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [
    addCategoryOpened,
    { open: openAddCategory, close: closeAddCategory },
  ] = useDisclosure(false);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(category));
  }, [category]);

  const handleAddCategory = (newCategory: Category) => {
    const updatedCategories = [...category, newCategory];
    setCategory(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const handleRemoveCategory = (title: string) => {
    const updatedCategories = category.filter((cat) => cat.title !== title);
    setCategory(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Menu">
        <Stack>
          <Button variant="outline" onClick={openAddCategory}>
            Add Category
          </Button>
          <Button variant="outline" color="red" onClick={logout}>
            Logout
          </Button>
        </Stack>
      </Drawer>
      <AddCategoryModal
        opened={addCategoryOpened}
        onClose={closeAddCategory}
        onAdd={handleAddCategory}
      />
      <Box w="100%" h="100%" bg="#e8eaed">
        <Stack>
          <Group p={10} px={20} bg="red" justify="space-between">
            <Button variant="filled" onClick={open}>
              Menu
            </Button>
          </Group>
          <Group w="100%" h="100%" justify="center">
            {category.map((category) => (
              <CategoryItem
                key={category.title}
                category={category}
                onRemove={() => handleRemoveCategory(category.title)}
              />
            ))}
          </Group>
        </Stack>
      </Box>
    </>
  );
};
