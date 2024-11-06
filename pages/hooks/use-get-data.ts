import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface IPropsQuery {
  data: Array<{ name: string; id: number }>;
  previousId: number;
  nextId: number;
}

export const useGetData = () =>
  useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }): Promise<IPropsQuery> => {
      const response = await axios.get(`/api/projects?cursor=${pageParam}`);
      return await response.data;
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  });
