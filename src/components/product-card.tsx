import { forwardRef } from "react";
import { Image, ImageProps, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface Data {
  id: string;
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
}

interface ProductCardProps extends TouchableOpacityProps {
  data: Data;
}

export const ProductCard = forwardRef<TouchableOpacity, ProductCardProps>(({ data, ...props }, ref) => {
  return (
    <TouchableOpacity ref={ref} activeOpacity={0.7} className="flex-row items-center w-full pb-4" {...props}>
      <Image source={data.thumbnail} className="h-20 w-20 rounded-md" />

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-white font-medium">{data.title}</Text>

          {data.quantity && <Text className="text-sm text-white font-medium">x {data.quantity}</Text>}
        </View>

        <Text className="mt-0.5 text-sm text-zinc-400 leading-5">{data.description}</Text>
      </View>
    </TouchableOpacity>
  );
});
