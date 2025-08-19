export interface DiscordUser {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
}

export interface DiscordMember {
  roles: string[];
  user: DiscordUser;
  avatar?: string | null;
}

export interface AuthSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

export interface DiscordStatusCardProps {
  session: AuthSession;
}
