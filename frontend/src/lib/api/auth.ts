import { apiClient } from '../apiClient';
import type {
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
  GetMeResponse
} from '../../types/auth';

export function getMe(token: string) {
  return apiClient<GetMeResponse>('/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function login(dto: LoginDto) {
  return apiClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}

export function register(dto: RegisterDto) {
  return apiClient<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}