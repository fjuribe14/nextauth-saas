export interface Client {
  id?: string;
  name?: string;
  description?: string;
  secret?: string;
  session_multiple?: boolean;
  session_time_min?: number;
  user_active_on_created?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
