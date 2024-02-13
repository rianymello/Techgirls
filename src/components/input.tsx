import { TextInput, TextInputProps } from "react-native";

import colors from "tailwindcss/colors";

export function Input({ ...props }: TextInputProps) {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      placeholderTextColor={colors.zinc[400]}
      className="h-32 px-4 py-3 bg-zinc-800 rounded-md text-sm text-white font-regular"
      {...props}
    />
  );
}
