import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link as ChakraLink, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useWallet } from 'use-wallet';

import { Container } from './Container'

export const CTA = () => {
  const wallet = useWallet();
  return (
  <Container
    flexDirection="row"
    position="fixed"
    bottom={0}
    width="full"
    maxWidth="3xl"
    py={3}
  >
    {wallet.status === "connected" ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {wallet.account.substr(0, 10) + "..."}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => wallet.reset()}>
                    {" "}
                    Disconnect Wallet{" "}
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <div>
                <Button
                  // display={{ base: "none", md: "inline-flex" }}
                  fontSize={"md"}
                  fontWeight={600}
                  color={"white"}
                  bg={"teal.400"}
                  // href={"#"}
                  _hover={{
                    bg: "teal.300",
                  }}
                  onClick={() => wallet.connect("injected")}
                >
                  Connect Wallet{" "}
                </Button>
              </div>
            )}
    <Button
      as={ChakraLink}
      isExternal
      href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui-typescript"
      variant="solid"
      colorScheme="green"
      rounded="button"
      flexGrow={3}
      // mx={2}
      width="full"
    >
      View Repo
    </Button>
  </Container>
  )
                }
