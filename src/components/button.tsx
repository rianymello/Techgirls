import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

interface ButtonTextProps {
  children: ReactNode;
}

interface ButtonIconProps {
  children: ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className="flex-row justify-center items-center h-12 bg-lime-400 rounded-md" {...props}>
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonIconProps) {
  return <Text className="mx-2 text-base text-black font-semibold">{children}</Text>;
}

function ButtonIcon({ children }: ButtonTextProps) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
