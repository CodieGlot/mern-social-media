export interface IBlogPost {
  _id: string;
  userId: string;
  username: string;
  location: string;
  userPicturePath: string;
  description: string;
  picturePath: string;
  likes: Array<{ userId: string; username: string }>;
  comments: Array<{
    userId: string;
    username: string;
    userPicturePath: string;
    content: string;
  }>;
  createdAt: Date;
}
