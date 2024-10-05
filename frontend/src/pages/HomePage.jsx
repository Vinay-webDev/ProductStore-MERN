import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
    console.log("products", products);
  }, [fetchProducts]);

  // products.map((p) => {
  //   console.log(p.image);
  // })
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient="linear(to-r, #49006d, #aa00d3)"
          bgClip={"text"}
          textAlign={"center"}
        >
          Currenct products📦
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 4,
          }}
          spacing={10}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length == 0 && (
          <Text fontSize={"25"} fontWeight={"bold"} color={"gray.400"}>
            No products🤧
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"#aa00d3"}
                _hover={{ textDecor: "underline" }}
              >
                create products
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;



/*

#49006d    #aa00d3
*/