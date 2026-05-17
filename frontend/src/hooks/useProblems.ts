import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useProblems = () => {
  const queryClient = useQueryClient();

  const { data: problems, isLoading } = useQuery({
    queryKey: ["problems"],
    queryFn: () => axios.get("/problems/all").then((res) => res.data),
  });

  const addProblem = useMutation({
    mutationFn: (data) => axios.post("/problems/add", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });

  const deleteProblem = useMutation({
    mutationFn: (id) => axios.delete(`/problems/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });

  return { problems, addProblem, deleteProblem, isLoading };
};
