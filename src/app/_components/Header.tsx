import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menu = [
  {
    id: 1,
    name: "홈",
    path: "/",
  },
  {
    id: 2,
    name: "상품",
    path: "/products",
  },

  {
    id: 3,
    name: "회사소개",
    path: "/",
  },
  {
    id: 4,
    name: "문의하기",
    path: "/",
  },
];

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Image src="/logo.svg" alt="logo" width={180} height={180} />
      <ul className="flex gap-5">
        {menu.map((item) => (
          <li key={item.id} className="text-lg font-medium">
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 items-center">
        <ShoppingCart />
        <Button>로그인</Button>
      </div>
    </div>
  );
};

export default Header;
