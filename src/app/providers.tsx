"use client";

import { PropsWithChildren, useMemo } from "react";
import { DependencyProvider } from "@presentation/providers/dependency-provider";
import QueryProvider from "@presentation/providers/query-client";
import { MovieRepositoryImpl } from "@data/repositories/movie.repository.impl";
import { createMockMovieApiClient } from "@data/datasources/mock/movie-api.client";
import { createHttpMovieApiClient } from "@data/datasources/http/movie-api.client";

export const Providers = ({ children }: PropsWithChildren) => {
  const repository = useMemo(() => {
    try {
      const apiClient = createHttpMovieApiClient();
      return new MovieRepositoryImpl(apiClient);
    } catch (error) {
      console.error("Falling back to mock movie API client", error);
      return new MovieRepositoryImpl(createMockMovieApiClient());
    }
  }, []);

  return (
    <QueryProvider>
      <DependencyProvider repository={repository}>{children}</DependencyProvider>
    </QueryProvider>
  );
};
