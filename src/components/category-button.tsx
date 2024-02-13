import clsx from "clsx";
import { Pressable, PressableProps, Text } from "react-native";

interface CategoryButtonProps extends PressableProps {
  title: string;
  isSelected?: boolean;
}

export function CategoryButton({ title, isSelected = false, ...props }: CategoryButtonProps) {
  return (
    <Pressable
      className={clsx("justify-center h-10 px-4 bg-zinc-800 rounded-md border-2 border-transparent", isSelected && "border-lime-400")}
      {...props}
    >
      <Text className="text-sm text-white font-medium">{title}</Text>
    </Pressable>
  );
}
