import { z } from "zod";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/getUser";
import { gitUserSchema } from "../../schemas/gitUserSchema/gitUserSchema";
import { useMutation } from "@tanstack/react-query";
import ImgSearch from "../../assets/Linear.png";
import "./Home.css";

type GitUserFormValues = z.infer<typeof gitUserSchema>;

const Home = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<GitUserFormValues>({
    resolver: zodResolver(gitUserSchema),
  });

  const { mutate: mutationUserData } = useMutation({
    mutationFn: (username: string) => {
      return getUser(username);
    },
    onSuccess: (_, username) => {
      navigate(`/profile/${username}`);
    },
    onError: () => {
      toast({
        title: t("User not found"),
        description: t("User not found"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const handleOnSubmit = (data: GitUserFormValues) => {
    const { username } = data;
    mutationUserData(username);
  };

  return (
    <Flex w="100%" flexDir="column" justify={"center"} align="center" h="100vh">
      <Heading display="flex" gap={2} mb={8} bgClip="text" size="4xl">
        <Text
          bg="#0069CA"
          bgClip="text"
          size="5xl"
          fontWeight="500"
          fontFamily="Nunito"
        >
          {t("Search")}
        </Text>
        <Text
          bg="#8C19D2"
          bgClip="text"
          size="5xl"
          fontWeight="500"
          fontFamily="Nunito"
        >
          {t("d_evs")}
        </Text>
      </Heading>

      <form onSubmit={handleSubmit(handleOnSubmit)} className="form-home">
        <FormControl isRequired display="flex" gap={2}>
          <InputGroup size="lg" w="100%">
            <InputLeftElement pointerEvents="none" >
            <Img src={ImgSearch} alt="Search icon" w="24px" h="24px" />
            </InputLeftElement>
            <Input
                type="text"
                {...register("username")}
                placeholder={t("Search")}
                fontFamily="Inter"
                fontWeight="400"
                w="100%"
                size="lg"
              />
          </InputGroup>

          <Button
            type="submit"
            size="lg"
            px={8}
            bg="#8C19D2"
            color="white"
            fontFamily="Inter"
            fontWeight="400"
          >
            {t("Search")}
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

export default Home;
