import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../store/productStore';

const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    //console.log(product.image);
    const {deleteProduct, updateProduct} = useProductStore();
    
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Let's create state for updatedProduct
    // here the initial state is very important as it should have the current details of the product and then we are able to update it so now I'm gonna pass in product which is initial state for this***
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleUpdatedProduct = async(pid, updatedProduct) => {
       const {success, message} =  await updateProduct(pid, updatedProduct);
        onClose();
        if (!success || !updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            toast({
                title: "Error",
                description: "Please fill in all the fields!",
                isClosable: true,
                status: "error"
            })
        } else {
            toast({
                title: "success",
                description: 'Product updated successfully!',
                isClosable: true,
                status: "success"
            })
        }
    }

    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                isClosable: true,
                status: "error"
            })
        } else {
            toast({
                title: "success",
                description: message,
                isClosable: true,
                status: "success"
            })
        }
    }

  return (
    <Box 
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
    >
        
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"}/>

        <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                {product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<FiEdit/>} colorScheme='purple' onClick={onOpen}/> 
                <IconButton icon={<MdDelete/>} colorScheme='red' onClick={() => handleDeleteProduct(product._id, updatedProduct)}  /> 
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>update product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Product name' name='name' value={updatedProduct.name} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})} />
                        <Input placeholder='Price' name='price' type='number' value={updatedProduct.price} onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                        <Input placeholder='Image URL' name='image' value={updatedProduct.image} onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdatedProduct(product._id, updatedProduct)} >update</Button>
                    <Button variant='ghost' onClick={onClose} >cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard;

/*

                #49006d    #aa00d3
 */