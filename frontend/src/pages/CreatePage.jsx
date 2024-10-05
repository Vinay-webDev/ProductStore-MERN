import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/productStore';



const CreatePage = () => {

  const [newProduct, setNewProduct] = useState(
    {
      name: "",
      price: "",
      image: ""
    }
  )
  
  const { createProduct } = useProductStore();
  const toast = useToast();


  function handleProductName (event) {
    setNewProduct( n => ({...n, name: event.target.value}))
  }

  const handleAddProduct = async () => {
    // console.log(newProduct);
    const {success, message} = await createProduct(newProduct);
    console.log("success", success);
    console.log("message", message);
    // now we need to check if the success is true then we need to have the respective toast for true and fasle
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        //duration: 5000 I'll just use the default duration**
      })
    } else {
      toast({
        title: "success",
        description: message,
        status: "success",
        isClosable: true
      })
    }
    //once we the add is successful then we need to clear the input fields back to empty string
    setNewProduct({
      name: "",
      price: "",
      image: ""
    })
  }

  return (
    <Container maxW={"container.sm"} >
      <VStack spacing={8} >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={10} color={"gray.400"}
         >
          Create new product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"} >
          <VStack spacing={4} >
            <Input
              placeholder='Product name'
              name='name'
              value={newProduct.name}
              onChange={handleProductName}
            />
            <Input
              placeholder='price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
            />
            <Input 
              placeholder='image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
            <Button 
              w={"full"}
              bgGradient='linear(to-r, #49006d, #aa00d3)'
              color={"white"}
              onClick={handleAddProduct}
            >
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>

    </Container>
  )
}

export default CreatePage;

/*fontWeight={"bold"}
         bgGradient='linear(to-r, #e600ff, #00e8ff)'
         bgClip={"text"} */
// const handleProductName = () => {
  //   (e) => setNewProduct({...newProduct, name: e.target.value});
  // }

/* #49006d    #aa00d3 */