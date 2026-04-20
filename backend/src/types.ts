import { User } from '@supabase/supabase-js';

export type Env = {
  Variables: {
    user: User;
  };
};
