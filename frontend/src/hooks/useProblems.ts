import type { ProblemsForm, ProblemsResponse } from "@/types/problems";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useProblems = () => {
  const queryClient = useQueryClient();

  const { data: problems, isLoading } = useQuery<ProblemsResponse[]>({
    queryKey: ["problems"],
    queryFn: () => axios.get("/problems/all").then((res) => res.data),
  });

  const addProblem = useMutation({
    mutationFn: (data: ProblemsForm) => axios.post("/problems/add", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });

  const editProblem = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ProblemsResponse>;
    }) => {
      await axios.patch(`/problems/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });

  const deleteProblem = useMutation({
    mutationFn: (id: string) => axios.delete(`/problems/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });

  return { problems, addProblem, editProblem, deleteProblem, isLoading };
};
