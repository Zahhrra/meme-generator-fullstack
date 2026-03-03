export interface Meme {
  id: string;
  topText: string;
  bottomText: string;
  imageUrl: string;
  positions: { x: string; y: string }[];
  createdAt: Date;
}

export interface MemeTemplate {
  id: string;
  imageUrl: string;
  boxCount: number;
  positions: { x: string; y: string }[];
}
