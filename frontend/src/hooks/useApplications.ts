import type {
  ApplicationResponse,
  ApplicationsForm,
} from "@/types/applications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useApplications = () => {
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery<ApplicationResponse[]>({
    queryKey: ["applications"],
    queryFn: () => axios.get("/applications/all").then((res) => res.data),
  });

  const addApplication = useMutation({
    mutationFn: (data: ApplicationsForm) =>
      axios.post("/applications/add", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const deleteApplication = useMutation({
    mutationFn: (id) => axios.delete(`/applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return { applications, addApplication, deleteApplication, isLoading };
};
