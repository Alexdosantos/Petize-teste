import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Container,
  Grid,
  VStack,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Img,
  Spinner,
  LinkOverlay,
  LinkBox,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { getUser } from "../../services/getUser";

import ImgSearch from "../../assets/Linear.png";
import Imgfollowers from "../../assets/followers.png";
import ImgHeart from "../../assets/heart.png";
import ImgWork from "../../assets/work.png";
import ImgLocation from "../../assets/location.png";
import ImgEmail from "../../assets/email.png";
import ImgLink from "../../assets/link.png";
import ImgTwitter from "../../assets/Twitter.png";
import CardSmall from "../../components/CardSmall/CardSmall";
import CardRepository from "../../components/CardRepository/CardRepository";
import CardProfile from "../../components/CardProfile/CardProfile";
import { getUserRepos, GithubRepo } from "../../services/getUserRepos";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export default function Profile() {
  const { username } = useParams();
  const { t } = useTranslation();
  const loaderRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const [filteredRepos, setFilteredRepos] = useState<GithubRepo[]>([]); // Estado para os repositórios filtrados
  const [isSearching, setIsSearching] = useState(false); // Estado para indicar se está pesquisando
  const [sort, setSort] = useState("updated"); // Estado para o parâmetro de ordenação
  const [order, setOrder] = useState("desc"); // Estado para a direção da ordenação

  const { data: dataGetUser } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["getAllRepos", username, sort, order],
    queryFn: ({ pageParam = 1 }) =>
      getUserRepos(username, pageParam, sort, order),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  // Função para carregar todas as páginas de repositórios
  const loadAllRepos = async () => {
    let allRepos: GithubRepo[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const repos = await getUserRepos(username, page, sort, order);
      if (repos.length > 0) {
        allRepos = [...allRepos, ...repos];
        page++;
      } else {
        hasMore = false;
      }
    }

    return allRepos;
  };

  // Função para pesquisar repositórios
  const handleSearch = async (term: string) => {
    if (!term) {
      // Se o termo de pesquisa estiver vazio, exibe todos os repositórios
      if (data) {
        setFilteredRepos(data.pages.flat());
      }
      return;
    }

    setIsSearching(true); // Inicia o estado de pesquisa

    // Carrega todas as páginas de repositórios
    const allRepos = await loadAllRepos();

    // Filtra os repositórios com base no termo de pesquisa
    const filtered = allRepos.filter((repo) =>
      repo.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filtered.length > 0) {
      // Move o repositório encontrado para o topo da lista
      const foundRepo = filtered[0];
      const remainingRepos = allRepos.filter(
        (repo) => repo.id !== foundRepo.id
      );
      setFilteredRepos([foundRepo, ...remainingRepos]);
    } else {
      // Se não encontrar, exibe todos os repositórios
      setFilteredRepos(allRepos);
    }

    setIsSearching(false); // Finaliza o estado de pesquisa
  };

  // Atualiza a lista de repositórios filtrados quando os dados mudam
  useEffect(() => {
    if (data) {
      setFilteredRepos(data.pages.flat());
    }
  }, [data]);

  // Refaz a busca quando o parâmetro de ordenação ou a direção mudam
  useEffect(() => {
    refetch();
  }, [sort, order, refetch]);

  // Observador para scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Container maxW="container.xl" py={8}>
      <Grid
        templateColumns={{ base: "1fr", md: "300px 1fr" }}
        gap={8}
        display={{ base: "none", md: "grid" }}
      >
        <LinkBox>
          <LinkOverlay href="/">
            <Flex gap={2}>
              <Text
                bg="#0069CA"
                bgClip="text"
                fontSize="32px"
                fontWeight="500"
                fontFamily="Nunito"
              >
                {t("Search")}
              </Text>
              <Text
                bg="#8C19D2"
                bgClip="text"
                fontSize="32px"
                fontWeight="500"
                fontFamily="Nunito"
              >
                {t("d_evs")}
              </Text>
            </Flex>
          </LinkOverlay>
        </LinkBox>
        <Box>
          <InputGroup size="lg" w="70%">
            <InputLeftElement pointerEvents="none">
              <Img src={ImgSearch} alt="Search icon" w="24px" h="24px" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder={username}
              fontFamily="Inter"
              fontWeight="400"
              borderRadius="6px"
              border="2px solid #8C19D2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchTerm);
                }
              }}
            />
          </InputGroup>
        </Box>
      </Grid>
      <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={10} mt="5%">
        <Box>
          <VStack
            spacing={4}
            align="stretch"
            p={{ base: 0, md: 4 }}
            borderRadius="10px"
          >
            <CardProfile
              name={dataGetUser?.name || username || ""}
              id={`@${dataGetUser?.login}`}
              avatar_url={dataGetUser?.avatar_url || ""}
            />

            <Flex gap={4} display={{ base: "flex", md: "none" }}>
              <CardSmall
                icon={Imgfollowers}
                text={`${dataGetUser?.followers || 0} seguidores`}
              />
              <CardSmall
                icon={ImgHeart}
                text={`${dataGetUser?.following || 0} seguindo`}
              />
            </Flex>

            <Text as="span" fontFamily="Inter" fontWeight="400" mt={4}>
              {dataGetUser?.bio || ""}
            </Text>

            <Flex
              flexDirection={{ md: "column", base: "row" }}
              display="flex"
              gap={4}
              flexWrap={{ base: "wrap", md: "nowrap" }}
              flexGrow={{ base: 1, md: 0 }}
            >
              <Box display={{ base: "none", md: "block" }}>
                <CardSmall
                  icon={Imgfollowers}
                  text={`${dataGetUser?.followers || 0} ${t("Seguidores")}`}
                />
                <CardSmall
                  icon={ImgHeart}
                  text={`${dataGetUser?.following || 0} ${t("Seguindo")}`}
                  margin="0 0 25px 0"
                />
              </Box>

              <CardSmall icon={ImgWork} text={dataGetUser?.company || ""} />

              <CardSmall
                icon={ImgLocation}
                text={dataGetUser?.location || ""}
              />
              <CardSmall icon={ImgEmail} text={dataGetUser?.email || ""} />

              <LinkBox>
                <LinkOverlay
                  href={dataGetUser?.blog || undefined}
                  target="_blank"
                >
                  <CardSmall icon={ImgLink} text={dataGetUser?.blog || ""} />
                </LinkOverlay>
              </LinkBox>

              <LinkBox>
                <LinkOverlay
                  href={
                    dataGetUser?.twitter_username
                      ? `https://twitter.com/${dataGetUser.twitter_username}`
                      : undefined
                  }
                  target="_blank"
                >
                  <CardSmall
                    icon={ImgTwitter}
                    text={
                      dataGetUser?.twitter_username
                        ? `@${dataGetUser.twitter_username}`
                        : ""
                    }
                  />
                </LinkOverlay>
              </LinkBox>
            </Flex>
          </VStack>
          <LinkBox>
            <LinkOverlay
              href={dataGetUser?.blog || undefined}
              target="_blank"
              display={{ base: "none", md: "flex" }}
              justifyContent="center"
              alignItems="center"
              w="full"
              h="50px"
              textAlign={"center"}
              fontSize="18px"
              fontFamily="Inter"
              fontWeight="600"
              borderRadius="6px"
              bg="#8C19D2"
              color="white"
              mt={8}
            >
              {t("Contato")}
            </LinkOverlay>
          </LinkBox>
        </Box>

        {/* Listagem de repositórios */}
        <Box>
          {/* Seletor de ordenação */}
          <Flex gap={4} mb={4}>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              w="200px"
            >
              <option value="updated">{t("Atualizado")}</option>
              <option value="created">{t("Data de criação")}</option>
              <option value="stars">{t("Estrelas")}</option>
              <option value="pushed">{t("Push")}</option>
              <option value="full_name">{t("Nome")}</option>
            </Select>
            <Select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              w="150px"
            >
              <option value="desc">{t("Decrescente")}</option>
              <option value="asc">{t("Crescente")}</option>
            </Select>
          </Flex>

          {isSearching ? (
            <Flex justify="center" mt={4}>
              <Spinner size="lg" color="purple.500" />
              <Text ml={2}>{t("Buscando repositório...")}</Text>
            </Flex>
          ) : (
            <>
              {filteredRepos.map((repo) => (
                <div key={repo.id}>
                  <CardRepository
                    name={repo.name}
                    description={repo.description || ""}
                    stargazers_count={repo.stargazers_count}
                    updated_at={repo.updated_at}
                  />
                </div>
              ))}
              {(isLoading || isFetchingNextPage) && (
                <Flex justify="center" mt={4}>
                  <Spinner size="lg" color="purple.500" />
                </Flex>
              )}
              <div ref={loaderRef}></div>
            </>
          )}
        </Box>
      </Grid>
    </Container>
  );
}
