import React from "react";
import { Button } from "../ui/button";

interface ButtonWithLoadingProps {
  loading: boolean;
  children: React.ReactNode;
  onClick: () => Promise<void>;
}

const ButtonWithLoading = ({
  loading = false,
  children,
  ...props
}: ButtonWithLoadingProps) => {
  return (
    <Button disabled={loading} {...props}>
      {loading && <p>Loading...</p>}
      {children}
    </Button>
  );
};

export default ButtonWithLoading;
