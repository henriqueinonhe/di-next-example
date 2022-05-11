import { createContainer, InjectionMode } from "awilix";
import { merge } from "lodash";

import { AwilixContainer, dependencies, Dependencies } from "../container";

export type MockedDependencies = {
  [Key in keyof Dependencies]?: unknown;
};

export const createContainerMock = (mockedDependencies: MockedDependencies) => {
  const awilixContainer = createContainer<AwilixContainer>({
    injectionMode: InjectionMode.PROXY,
  });

  awilixContainer.register(merge(dependencies, mockedDependencies));

  return awilixContainer.cradle;
};
