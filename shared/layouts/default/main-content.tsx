import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function MainContent({ children }: Props) {
  return <div className="h-full">{children}</div>;
}

export default MainContent;
