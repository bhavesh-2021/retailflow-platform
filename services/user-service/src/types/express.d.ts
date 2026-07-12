import type { TokenPayload } from '../common/interfaces';
import { User } from '../entities';

declare global {
  namespace Express {
    interface Request {
      refreshPayload?: TokenPayload | null;
      user?: User | null;
    }
  }
}

export { };