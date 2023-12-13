interface UserLoginRequestDTO {
  name: string;
  password: string;
}

interface UserLoginResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export { UserLoginRequestDTO, UserLoginResponseDTO };
