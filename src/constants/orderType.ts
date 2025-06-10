export const ORDER_TYPE = {
  RECENT: "recent",
  LIKE: "like",
} as const;

export type OrderType = (typeof ORDER_TYPE)[keyof typeof ORDER_TYPE];

export const ORDER_OPTIONS = [
  { label: "최신순", value: ORDER_TYPE.RECENT },
  { label: "좋아요순", value: ORDER_TYPE.LIKE },
];
