import { Avatar, Flex, Text, WrapItem } from "@chakra-ui/react";

export type CardProfileProps = {
  name: string;
  id: string;
  avatar_url: string;
};

const CardProfile = ({ name, id, avatar_url }: CardProfileProps) => {
  return (
    <>
      <Flex>
        <WrapItem>
          <Avatar name={name} src={avatar_url} />
        </WrapItem>
        <Flex direction="column" ml={4}>
          <Text fontSize="2xl" fontFamily="Inter" fontWeight="700">
            {name}
          </Text>
          <Text color="#A0AEC0" fontFamily="Inter" fontWeight="400">
            {id}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default CardProfile;
