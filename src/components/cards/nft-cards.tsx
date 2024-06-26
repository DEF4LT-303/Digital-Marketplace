import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Product } from "@prisma/client";

const NFTCards = (product: Product) => {
  return (
    <Card
      className="py-4 my-5 h-[330px] bg-primary-foreground border hover:-translate-y-1"
      radius="sm"
      isPressable
      onPress={() => (window.location.href = `/products/${product.id}`)}
    >
      <CardBody className="overflow-visible py-2">
        <Image
          alt={product.name}
          className="w-full object-cover h-[240px]"
          shadow="sm"
          radius="sm"
          width="100%"
          src={product.images[0]}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{product.name}</b>
        <p className="text-primary-500">
          {product.category === "NFT" ? "ETH" : "$"} {product.price}
        </p>
      </CardFooter>
    </Card>
  );
};

export default NFTCards;
