"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPages } from "../lib/fetchPages";
import { useRef, useEffect } from "react";
import PageCard from "./PageCard";

export default function InfinitePages() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } =
    useInfiniteQuery({
      queryKey: ["pages"],
      queryFn: fetchPages,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.meta?.pagination) return undefined;
        const { page, pageCount } = lastPage.meta.pagination;
        return page < pageCount ? page + 1 : undefined;
      },
    });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (status === "pending") {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 text-lg mb-2">Loading pages...</p>
        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center mt-10 p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-lg font-semibold mb-2">Error loading pages</p>
        <p className="text-red-500 text-sm">{error?.message || "Something went wrong"}</p>
      </div>
    );
  }

  const allItems = data?.pages.flatMap((page) => page.data || []) || [];

  if (allItems.length === 0) {
    return (
      <div className="text-center mt-10 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-600 text-lg">No pages found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allItems.map((item) => (
          <PageCard key={item.id} item={item} />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-12 flex justify-center items-center col-span-full mt-6">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">Loading more…</p>
          </div>
        )}
        {!hasNextPage && allItems.length > 0 && <p className="text-gray-500">No more data</p>}
      </div>
    </>
  );
}
