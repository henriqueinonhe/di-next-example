import {
  FunctionReturning,
  BuildResolverOptions,
  asFunction,
  Lifetime,
  Constructor,
  asClass,
  asValue,
  BuildResolver,
  createContainer,
  DisposableResolver,
  InjectionMode,
  Resolver,
} from "awilix";
import Axios from "axios";
import { todosInMemoryRepository } from "./infrastructure/repositories/TodosInMemoryRepository";
import { makeTodosRestRepository } from "./infrastructure/repositories/TodosRestRepository";
import { makeUseTodos } from "./view/hooks/useTodos";

export const asSingletonFunction = <T>(
  fn: FunctionReturning<T>,
  options?: BuildResolverOptions<T>
) =>
  asFunction<T>(fn, {
    ...options,
    lifetime: Lifetime.SINGLETON,
  });

export const asSingletonClass = <T>(
  constructor: Constructor<T>,
  options?: BuildResolverOptions<T>
) =>
  asClass(constructor, {
    ...options,
    lifetime: Lifetime.SINGLETON,
  });

export const dependencies = {
  apiBaseUrl: asValue(process.env.NEXT_PUBLIC_API_BASE_URL),
  axiosClient: asSingletonFunction(({ apiBaseUrl }: { apiBaseUrl: string }) =>
    Axios.create({ baseURL: apiBaseUrl })
  ),
  todosRepository: asSingletonFunction(makeTodosRestRepository),
  useTodos: asSingletonFunction(makeUseTodos),
};

export type Dependencies = typeof dependencies;

type ExtractResolverType<T> = T extends Resolver<infer U>
  ? U
  : T extends BuildResolver<infer U>
  ? U
  : T extends DisposableResolver<infer U>
  ? U
  : never;

export type AwilixContainer = {
  [Key in keyof Dependencies]: ExtractResolverType<Dependencies[Key]>;
};

const awilixContainer = createContainer<AwilixContainer>({
  injectionMode: InjectionMode.PROXY,
});

awilixContainer.register(dependencies);

export const container =
  // In non-productive or test environments we spread
  // the awilixContainer as it triggers
  // the dependency resolution process,
  // so that if there's any trouble in
  // the resolution process, we will find it
  // as soon as the application starts, as opposed
  // to only when we instantiate the problematical dependencies
  process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test"
    ? {
        ...awilixContainer.cradle,
      }
    : awilixContainer.cradle;

export type Container = typeof container;
