import { createClient } from '@supabase/supabase-js';
import { Table } from './types';

export function from(table: Table) {
  const client = createSuperBaseClient();
  return client.from(table);
}

export default function createSuperBaseClient() {
  const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    {
      global: {
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ''}`
        }
      },
      realtime: {
        log_level: 'info',
      },
    }
  );

  return supabase;
}