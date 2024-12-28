// problemApi.ts
import { apiRequest } from "./apiClient";

const API_BASE_URL = "http://localhost:8080/api";
const prepareUrl = (path: string) => `${API_BASE_URL}${path}`;

interface Problem {
  id: string;
  title: string;
  status: string;
  descriptions: { id: string; detail: string }[];
  solutions: { id: string; solutionDetail: string }[];
}

// Fetch all problems
export const getProblems = async () => {
  return await apiRequest<null, Problem[]>({
    method: "get",
    url: prepareUrl(`/problems`),
  });
};

// Fetch problem details by ID
export const getProblemById = async (id: string) => {
  return await apiRequest<null, Problem>({
    method: "get",
    url: prepareUrl(`/problems/${id}`),
  });
};

// Upsert a problem (create or update)
export const upsertProblem = async (problem: {
  id?: string;
  title: string;
  status: string;
}) => {
  return await apiRequest<
    { id?: string; title: string; status: string },
    Problem
  >({ method: "post", url: prepareUrl("/problems"), data: problem });
};

// Upsert a description for a problem
export const upsertDescription = async (
  problemId: string,
  description: { detail: string; id?: string }
) => {
  return await apiRequest<{ detail: string; id?: string }, Problem>({
    method: "post",
    url: prepareUrl(`/problems/${problemId}/descriptions`),
    data: description,
  });
};

// Upsert a solution for a problem
export const upsertSolution = async (
  problemId: string,
  solution: { solutionDetail: string; id?: string }
) => {
  return await apiRequest<{ solutionDetail: string; id?: string }, Problem>({
    method: "post",
    url: prepareUrl(`/problems/${problemId}/solutions`),
    data: solution,
  });
};
