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

export type WrapperComponent = {
  children: React.ReactNode;
  classNames?: string;
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

export type UserUpdateType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  gender?: string;
  password?: string;
  profilePicture?: string;
  birthDate?: Date;
};

export type UserResetPasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  name?: string;
};

export type CollectedFlashcardDataType = {
  title: string;
  description?: string;
  privacy: "public" | "private";
  category?: string[];
  flashcards?: Flashcard[];
};

export type FlashcardsProps = {
  updateData: (data: any) => void;
  updateCurrentStep: (data: any) => void;
  currentData?: CollectedFlashcardDataType | null;
  currentStep?: number;
  setData?: SetDataType;
};

export type FlashcardSet = {
  title: string;
  description?: string;
  privacy: "public" | "private";
  category?: string[];
  flashcards?: Flashcard[];
};

export type FlashcardsListItemProps = {
  index?: number;
  setId: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  date: string;
  categories: string[];
  numberOfFlashcards: number;
  profilePicture: string | null;
  isFavorite?: boolean;
  numberOfFavorites?: number;
  onDelete: (setId: string) => void;
};

export type FlashcardSetProp = {
  id: string;
  title: string;
  description: string | null;
  privacy: string;
  category: string[] | null;
  userId: string;
  createdAt: Date | null;
};

export type AuthorProp = {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture: string | null;
};

export type FlashcardsList = {
  set: FlashcardSetProp;
  author: AuthorProp;
  favorites?: number;
  isFavorite?: boolean;
  numberOfFlashcards?: number;
  viewsCount?: number;
};

export type Flashcard = {
  id: string | number;
  question: string;
  answer: string;
};

export type SetDataType = {
  id: string;
  title: string;
  description: string | null;
  privacy: string;
  category: string[] | null;
  userId: string;
  createdAt: Date | null;
};

export type StepsProps = {
  flashcards?: Flashcard[];
  setData?: SetDataType;
};

export type ViewType = "explore" | "my-flashcards" | "favorites";
