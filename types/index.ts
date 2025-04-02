export type RegisterForm = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string | null;
  gender: string | null;
  createdAt: Date | null;
  birthDate: Date | null;
};
