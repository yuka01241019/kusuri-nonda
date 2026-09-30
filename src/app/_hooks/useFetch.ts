"use client";

import useSWR from "swr";
import { api } from "@/utils/api";

export const useFetch = <TResponse>(url: string) => {
  const fetcher = (url: string) => {
    return api.get<TResponse>(url);
  };
  const { data, isLoading, mutate } = useSWR(url, fetcher);
  return { data, isLoading, mutate };
};
