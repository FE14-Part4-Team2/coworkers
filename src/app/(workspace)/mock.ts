type Task = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  frequency: string;
  commentCount: number;
  date: string;
  deletedAt: null;
  doneAt: number | null;
  updatedAt: string;
  displayIndex: number;
  recurringId: null;
  user: null;
  doneBy: {
    user: number | null;
  };
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
};

type TaskList = {
  displayIndex: number;
  groupId: number;
  name: string;
  id: number;
  updatedAt: string;
  createdAt: string;
  tasks: Task[];
};

type Member = {
  role: string;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

type Team = {
  teamId: string;
  id: number;
  name: string;
  members: Member[];
  taskLists: TaskList[];
};

export const currentUser = {
  userId: 0,
  userEmail: "test123@email.com",
};

export const mockTeamData: Team = {
  teamId: "14-2",
  id: 1234,
  name: "프론트엔드 개발팀",
  members: [
    {
      role: "ADMIN",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "test@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
    {
      role: "MEMBER",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "testLL@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
    {
      role: "MEMBER",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "test1@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
    {
      role: "MEMBER",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "test22@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
    {
      role: "MEMBER",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "testDE@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
    {
      role: "MEMBER",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "test123@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
    {
      role: "MEMBER",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "test5552@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
    {
      role: "MEMBER",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "test233@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
    {
      role: "MEMBER",
      userImage: "/icons/icon-profile-default.svg",
      userEmail: "test1235@email.com",
      userName: "오수빈",
      groupId: 0,
      userId: 0,
    },
  ],
  taskLists: [
    {
      displayIndex: 1,
      groupId: 1234,
      name: "디자인 작업",
      updatedAt: "2025-06-07T05:28:45.875Z",
      createdAt: "2025-06-07T05:28:45.875Z",
      id: 201,
      tasks: [
        {
          id: 101,
          name: "UI 구성 정리",
          description: "페이지 레이아웃 설계 및 구조 정리",
          startDate: "2025-06-01T00:00:00Z",
          frequency: "ONCE",
          commentCount: 2,
          date: "2025-06-08T09:00:00+09:00",
          deletedAt: null,
          doneAt: null,
          updatedAt: "2025-06-01T12:00:00+09:00",
          displayIndex: 1,
          recurringId: null,
          user: null,
          doneBy: { user: null },
          writer: { id: 2141, nickname: "노바1492", image: null },
        },
        {
          id: 102,
          name: "Figma 작업 공유",
          description: "Figma 파일 링크 및 가이드 공유",
          startDate: "2025-06-01T00:00:00Z",
          frequency: "ONCE",
          commentCount: 1,
          date: "2025-06-08T09:00:00+09:00",
          deletedAt: null,
          doneAt: 111,
          updatedAt: "2025-06-01T15:00:00+09:00",
          displayIndex: 2,
          recurringId: null,
          user: null,
          doneBy: { user: 123 },
          writer: { id: 2141, nickname: "노바1492", image: null },
        },
        {
          id: 103,
          name: "Figma 작업 공유",
          description: "Figma 파일 링크 및 가이드 공유",
          startDate: "2025-06-01T00:00:00Z",
          frequency: "ONCE",
          commentCount: 1,
          date: "2025-06-08T09:00:00+09:00",
          deletedAt: null,
          doneAt: 111,
          updatedAt: "2025-06-01T15:00:00+09:00",
          displayIndex: 2,
          recurringId: null,
          user: null,
          doneBy: { user: null },
          writer: { id: 2141, nickname: "노바1492", image: null },
        },
      ],
    },
    {
      displayIndex: 2,
      groupId: 1234,
      name: "개발 작업",
      updatedAt: "2025-06-07T05:28:45.875Z",
      createdAt: "2025-06-07T05:28:45.875Z",
      id: 202,
      tasks: [
        {
          id: 104,
          name: "API 연결",
          description: "백엔드 API와 프론트 연동",
          startDate: "2025-06-01T00:00:00Z",
          frequency: "ONCE",
          commentCount: 0,
          date: "2025-06-08T09:00:00+09:00",
          deletedAt: null,
          doneAt: 123,
          updatedAt: "2025-06-02T09:00:00+09:00",
          displayIndex: 1,
          recurringId: null,
          user: null,
          doneBy: { user: null },
          writer: { id: 2141, nickname: "노바1492", image: null },
        },
        {
          id: 105,
          name: "컴포넌트 분리",
          description: "재사용 가능한 UI 컴포넌트로 분리",
          startDate: "2025-06-01T00:00:00Z",
          frequency: "ONCE",
          commentCount: 3,
          date: "2025-06-08T09:00:00+09:00",
          deletedAt: null,
          doneAt: null,
          updatedAt: "2025-06-02T12:00:00+09:00",
          displayIndex: 2,
          recurringId: null,
          user: null,
          doneBy: { user: null },
          writer: { id: 2141, nickname: "노바1492", image: null },
        },
      ],
    },
    {
      displayIndex: 3,
      groupId: 1234,
      name: "기획 작업",
      updatedAt: "2025-06-07T05:28:45.875Z",
      createdAt: "2025-06-07T05:28:45.875Z",
      id: 203,
      tasks: [
        {
          id: 106,
          name: "API 연결",
          description: "백엔드 API와 프론트 연동",
          startDate: "2025-06-01T00:00:00Z",
          frequency: "ONCE",
          commentCount: 0,
          date: "2025-06-08T09:00:00+09:00",
          deletedAt: null,
          doneAt: 123,
          updatedAt: "2025-06-02T09:00:00+09:00",
          displayIndex: 1,
          recurringId: null,
          user: null,
          doneBy: { user: null },
          writer: { id: 2141, nickname: "노바1492", image: null },
        },
        {
          id: 107,
          name: "컴포넌트 분리",
          description: "재사용 가능한 UI 컴포넌트로 분리",
          startDate: "2025-06-01T00:00:00Z",
          frequency: "ONCE",
          commentCount: 3,
          date: "2025-06-09T09:00:00+09:00",
          deletedAt: null,
          doneAt: null,
          updatedAt: "2025-06-02T12:00:00+09:00",
          displayIndex: 2,
          recurringId: null,
          user: null,
          doneBy: { user: null },
          writer: { id: 2141, nickname: "노바1492", image: null },
        },
      ],
    },
  ],
};
