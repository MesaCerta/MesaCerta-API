import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClienteError';

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueField = e.meta.target;
    super(`Um registro com esse ${uniqueField} já existe.`);
  }
}
