import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const CardTranslation = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log(lng);
    i18n.changeLanguage(lng);
  };
  return (
    <Flex gap="2px">
      <Button
        w="15px"
        h="25px"
        bg={i18n.language === "pt" ? "#8C19D2" : "gray.300"}
        color="white"
        onClick={() => changeLanguage("pt")}
      >
        PT
      </Button>
      <Button
        w="15px"
        h="25px"
        bg={i18n.language === "en" ? "#8C19D2" : "gray.300"}
        color="white"
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
    </Flex>
  );
};

export default CardTranslation;
