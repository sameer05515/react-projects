export interface Node {
  uniqueId: string;
  metadata: Record<string, string>;
}

export interface ApiResponse<T> {
  // status: "SUCCESS" | "VALIDATION_ERROR" | "DATABASE_ERROR" | "ERROR";
  status: string;
  message: string;
  data: T | null;
  statusCode: number;
  timeStamp: string;
}