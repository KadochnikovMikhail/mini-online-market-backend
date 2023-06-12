import * as axios from "axios";

export interface ApiResponse {
  state: string;
  error?: any;
}

export class TemplateAPI {
  public client: axios.AxiosInstance;

  constructor() {
    this.client = axios.default.create({
      baseURL: "http://localhost:3001",
      timeout: 100000,
      headers: {
        "connection": "keep-alive"
      },
      decompress: true
    })
  }

  async getPing(): Promise<ApiResponse> {
    try {
      const response = await this.client.get("/ping");
      return response.data as ApiResponse;
    } catch (e) {
      return {
        state: "error",
        error: e
      }
    }
  }
}