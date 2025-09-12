"use client";

import { UserDetailContext } from "@/app/context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

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

export type User = {
  email: string;
  name: string;
  picture: string;
};

const Header = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("tokenResponse :", tokenResponse); // 토큰 응답
      localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse));
      getUserProfile(tokenResponse.access_token);

      // TODO: 유저 정보 DB저장 (Strapi Backend)
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  // Get User Info (유저 정보 가져오기)
  const getUserProfile = async (access_token: string) => {
    try {
      const userInfo = await axios.get(
        // 구글 유저 정보 요청
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      console.log("userInfo :", userInfo); // 유저 정보

      setUser(userInfo?.data);
      setUserDetail(userInfo?.data);
      saveNewUser(userInfo?.data);
    } catch (error) {
      console.log("error :", error);
      localStorage.setItem("tokenResponse", "");
    }
  };

  const saveNewUser = async (user: User) => {
    const { name, email, picture } = user;

    const result = await axios.post("/api/users", {
      name,
      email,
      picture,
    });
    console.log("유저 로그인 후 저장 result : ", result.data);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenResponse = JSON.parse(
        localStorage.getItem("tokenResponse") || "{}"
      );

      if (tokenResponse) {
        getUserProfile(tokenResponse.access_token);
      }
    }
  }, []);

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

        {!user ? (
          <Button onClick={() => googleLogin()}>로그인</Button>
        ) : (
          <>
            <Image
              className="rounded-full"
              src={user.picture}
              alt={user.name}
              width={40}
              height={40}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
