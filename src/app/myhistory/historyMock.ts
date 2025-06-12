// 마이 히스토리 페이지 임시 Mock 데이터. 추후 삭제 예정
export interface HistoryItem {
  id: number;
  description: string;
  createdAt: string;
}

export const historyMockData: HistoryItem[] = [
  {
    id: 1,
    description: "법인 설립 안내 드리기",
    createdAt: "2024-01-11T09:00:00Z",
  },
  {
    id: 2,
    description: "등기 비용 안내 드리기",
    createdAt: "2024-01-11T09:05:00Z",
  },
  {
    id: 3,
    description: "입력해주신 정보를 바탕으로 등기신청서 제출하기",
    createdAt: "2024-01-11T10:00:00Z",
  },
  {
    id: 4,
    description: "고객 정보에 따라 커스텀 정관 제공하기",
    createdAt: "2024-01-10T08:00:00Z",
  },
  {
    id: 5,
    description: "법인 인감도장, 등기서류, 인감증명서 발급하기",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: 6,
    description: "업데이트 된 등기부등본 발급하고 영수증 발송하기",
    createdAt: "2024-01-10T09:30:00Z",
  },
  {
    id: 7,
    description: "고객 정보에 따라 커스텀 정관 제공하기",
    createdAt: "2024-01-09T09:30:00Z",
  },
  {
    id: 8,
    description: "법인 인감도장, 등기서류, 인감증명서 발급하기",
    createdAt: "2024-01-09T09:30:00Z",
  },
  {
    id: 9,
    description: "업데이트 된 등기부등본 발급하고 영수증 발송하기",
    createdAt: "2024-01-09T09:30:00Z",
  },
];
