import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export function ClientOnly({ children, ...delegated }:Props) {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
}
