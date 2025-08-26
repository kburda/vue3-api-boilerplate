export interface BaseService<T> {
  getAll(): Promise<T[]>;
  getById(id: string | number): Promise<T>;
  create(payload: Partial<T>): Promise<T>;
  update(id: string | number, payload: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<void>;
}
