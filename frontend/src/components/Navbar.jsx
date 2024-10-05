import { Button, Container, Flex, HStack,Text, useColorMode } from '@chakra-ui/react';
//import { PlusSquareIcon } from '@chakra-ui/icons';
//import { LuPlus } from "react-icons/lu";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140p"} px={4}  >
        <Flex 
        h={16} 
        alignItems={"center"} 
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row" 
        }}
        >
        <Text 
         fontSize={{base: "22", sm: "28"}}
         fontWeight={"bold"}
         textTransform={"uppercase"}
         textAlign={"center"}
         bgGradient='linear(to-r,  #49006d, #aa00d3)'
         bgClip={"text"}
        >
            <Link to={"/"} >Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
                <Button>
                    {/*<PlusSquareIcon fontSize={20} />*/}
                    {/*<LuPlus fontSize={20}/>*/}
                    <FaRegPlusSquare fontSize={25} />
                </Button>
            </Link>
            <Button onClick={toggleColorMode} >
                {/*instead of emojis we use icons*/}
                {colorMode === "light" ? <MdSunny fontSize={20} />  : <MdOutlineWbSunny fontSize={20} /> }
            </Button>
        </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar;



/* gradient ===>> #00ff99    #00eafc
                  #ff6a00    #eefc00
                  #b74a06    #ffc000
                  #49006d    #aa00d3

*/