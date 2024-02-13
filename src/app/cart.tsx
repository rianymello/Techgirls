import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";

import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { Input } from "@/components/input";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";

export default function Cart() {
  const cartStore = useCartStore();
  const [address, setAddress] = useState("");

  const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0));

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }

  function handleCreateOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe o endereço para entrega!");
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("");

    const message = `🍔 NOVO PEDIDO 🍔
    Entregar em: ${address}

    ${products}

    Total: ${total}`;

    // Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

    cartStore.clear();
    router.push("/checkout");
  }

  return (
    <View className="flex-1 pt-8 pb-5">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          {cartStore.products.length > 0 ? (
            <>
              <View className="flex-1 pb-1 mb-5 mx-5 border-b border-gray">
                {cartStore.products.map((product) => (
                  <ProductCard key={product.id} data={product} onPress={() => handleProductRemove(product)} />
                ))}
              </View>

              <View className="flex-row mx-5 mb-4">
                <Text className="text-xl text-white font-semibold">Total: </Text>
                <Text className="ml-2 text-2xl text-lime-400 font-bold">{total}</Text>
              </View>

              <View className="mx-5 pb-5">
                <Input
                  onChangeText={(text) => setAddress(text)}
                  blurOnSubmit={true}
                  onSubmitEditing={handleCreateOrder}
                  returnKeyType="next"
                  placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                />
              </View>
            </>
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-sm text-white font-medium">Seu carrinho está vazio</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="mx-5">
        <Button onPress={handleCreateOrder}>
          <Button.Text>Enviar pedido</Button.Text>

          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" className="mt-3" />
      </View>
    </View>
  );
}
