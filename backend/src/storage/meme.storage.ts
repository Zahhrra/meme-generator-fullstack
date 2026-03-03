import { Meme, MemeTemplate } from "../types/meme.types.js";

export const memes = new Map<string, Meme>();
export const templates = new Map<string, MemeTemplate>();

const initialTemplates: MemeTemplate[] = [
  {
    id: "11",
    imageUrl: "/images/image.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "28",
    imageUrl: "/images/img12.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "29",
    imageUrl: "/images/img13.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "32",
    imageUrl: "/images/img16.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "33",
    imageUrl: "/images/img17.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "30",
    imageUrl: "/images/img14.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "17",
    imageUrl: "/images/img2.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "18",
    imageUrl: "/images/img3.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "19",
    imageUrl: "/images/img4.png",
    boxCount: 1,
    positions: [{ x: "70%", y: "25%" },
      { x: "70%", y: "75%" }]
  },
  {
    id: "20",
    imageUrl: "/images/img5.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "21",
    imageUrl: "/images/img6.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "22",
    imageUrl: "/images/img7.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "23",
    imageUrl: "/images/img8.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "24",
    imageUrl: "/images/img9.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "25",
    imageUrl: "/images/img10.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "26",
    imageUrl: "/images/img11.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "31",
    imageUrl: "/images/img15.png",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "1",
    imageUrl: "https://i.imgflip.com/3i7p.jpg",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "2",
    imageUrl: "https://i.imgflip.com/30b1gx.jpg",
    boxCount: 2,
    positions: [
      { x: "70%", y: "25%" },
      { x: "70%", y: "75%" }
    ]
  },
  {
    id: "3",
    imageUrl: "https://i.imgflip.com/1g8my4.jpg",
    boxCount: 2,
    positions: [
      { x: "38%", y: "15%" },
      { x: "58%", y: "12%" }
    ]
  },
  {
    id: "4",
    imageUrl: "https://i.imgflip.com/2gnnjh.jpg",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "5",
    imageUrl: "https://i.imgflip.com/24y43o.jpg",
    boxCount: 1,
    positions: [{ x: "50%", y: "70%" }]
  },
  {
    id: "6",
    imageUrl: "https://i.imgflip.com/2kbn1e.jpg",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "7",
    imageUrl: "https://i.imgflip.com/345v97.jpg",
    boxCount: 2,
    positions: [
      { x: "25%", y: "10%" },
      { x: "75%", y: "10%" }
    ]
  },
  {
    id: "8",
    imageUrl: "https://i.imgflip.com/3lmzyx.jpg",
    boxCount: 1,
    positions: [{ x: "50%", y: "85%" }]
  },
  {
    id: "9",
    imageUrl: "https://i.imgflip.com/22bdq6.jpg",
    boxCount: 2,
    positions: [
      { x: "25%", y: "20%" },
      { x: "75%", y: "20%" }
    ]
  },
  {
    id: "10",
    imageUrl: "https://i.imgflip.com/28j0te.jpg",
    boxCount: 2,
    positions: [
      { x: "25%", y: "90%" },
      { x: "75%", y: "90%" }
    ]
  },
  {
    id: "12",
    imageUrl: "https://i.imgflip.com/46e43q.png",
    boxCount: 2,
    positions: [
      { x: "50%", y: "15%" },
      { x: "50%", y: "85%" }
    ]
  },
  {
    id: "13",
    imageUrl: "https://i.imgflip.com/9ehk.jpg",
    boxCount: 1,
    positions: [{ x: "50%", y: "10%" }]
  },
  {
    id: "14",
    imageUrl: "https://i.imgflip.com/wxica.jpg",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "15",
    imageUrl: "https://i.imgflip.com/8p0a.jpg",
    boxCount: 1,
    positions: [{ x: "50%", y: "90%" }]
  },
  {
    id: "16",
    imageUrl: "https://i.imgflip.com/2fm6x.jpg",
    boxCount: 2,
    positions: [
      { x: "50%", y: "25%" },
      { x: "50%", y: "85%" }
    ]
  }
];


initialTemplates.forEach((t) => templates.set(t.id, t));
