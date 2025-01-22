"use client";

import { createContext, ReactNode, useMemo, useState } from "react";

export const LayoutContentContext = createContext<{
  SidebarContent: ReactNode;
  setSidebarContent: React.Dispatch<React.SetStateAction<ReactNode>>;
} | null>(null);

interface LayoutContentProviderProps {
  children: ReactNode;
}

export default function LayoutContentProvider({
  children,
}: LayoutContentProviderProps) {
  const [SidebarContent, setSidebarContent] = useState<ReactNode>(null);
  const providerValue = useMemo(
    () => ({ SidebarContent, setSidebarContent }),
    [SidebarContent]
  );

  return (
    <LayoutContentContext.Provider value={providerValue}>
      {children}
    </LayoutContentContext.Provider>
  );
}
