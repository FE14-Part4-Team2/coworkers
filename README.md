<img width="1436" alt="랜딩 페이지" src="https://github.com/user-attachments/assets/742764af-a594-4188-a04b-b45d5f3ef6eb" />

<br/>
<br/>

# 🚀 Getting Started (시작하기)

```bash
$ pnpm install
$ pnpm run dev
```

<br/>

[배포된 서비스 링크](https://coworkers.site)

<br/>

# 🧩 프로젝트 개요

### <img width="18" alt="Union@2x" src="https://github.com/user-attachments/assets/51f0d07a-b1cc-4ba7-91d2-73e0eae8e035" /> **Coworkers**

#### Coworkers는 팀 생성부터 참여까지, 협업을 위한 모든 과정을 간편하게 관리할 수 있는 플랫폼입니다.

- 서비스 소개
  - Coworkers는 팀 단위 협업을 중심으로 한 팀 생성 · 참여 · 관리 플랫폼입니다.
  - 개별 사용자는 팀을 생성하거나, 초대 링크를 통해 참여할 수 있으며
  - 프로필 이미지, 팀 정보 수정, 히스토리 관리 등의 기능을 제공합니다.

<br/>
<br/>

# 🛠️ 기술 스택

## 🎨 프론트엔드

<div align=center> 
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">
</div>

<br/>

## 🔄 API 및 상태 관리

<div align=center>
  <img src="https://img.shields.io/badge/Fetch--API-333333?style=for-the-badge&logo=javascript&logoColor=white"> 
  <img src="https://img.shields.io/badge/Zustand-F3DF49?style=for-the-badge&logo=Zustand&logoColor=white">
  <img src="https://img.shields.io/badge/TanStack--Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white">
  <img src="https://img.shields.io/badge/Zod-3E5BA5?style=for-the-badge&logo=Zod&logoColor=white">
</div>

<br/>

## 👥 협업

<div align=center> 
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
  <img src="https://img.shields.io/badge/GitHubActions-2088FF?style=for-the-badge&logo=GitHubActions&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
  <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">
</div>

<br/>

## 📦 패키지 매니저

<div align=center>
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">
</div>

<br/>

## ☁️ 배포

<div align=center>
  <img src="https://img.shields.io/badge/AWS--EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
</div>

<br/>
<br/>

# 📁 폴더 구조

```plaintextcoworkers/
├── .github/                # GitHub Actions 설정
├── .husky/                 # Git hook 설정 (pre-commit 등)
├── .next/                  # Next.js 빌드 결과물
├── node_modules/           # 의존성 패키지
├── public/                 # 공개 자산 (이미지, favicon 등)
├── scripts/                # Git hook 관련 설정 스크립트
├── src/                    # 프로젝트 소스 코드
│   ├── api/                # API 요청 관련 로직 (fetcher, 도메인별 API 폴더)
│   │   ├── article/
│   │   ├── article-comment/
│   │   ├── auth/
│   │   ├── comment/
│   │   ├── group/
│   │   ├── image/
│   │   ├── task/
│   │   ├── task-list/
│   │   ├── user/
│   │   ├── auth-fetcher.ts
│   │   └── fetcher.ts
│   ├── app/                # Next.js App Router 기반 라우팅
│   │   ├── (auth)/         # 인증 관련 (로그인, 회원가입 등)
│   │   ├── (board)/        # 게시판 관련 페이지
│   │   ├── (team)/         # 팀 생성, 참여, 선택 등
│   │   └── (workspace)/    # 워크스페이스 및 태스크 관리
│   │       └── [teamId]/(task-lists)/[listId]/edit/
│   ├── assets/             # 폰트, 아이콘 등 정적 자산
│   │   ├── fonts/
│   │   └── icons/
│   ├── components/         # 공통 및 페이지별 컴포넌트
│   │   ├── common/         # Button, Modal 등 공통 UI
│   │   └── feature/        # 도메인별 Feature 컴포넌트
│   ├── constants/          # 상수 정의
│   ├── hooks/              # 커스텀 훅
│   ├── layouts/            # 공통 레이아웃 컴포넌트
│   │   └── Header/         # 헤더 관련 UI
│   ├── lib/                # 외부 라이브러리 래퍼, provider 등
│   ├── stores/             # Zustand 상태 관리
│   ├── styles/             # 글로벌 스타일 설정
│   ├── types/              # 전역 타입 정의
│   └── utils/              # 유틸 함수
├── .env                    # 환경 변수 설정
├── .gitignore
├── .nvmrc                  # Node.js 버전 지정
├── .prettierrc             # Prettier 설정
├── eslint.config.mjs       # ESLint 설정
├── next.config.ts          # Next.js 설정
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts      # Tailwind 설정
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── README.md

```

<br/>
<br/>

# 📄 페이지 및 주요 기능

### 1. 랜딩 페이지

- 서비스 소개와 함께 사용자에게 첫인상을 제공하는 메인 진입 화면입니다.
- 우측 상단에 로그인 버튼, 좌측 상단에 모집게시판 이동 링크 제공
- 귀여운 캐릭터와 기차 일러스트로 협업과 진행의 흐름을 시각적으로 표현했습니다.
- 하단의 "지금 시작하기" 버튼은 로그인 여부에 따라 동작이 다릅니다:
  - 로그인한 상태: 모집게시판으로 이동
  - 로그인하지 않은 상태: 로그인 페이지로 이동

![LandingPage](https://github.com/user-attachments/assets/d4fcedf7-509e-47ef-a64d-c5ac9695ecea)

### 2. 회원가입 페이지

- Coworkers에 처음 접속한 사용자가 계정을 생성할 수 있는 페이지입니다.
- 이름, 이메일, 비밀번호, 비밀번호 확인 입력 필드를 제공하여 기본 회원가입이 가능합니다.
- 입력 필드에는 유효성 검사가 적용되어 있어, 형식 오류나 누락 시 에러 메시지가 표시됩니다.
- 사용자는 비밀번호 입력 시 비밀번호 표시/숨김 토글 버튼을 통해 입력값 확인이 가능합니다.
- 기본 회원가입 외에도 하단의 카카오 소셜 로그인 버튼을 통해 간편 회원가입이 가능합니다.

![스크린샷 2025-06-23 01 58 47](https://github.com/user-attachments/assets/ffa309ea-66d1-4deb-a5e6-7bbd174ec4d5)

### 3. 로그인 페이지

- 사용자가 기존 계정으로 서비스를 이용할 수 있도록 이메일/비밀번호 기반 로그인 기능을 제공합니다.
- 비밀번호 입력 시 표시/숨김 토글 버튼이 제공되어 사용자 편의성을 높였습니다.
- 비밀번호를 잊은 경우를 대비해 비밀번호 재설정 링크가 함께 제공됩니다.
- 하단에는 카카오 소셜 로그인 버튼이 있어 간편 로그인 방식도 지원됩니다.
- 로그인하지 않은 상태에서 주요 페이지 접근 시, 로그인 페이지로 리다이렉션됩니다.

![스크린샷 2025-06-23 02 02 24](https://github.com/user-attachments/assets/04bc3f0a-80bb-441b-ab20-19dd568ac2ea)

### 4. 팀 선택 페이지

- 회원가입 직후 처음 진입하는 페이지로, 사용자가 아직 소속된 팀이 없을 경우 표시됩니다.
- 팀에 속하지 않은 사용자에게 팀 생성 또는 팀 참여를 유도하는 역할을 합니다.
- 하단 버튼을 통해 사용자는 두 가지 중 하나를 선택할 수 있습니다.
  - 팀 생성하기: 새 팀을 만들고 관리자로 시작
  - 팀 참여하기: 초대 링크를 통해 기존 팀에 참여
- 이후 사용자가 팀에 속하게 되면 해당 페이지는 더 이상 나타나지 않으며, 접근 시 랜딩 페이지로 리다이렉션됩니다.

![스크린샷 2025-06-23 03 17 44](https://github.com/user-attachments/assets/e8e2244a-9677-47ad-9e2f-6a00e5a6d826)

### 5. 팀 생성 페이지

- 사용자가 협업을 시작할 팀을 새롭게 생성할 수 있는 페이지입니다.
- 팀 이름과 팀 프로필 이미지를 추가하여 팀 정보를 설정할 수 있습니다.
- 팀 이름은 자유롭게 작성 가능하며 유효성 검사가 적용됩니다.
- 팀 프로필 이미지는 사용자가 업로드할 수 있으며, 추가하지 않을 경우 기본 이미지가 적용됩니다.
- 팀 생성 완료 시 자동으로 해당 팀의 팀 페이지로 이동됩니다.

![스크린샷 2025-06-23 02 11 22](https://github.com/user-attachments/assets/4239ced6-ec36-495d-910b-00569c4325e4)

### 6. 팀 참여 페이지

- 이미 생성된 팀에 초대 링크를 통해 참여 할 수 있는 페이지입니다.
- 사용자는 공유받은 팀 링크를 입력하여 팀에 합류할 수 있습니다.
- 팀에 참여하면 자동으로 해당 팀의 팀 페이지로 이동됩니다.
- 유효하지 않은 링크를 입력할 경우 에러 메시지를 통해 사용자에게 안내됩니다.

![스크린샷 2025-06-23 03 25 47](https://github.com/user-attachments/assets/bcfdbcc1-1321-470e-adbd-3e27dceecf2f)

### 7. 팀 페이지

- 팀 생성 또는 참여 후 진입하는 팀 전용 대시보드 페이지입니다.
- 팀 프로필 이미지, 팀 이름은 팀 수정 페이지를 통해 변경 가능하며, 관리자일 경우 팀을 삭제할 수 있습니다.
- 현재 팀의 할 일 목록을 확인할 수 있으며, 각 항목은 진행 상태와 함께 표시됩니다.
- 목록 추가하기 버튼을 통해 새로운 할 일 목록을 생성할 수 있으며, 각 목록은 수정/삭제가 가능합니다.
- 리포트 카드에서는 팀 작업 현황인 오늘의 할 일 개수, 한 일 개수, 진행률(%)이 시각적으로 표시됩니다.
- 하단에는 팀에 속한 멤버 목록이 표시되며, 각 구성원의 권한(관리자/멤버)도 함께 보여집니다.
  - 관리자일 경우: 다른 팀원을 내보내기 할 수 있습니다.
  - 멤버일 경우: 본인만 팀에서 나가기가 가능합니다.
- 새로운 멤버 초대하기 기능을 통해 협업 대상을 확장할 수 있습니다.

<img width="1176" alt="스크린샷 2025-06-23 11 45 01" src="https://github.com/user-attachments/assets/37b71705-f9db-497b-bb72-7d48466ad8d2" />

### 8. 팀 수정 페이지

- 팀 생성 이후, 팀 정보를 수정할 수 있는 페이지입니다.
- 사용자는 팀 이름과 팀 프로필 이미지를 변경할 수 있습니다.
- 프로필 이미지는 사용자가 직접 새로 업로드할 수 있으며, 미선택 시 기존 이미지가 유지됩니다.
- 팀 이름은 자유롭게 작성 가능하며 유효성 검사가 적용됩니다.
- 수정 완료 시 변경된 팀 정보는 팀 페이지 및 관련 모든 페이지에 실시간 반영됩니다.
- 이 페이지는 팀 관리자만 접근 가능하며, 팀 멤버는 팀 정보를 수정할 수 없습니다.

![스크린샷 2025-06-23 03 03 05](https://github.com/user-attachments/assets/1317192f-f555-4631-8caf-c8694a02a5d3)

### 9. 할 일 목록 페이지

- 팀 내에서 생성한 할 일 목록을 클릭하면 진입하는 상세 페이지입니다.
- 선택된 목록에 등록된 할 일들이 카드 형식으로 표시되며, 각 할 일은 완료 여부, 반복 여부, 날짜, 댓글 수 정보를 포함합니다.
- 완료한 할 일은 체크 표시로 시각적으로 구분되며, 클릭 시 체크 상태를 토글할 수 있습니다.
- 할 일 추가 버튼을 통해 새로운 할 일을 등록할 수 있으며, 작성 후 즉시 목록에 반영됩니다.
- 각 할 일은 수정 및 삭제 기능을 통해 관리할 수 있으며, 제목 수정이 가능합니다.
- 상단에는 현재 열람 중인 할 일 목록명이 강조되어 표시되고, 우측에는 새로운 목록 추가 버튼도 제공됩니다.

![스크린샷 2025-06-23 03 08 12](https://github.com/user-attachments/assets/ec63d5d8-da4e-48bd-9afe-f134928b8d1e)

### 10. 모집 게시판 페이지

- 사용자들이 팀원 또는 스터디원을 모집하는 커뮤니티형 게시판 기능입니다.
- 상단에는 검색창이 있어 키워드 기반으로 모집글을 필터링할 수 있습니다.
- Top 3 인기 게시글은 좋아요 수를 기준으로 선정되어 상단에 강조 노출됩니다.
- 게시글은 카드 형태로 표시되며 게시글 이미지, 작성자, 작성일, 좋아요 수, 제목을 직관적으로 확인할 수 있습니다.
- 정렬 기능(최신순/좋아요순)을 통해 게시글 정렬이 가능합니다.
- 하단에는 페이지네이션 기능이 제공되어 많은 게시글을 효율적으로 탐색할 수 있습니다.
- 우측 하단의 `+ 글쓰기` 버튼을 클릭하면, 누구나 자유롭게 모집 글을 작성할 수 있습니다.
- 각 게시글은 클릭 시 상세 페이지로 이동하며, 좋아요, 댓글, 팀 참여 등의 상호작용이 가능합니다.

![스크린샷 2025-06-23 04 05 03](https://github.com/user-attachments/assets/ff2e5c15-f9ca-4e98-81ea-c2cc24a10451)

### 11. 게시글 상세 페이지

- 모집 게시판에서 특정 모집글을 클릭하면 진입하는 상세 페이지입니다.
- 게시글의 제목, 작성자, 작성일, 이미지, 본문 내용이 전체적으로 표시됩니다.
- 게시글 하단에는 다음과 같은 상호작용 기능이 제공됩니다.
  - “팀에 참여하기” 버튼 클릭 시 초대 흐름으로 연결
  - 댓글 작성 및 목록 보기
  - 좋아요 기능

![스크린샷 2025-06-23 04 13 08](https://github.com/user-attachments/assets/936a26b2-a632-4d79-90e9-61a5f76715be)

### 12. 게시글 쓰기 페이지

- 사용자가 모집글을 자유롭게 작성할 수 있는 페이지입니다.
- 제목, 팀 참여 링크, 내용, 이미지 입력 필드를 통해 간편하게 모집 게시글을 작성할 수 있습니다.
  - 제목과 내용은 필수 입력이며, 팀 참여 링크와 이미지는 선택적으로 추가할 수 있습니다.
- 제목, 내용 필드에는 유효성 검사가 적용되며, 필수 항목 누락 시 등록이 제한됩니다.
- 우측 상단의 `등록` 버튼을 통해 게시글을 작성하면, 게시판 목록에 새 글이 반영됩니다.

![스크린샷 2025-06-23 04 16 23](https://github.com/user-attachments/assets/f6235f08-b28f-424a-8f02-1b9512e5b0a4)

### 13. 마이 히스토리 페이지

- 사용자가 완료한 할 일을 날짜별로 모아볼 수 있는 기록 페이지입니다.
- 완료된 작업은 자동으로 히스토리에 저장되며, 최신 날짜 기준으로 그룹화되어 정렬됩니다.
- 각 작업은 제목, 날짜 정보를 포함하며 시각적으로 구분됩니다.
- 히스토리 항목은 읽기 전용이며, 수정/삭제는 불가능합니다.

![스크린샷 2025-06-23 04 23 06](https://github.com/user-attachments/assets/c5c9aa9f-175e-43f1-92cc-78a9f40e16b3)

### 14. 계정 설정 페이지

- 사용자 본인의 계정 정보를 확인하고 수정할 수 있는 페이지입니다.
- 주요 기능은 다음과 같습니다.
  - 프로필 이미지 업로드 및 제거  
    사용자는 이미지를 설정하거나 제거할 수 있으며, UI 상단에 실시간 반영됩니다.
  - 이름 변경 및 저장 기능
    입력 후 저장 버튼을 통해 이름을 업데이트할 수 있습니다.
  - 이메일 확인 (수정 불가)  
    가입 시 사용한 이메일은 읽기 전용으로 표시되며, 변경은 불가능합니다.
  - 비밀번호 변경 기능
  - 회원 탈퇴 기능

![스크린샷 2025-06-23 04 29 10](https://github.com/user-attachments/assets/2ccd22bc-1edc-412b-b4c1-d746cc2fe5c3)

<br/>
<br/>

# 👨‍👩‍👧‍👦 팀원 소개

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/lee-nakyung.png" width="100" /><br />
      <b>이나경</b><br />TL, FE<br />
      <a href="https://github.com/lee-nakyung">GitHub</a>
    </td>
    <td align="center">
      <img src="https://github.com/kim-1997.png" width="100" /><br />
      <b>김성빈</b><br />FE<br />
      <a href="https://github.com/kim-1997">GitHub</a>
    </td>
    <td align="center">
      <img src="https://github.com/almighty55555.png" width="100" /><br />
      <b>오수빈</b><br />FE<br />
      <a href="https://github.com/almighty55555">GitHub</a>
    </td>
    <td align="center">
      <img src="https://github.com/yujin0408.png" width="100" /><br />
      <b>이유진</b><br />FE<br />
      <a href="https://github.com/yujin0408">GitHub</a>
    </td>
    <td align="center">
      <img src="https://github.com/jeonghwanJay.png" width="100" /><br />
      <b>지정환</b><br />FE<br />
      <a href="https://github.com/jeonghwanJay">GitHub</a>
    </td>
  </tr>
</table>

![KakaoTalk_20250622_144112066](https://github.com/user-attachments/assets/ffe73a22-bb63-4b83-9249-15315ff9d511)

<br/>
<br/>

# 🔧 작업 및 역할 분담

|  이름  | 작업                                                                                                                                                                                                                   |
| :----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 이나경 | <ul><li>헤더</li><li>Dropdown 컴포넌트</li><li>TextArea 컴포넌트</li><li>게시글 생성/수정/삭제</li><li>게시글 세부 페이지</li><li>게시글 목록 페이지</li><li>Errorboundary & suspense</li></ul>                        |
| 김성빈 | <ul><li>Modal 컴포넌트</li><li>할 일 리스트 페이지 탭</li><li>날짜별 상세 리스트 조회</li><li>사이드 패널(수정,삭제,댓글,완료 처리) 및 캘린더 기능 구현</li><li>할 일 리스트/상세 추가기능</li><li>반복 기능</li></ul> |
| 오수빈 | <ul><li>초기 스타일 설정</li><li>레이아웃 적용</li><li>팀 페이지/초대 페이지 구현</li><li>Skeleton UI 구현</li></ul>                                                                                                   |
| 이유진 | <ul><li>코어 api 및 fetcher 설계</li><li>input/toast 컴포넌트</li><li>회원가입/로그인/계정설정/비밀번호 재설정 구현</li><li>랜딩 페이지 구현</li><li>proxy 서버 구축</li><li>404 페이지 구현</li></ul>                 |
| 지정환 | <ul><li>husky 초기 설정</li><li>버튼 공통 컴포넌트 구현</li><li>팀 생성/참여/선택/수정 페이지 구현</li><li>마이 히스토리 페이지 구현</li><li>AWS EC2 배포</li><li>ReadMe 작성</li></ul>                                |

<br/>
<br/>

# ⚙️ 개발 워크 플로우

### 📌 업무 관리

- Jira를 사용하여 업무(이슈)를 관리합니다.

### 🔧 이슈 생성 및 브랜치 전략

- GitHub Issue 생성 시, 상위 작업 필드에 해당 Epic을 지정하면 자동으로 Jira와 연동됩니다.
- GitHub Issue 생성 시, 자동으로 브랜치가 생성되며 브랜치명은 다음과 같은 형식을 따릅니다.
  - `<SCRUM-번호>/<작업내용>-<작성자>`

### 🔀 브랜치 전략

- 기능 단위로 브랜치를 생성하여 개발하고, 완료된 작업은 PR을 통해 `develop` 브랜치로 병합합니다.
- PR은 Squash & Merge 방식을 사용하여 커밋 이력을 정리합니다.

### 📝 커밋 메시지 컨벤션

![스크린샷 2025-06-23 05 00 39](https://github.com/user-attachments/assets/df2339ec-49eb-4eef-a286-e139f0886c6e)

### 🔁 PR 템플릿

![스크린샷 2025-06-23 05 02 46](https://github.com/user-attachments/assets/c567eec4-642f-4153-8e29-44ab6f311713)
