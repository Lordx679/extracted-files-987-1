// API service for Discord avatar functionality
export interface DiscordAvatarResponse {
  avatarUrl: string;
  username: string;
  discriminator: string;
  lastUpdated?: number;
}

export async function fetchDiscordAvatar(userId: string): Promise<DiscordAvatarResponse> {
  const response = await fetch(`/api/discord-avatar?userId=${encodeURIComponent(userId)}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Discord avatar: ${response.statusText}`);
  }
  
  return response.json();
}