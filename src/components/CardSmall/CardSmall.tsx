import { Img, Text } from "@chakra-ui/react";

export interface CardSmallProps {
  icon: string;
  text: string;
  margin?: string;
}

const CardSmall = ({ icon, text, margin }: CardSmallProps) => {
  return (
    <>
      <Text
        as="span"
        display="flex"
        alignItems="center"
        gap={2}
        fontFamily="Inter"
        fontWeight="400"
        color="#4A5568"
        margin={margin}
        fontSize="14px"
      >
        <Img src={icon} alt="followers icon" w="24px" h="24px" />
        {text}
      </Text>
    </>
  );
};

export default CardSmall;
