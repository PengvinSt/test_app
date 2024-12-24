import {
  Anchor,
  Button,
  Divider,
  Flex,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import type { FC } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../ui";
import { validation, validator } from "../../config";
import { useLogin } from "../../hooks";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const AuthMain: FC = () => {
  const { loginMutation, isLoginPending } = useLogin();
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: validator({
      email: validation.email,
      password: validation.password,
    }),
  });

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    await loginMutation({ body: { email, password } });
    login("token");
    navigate("/home");
  });
  return (
    <Flex justify="center" align="center" w="100%" h="100%">
      <Paper shadow="xs" p="xl" pos="relative">
        <LoadingOverlay
          visible={isLoginPending}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack gap={10}>
          <Text size="xl" fw={700} ta="center">
            Log In
          </Text>
          <Divider my="md" />
          <FormProvider {...form}>
            <form onSubmit={handleSubmit}>
              <Stack gap={15}>
                <TextInput name="email" label="Email" />
                <TextInput name="password" label="Password" />

                <Button variant="light" color="orange" type="submit">
                  Log in
                </Button>
              </Stack>
            </form>
          </FormProvider>

          <Text>
            Don't have an account?{" "}
            <Anchor
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              fw={500}
              fz="lg"
              href="#"
            >
              register!
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Flex>
  );
};
