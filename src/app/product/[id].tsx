import { Image, Text, View } from "react-native";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { useCartStore } from "@/stores/cart-store";

export default function Products() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.filter((item) => item.id === id)[0];

  function handleAddToCart() {
    if (product) {
      cartStore.add(product);
      navigation.goBack();
    }
  }

  if (!product) {
    return <Redirect href={"/"} />;
  }

  return (
    <View className="flex-1 pb-5">
      <Image source={product.cover} resizeMode="cover" className="w-full h-52" />

      <View className="flex-1 mt-8 mx-5">
        <Text className="text-xl text-white font-semibold">{product.title}</Text>

        <Text className="text-2xl text-lime-400 font-semibold my-2">{formatCurrency(product.price)}</Text>

        <Text className="text-base text-zinc-400 font-regular leading-6 mb-6">{product.description}</Text>

        {product.ingredients.map((ingredient) => (
          <Text key={ingredient} className="text-zinc-400 text-base">
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="mx-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>

          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton href="/" className="mt-3" />
      </View>
    </View>
  );
}
