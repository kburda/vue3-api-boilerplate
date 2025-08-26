import client from "@/api/httpClient";
import { BaseService } from "@/api/contracts/BaseService";

export function createService<T>(endpoint: string): BaseService<T> {
  return {
    async getAll() {
      const { data } = await client.get<T[]>(endpoint);
      return data;
    },
    async getById(id) {
      const { data } = await client.get<T>(\`\${endpoint}/\${id}\`);
      return data;
    },
    async create(payload) {
      const { data } = await client.post<T>(endpoint, payload);
      return data;
    },
    async update(id, payload) {
      const { data } = await client.put<T>(\`\${endpoint}/\${id}\`, payload);
      return data;
    },
    async delete(id) {
      await client.delete(\`\${endpoint}/\${id}\`);
    },
  };
}
