import { Link as ChakraLink,Text, Button, SimpleGrid, Divider, Heading, HStack, SkeletonCircle, Skeleton, Box, useColorModeValue, Img, Flex, Tooltip, chakra, Icon, Progress, Stack, VStack, StackDivider, Spacer } from '@chakra-ui/react'
import NextLink from "next/link";
import { Container } from './Container'
import Head from "next/head";
// import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";
// import { FaHandshake } from "react-icons/fa";
import { useState } from 'react';
import { ethers } from 'ethers';
import { getWEIPriceInUSD } from '../../lib/getETHPrice';


function CampaignCard({
        name,
        description,
        creatorId,
        imageURL,
        id,
        balance,
        target,
        ethPrice,
        }:{name:any,description:any,creatorId:any,imageURL:any,id:any,balance:any,target:any,ethPrice:any}) {
  return (
    <NextLink href={`/campaign/${id}`}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW={{ md: "sm" }}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition={"transform 0.3s ease"}
        _hover={{
          transform: "translateY(-8px)",
        }}
      >
        <Box height="18em">
          <Img
            src={imageURL}
            alt={`Picture of ${name}`}
            roundedTop="lg"
            objectFit="cover"
            w="full"
            h="full"
            display="block"
          />
        </Box>
        <Box p="6">
          <Flex
            mt="1"
            justifyContent="space-between"
            alignContent="center"
            py={2}
          >
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            //   isTruncated
            >
              {name}
            </Box>

            <Tooltip
              label="Contribute"
              bg={useColorModeValue("white", "gray.700")}
              placement={"top"}
              color={useColorModeValue("gray.800", "white")}
              fontSize={"1.2em"}
            >
              <chakra.a display={"flex"}>
                <Icon
                  // as={FaHandshake}
                  h={7}
                  w={7}
                  alignSelf={"center"}
                  color={"teal.400"}
                />{" "}
              </chakra.a>
            </Tooltip>
          </Flex>
          <Flex alignContent="center" py={2}>
            {" "}
            <Text color={"gray.500"} pr={2}>
              by
            </Text>{" "}
            <Heading size="base" 
            isTruncated
            >
              {creatorId}
            </Heading>
          </Flex>
          <Flex direction="row" py={2}>
            <Box w="full">
              <Box
                fontSize={"2xl"}
                isTruncated
                maxW={{ base: "	15rem", sm: "sm" }}
                pt="2"
              >
                <Text as="span" fontWeight={"bold"}>
                  {balance > 0
                    ? ethers.utils.formatEther(balance)
                    : "0, Become a Donor 😄"}
                </Text>
                <Text
                  as="span"
                  display={balance > 0 ? "inline" : "none"}
                  pr={2}
                  fontWeight={"bold"}
                >
                  {" "}
                  ETH
                </Text>
                <Text
                  as="span"
                  fontSize="lg"
                  display={balance > 0 ? "inline" : "none"}
                  fontWeight={"normal"}
                  color={useColorModeValue("gray.500", "gray.200")}
                >
                  (${getWEIPriceInUSD(ethPrice, balance)})
                </Text>
              </Box>

              <Text fontSize={"md"} fontWeight="normal">
                target of {ethers.utils.formatEther(target)} ETH ($
                {getWEIPriceInUSD(ethPrice, target)})
              </Text>
              <Progress
                colorScheme="teal"
                size="sm"
                value={Number(ethers.utils.formatEther(balance))}
                max={Number(ethers.utils.formatEther(target))}
                mt="2"
              />
            </Box>{" "}
          </Flex>
        </Box>
      </Box>
    </NextLink>
  );
}

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={useColorModeValue("gray.100", "gray.700")}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={useColorModeValue("gray.500", "gray.200")}>{text}</Text>
    </Stack>
  );
};

export const Fund = ({ campaigns,ethPrice,campaignList }:{ campaigns:any ,ethPrice:any,campaignList:any}) => (
  <><Head>
        <title>BetterFund</title>
        <meta
          name="description"
          content="Transparent Crowdfunding in Blockchain"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
    <NextLink href="/campaign/new">
      <Button
        display={{ sm: "inline-flex" }}
        fontSize={"md"}
        fontWeight={600}
        color={"white"}
        bg={"teal.400"}
        _hover={{
          bg: "teal.300",
        }}
      >
        Create Campaign
      </Button>
    </NextLink>
 
  <HStack spacing={2}>
        <SkeletonCircle size="4" />
        <Heading as="h2" size="lg">
          Open Campaigns
        </Heading>
      </HStack>

      <Divider marginTop="4" />
      {campaignList.length > 0 ? (
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
          {campaignList.map((el: any, i: any) => {
            return (
              <div key={i}>
                <CampaignCard
                  name={el[5]}
                  description={el[6]}
                  creatorId={el[4]}
                  imageURL={el[7]}
                  id={campaigns[i]}
                  target={el[8]}
                  balance={el[1]}
                  ethPrice={ethPrice} />
             </div>
            );
          })}
        </SimpleGrid>

      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
          <Skeleton height="25rem" />
          <Skeleton height="25rem" />
          <Skeleton height="25rem" />
        </SimpleGrid>
      )}
    {/* </Container> */}

 <Divider marginTop="4" />
    {/* <Container py={{ base: "4", md: "12" }} maxW={"7xl"} id="howitworks"> */}
      <HStack spacing={2}>
        <SkeletonCircle size="4" />
        <Heading as="h2" size="lg">
          How BetterFund Works
        </Heading>
      </HStack>
      <Divider marginTop="4" />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
        <Feature
          // icon={<Icon as={FcDonate} w={10} h={10} />}
          title={"Create a Campaign for Fundraising"}
          text={"It’ll take only 2 minutes. Just enter a few details about the funds you are raising for."} icon={undefined} />
        <Feature
          // icon={<Icon as={FcShare} w={10} h={10} />}
          title={"Share your Campaign"}
          text={"All you need to do is share the Campaign with your friends, family and others. In no time, support will start pouring in."} icon={undefined} />
        <Feature
          // icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
          title={"Request and Withdraw Funds"}
          text={"The funds raised can be withdrawn directly to the recipient when 50% of the contributors approve of the Withdrawal Request."} icon={undefined} />
      </SimpleGrid>

    {/* </Container> */}
    </>
  
)
