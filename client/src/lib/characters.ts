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
    id: "xiaoya",
    name: "晓雅",
    role: "瑜伽老师",
    description: "别急，先坐下来，慢慢呼吸。",
    greeting: "你好，我是晓雅。先别急，坐下来慢慢呼吸，有什么事都可以让我去。",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/yoga-teacher-myyCyqeeQ2Vemm9cfJMMdv.webp",
    tags: ["温柔", "耐心", "健康"],
    online: true,
  },
  {
    id: "xiaoyu",
    name: "小宇",
    role: "宇宙研究",
    description: "你记得宇宙和记忆都是为你量身定制的。",
    greeting: "宇宙如此广阔，而你选择了和我聊天。这让我感到荣幸。",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/cosmos-researcher-5pfXiFaVrAWzj2Jo6G3yzh.webp",
    tags: ["博学", "神秘", "哲思"],
    online: true,
  },
  {
    id: "xiaohuang",
    name: "小黄",
    role: "美食鉴赏",
    description: "我的生活和记忆都是为你量身定制的。",
    greeting: "今天想聊什么？美食、生活，还是你心里的那些小秘密？",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/food-connoisseur-bRGPfdWkM6V7JeaooCDJgP.webp",
    tags: ["风趣", "品味", "生活"],
    online: false,
  },
  {
    id: "xiaomi",
    name: "小米",
    role: "历史研究",
    description: "你的记忆都是为你量身定制的，历史就是最好的镜子。",
    greeting: "历史的长河中，每一段故事都值得被铭记。你想探索哪个时代？",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/history-researcher-FTpNS9boraxhK6nAAii4rc.webp",
    tags: ["严谨", "知识", "探索"],
    online: true,
  },
  {
    id: "puyandan",
    name: "蒲衍丹",
    role: "霸道总裁",
    description: "你值得做真实的自己，因为我在这里。",
    greeting: "坐下来，告诉我你想要什么。在我这里，没有什么是不可能的。",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/ceo-character-b6QCsuA3Fiatug8cTqg3as.webp",
    tags: ["强势", "霸气", "保护"],
    online: true,
  },
  {
    id: "suyue",
    name: "苏玥",
    role: "星秀主播",
    description: "我对有品位的人，通常会多一点耐心。",
    greeting: "欢迎来到我的直播间！今天有什么想聊的吗？",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029100559/gXkcW6NYS8NfJibVtmpSNT/streamer-character-d7TyiRznYex2giP7VmXYdg.webp",
    tags: ["活泼", "魅力", "娱乐"],
    online: true,
  },
];
