import { Box, Link, VStack, Text, HStack, Img } from "@chakra-ui/react";
import ImgStar from "../../assets/Star.png";
import { t } from "i18next";

interface CardRepositoryProps {
  name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
}

const CardRepository = ({
  name,
  description,
  stargazers_count,
  updated_at,
}: CardRepositoryProps) => {
  return (
    <VStack spacing={4} align="stretch" mb={4}>
      <Box
        p={4}
        borderWidth={1}
        borderRadius="md"
        _hover={{ shadow: "md", borderColor: "#8C19D2" }}
        transition="all 0.2s"
      >
        <Link
          href={`https://github.com/${name}`}
          isExternal
          _hover={{ textDecoration: "none" }}
        >
          <Text
            fontSize="xl"
            fontFamily="Inter"
            fontWeight="700"
            color="rgba(23, 25, 35, 1)"
            _hover={{ color: "#8C19D2" }}
          >
            {name}
          </Text>
        </Link>

        <Text
          fontSize="medium"
          fontFamily="Inter"
          fontWeight="400"
          color="rgba(74, 85, 104, 1)"
          mt={2}
        >
          {description}
        </Text>

        <HStack mt={2} color="rgba(74, 85, 104, 1)" fontSize="sm" spacing={4}>
          <HStack>
            <Img src={ImgStar} alt="star icon" w="24px" h="24px" />
            <Text>{stargazers_count.toLocaleString()}</Text>
          </HStack>
          <Text>
            {t("Atualizado há")}{" "}
            {`${Math.floor(
              (new Date().getTime() - new Date(updated_at).getTime()) /
                (1000 * 60 * 60 * 24)
            )} dias`}
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

export default CardRepository;
