export interface UserProfile {
  id: string
  first_name: string
  last_name: string
  birth_date: string
  age: number
  gender: string
  avatar: string | File
}