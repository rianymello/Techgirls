import { useRef, useState } from "react";
import { FlatList, SectionList, Text, View } from "react-native";
import { Link } from "expo-router";

import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
import { ProductCard } from "@/components/product-card";

import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { useCartStore } from "@/stores/cart-store";

export default function Home() {
  const cartStore = useCartStore();
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0);

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory);

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="flex-1 py-8" style={{ backgroundColor: "white" }}>
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <CategoryButton title={item} isSelected={item == category} onPress={() => handleCategorySelect(item)} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        className="max-h-10 mb-5"
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <ProductCard data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => <Text className="pt-6 pb-3 text-2xl text-white font-semibold">{title}</Text>}
        className="flex-1 px-5"
      />
    </View>
  );
}
