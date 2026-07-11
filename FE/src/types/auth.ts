export interface UserDto {
  id: number;
  username: string;
  email: string | null;
  name: string;
  avatarUrl: string;
  totalScore: number;
  role: string;
}

export interface AuthResponseDto {
  token: string;
  user: UserDto;
}