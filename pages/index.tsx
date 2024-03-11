import {
  ConnectWallet,
  MediaRenderer,
  useAddress,
  useContract,
  useContractRead,
  useMetadata,
  Web3Button,
} from "@thirdweb-dev/react";
import dotenv from "dotenv";
import { NextPage } from "next";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
dotenv.config();

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = process.env.CONTRACT_ADDRESS as string;
  const { contract } = useContract(contractAddress);
  const { data: metadata, isLoading: isLoadingMetadata } =
    useMetadata(contract);

  const { data: totalMinted, isLoading: isLoadingTotalMinted } =
    useContractRead(contract, "totalMinted");

  return (
    <Container maxW={"1220px"}>
      <Flex p={"20px"} justifyContent={"space-between"}>
        <Box></Box>
        <ConnectWallet />
      </Flex>
      <Flex h={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <MediaRenderer
                src={(metadata as { image: string })?.image}
              ></MediaRenderer>
            </Skeleton>
          </Box>
          <Flex direction={"column"} justifyContent={"center"}>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <Heading>{(metadata as { name?: string })?.name}</Heading>
            </Skeleton>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <Text>{(metadata as { description?: string })?.description}</Text>
            </Skeleton>
            <Skeleton isLoaded={!isLoadingTotalMinted}>
              <p>Total Minted: {totalMinted?.toNumber()}/5</p>
            </Skeleton>
            {address ? (
              <Web3Button
                contractAddress={contractAddress}
                action={(contract) => contract.erc721.claim(1)}
              >
                Claim
              </Web3Button>
            ) : (
              <p>Please connect your wallet</p>
            )}
          </Flex>
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default Home;
