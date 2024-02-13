import { Image, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

interface HeaderProps {
  title: string;
  cartQuantityItems?: number;
}

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center pb-5 mb-5 mx-5 border-b border-gray">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />

        <Text className="mt-2 text-xl font-semibold text-white">{title}</Text>
      </View>

      {cartQuantityItems > 0 && (
        <Link href={"/cart"} asChild>
          <TouchableOpacity activeOpacity={0.7} className="relative">
            <Feather name="shopping-bag" size={28} color={colors.white} />

            <View className="absolute -top-2 -right-1.5 z-10 justify-center items-center h-5 w-5 bg-lime-300 rounded-full">
              <Text className="text-xs font-bold">{cartQuantityItems}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}
