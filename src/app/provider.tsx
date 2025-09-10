"use client";

import { User } from "@/app/_components/Header";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { useState } from "react";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userDetail, setUserDetail] = useState<User | undefined>(undefined);
  return (
    <div>
      {/* @ts-ignore */}
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        {children}
      </UserDetailContext.Provider>
    </div>
  );
};

export default Provider;
