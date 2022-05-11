import React, { useContext } from "react";
import { Container, container } from "../../container";

const ContainerContext = React.createContext<Container>(container);

type ContainerProviderProps = {
  container: Container;
  children: React.ReactNode;
};

export const ContainerProvider = ({
  container,
  children,
}: ContainerProviderProps) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};

export const useContainer = () => {
  const container = useContext(ContainerContext);

  if (container === undefined) {
    console.warn("No container provided!");
  }

  return container;
};
