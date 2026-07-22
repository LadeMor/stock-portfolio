
export type GetMeDto = {
  user?:{
    id: string
  }
}

export type GetMeResponse = {
  id: string,
  email: string,
}

export type LoginDto = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export type RegisterDto = {
  email: string
  password: string
}

export type RegisterResponse = {
  id: string
  token: string
}