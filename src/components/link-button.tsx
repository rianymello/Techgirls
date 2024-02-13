import { Link, LinkProps } from "expo-router";

export function LinkButton({ ...props }: LinkProps<string>) {
  return (
    <Link className="py-1 text-base text-white text-center font-regular" {...props}>
      Voltar ao cardápio
    </Link>
  );
}
