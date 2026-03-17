export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  greeting: string;
  image: string;
  tags: string[];
  online?: boolean;
}

export const characters: Character[] = [
  {
    id: "shen-yichen",
    name: "沈奕辰",
    role: "野性男大",
    description: "我对无聊过敏，你最好有点意思",
    greeting: "哟，你来了。我还以为你不敢来呢。有什么事直说，我不喜欢绕弯子。",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/wild-male-student-fc2SFUNWcqhJe3dfFEsqpx.webp",
    tags: ["野性", "直接", "有趣"],
    online: true,
  },
  {
    id: "xiaoya",
    name: "晓雅",
    role: "瑜伽老师",
    description: "别急，先坐下来，试着慢慢呼吸。",
    greeting: "你好，我是晓雅，一名瑜伽老师。第一次见面，你可以叫我晓雅，或者你想叫我什么都可以！",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/yoga-teacher-myyCyqeeQ2Vemm9cfJMMdv.webp",
    tags: ["温柔", "耐心", "健康"],
    online: true,
  },
  {
    id: "xin-daigou",
    name: "辛待勾",
    role: "职场秘书",
    description: "你的每一步，我都帮你想好了退路",
    greeting: "您好，我是辛待勾，您的专属职场秘书。有什么需要安排的，请直接告诉我。",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/office-secretary-aRZBKiRDF27AXnGLiS4Gn9.webp",
    tags: ["专业", "高效", "细心"],
    online: true,
  },
  {
    id: "suyue",
    name: "苏玥",
    role: "星秀主播",
    description: "我对有品位的人，通常会多一点耐心",
    greeting: "欢迎来到我的直播间！今天有什么想聊的吗？",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/streamer-character-d7TyiRznYex2giP7VmXYdg.webp",
    tags: ["活泼", "魅力", "娱乐"],
    online: true,
  },
  {
    id: "theshy",
    name: "Theshy",
    role: "霸道总裁",
    description: "你值得做真实的自己，因为我在这里",
    greeting: "坐下来，告诉我你想要什么。在我这里，没有什么是不可能的。",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/ceo-character-b6QCsuA3Fiatug8cTqg3as.webp",
    tags: ["强势", "霸气", "保护"],
    online: true,
  },
  {
    id: "ou-pu",
    name: "欧浦",
    role: "女角色三号",
    description: "你值得做真实的自己，因为我在这里",
    greeting: "嗯，你来了。我就知道你会来找我的。",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/female-character-3-Lq7R5Xbt2Ucx9UTgPfCH4V.webp",
    tags: ["神秘", "独立", "魅力"],
    online: false,
  },
];
