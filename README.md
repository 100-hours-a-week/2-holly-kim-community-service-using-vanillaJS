# 3주차 과제 
html, css, vanilla javascript로 커뮤니티 웹사이트 구현하기

### 실행방법
VSCode에서 Go Live로 실행 ([http://localhost:5500](http://localhost:5500)으로 redirect됨.)  

로그인 화면인 http://localhost:5500/login/login.html 화면에서 시작하면 된다.  
- 로그인 사용자 mock data는 다음과 같고 이 계정정보 중 하나로 로그인하면 된다.  
        { email: "test@example.com", password: "Test@1234" },  
        { email: "user@example.com", password: "User@5678" }


- 회원가입 시 아래는 이미 등록된 정보이므로 다른 정보를 입력해야 한다.  
이메일 목록: ["test@example.com", "user@example.com"]  
닉네임 목록: ["user123", "nickname1"]



### 폴더 구성

/project-root  
│── index.html              # 메인 페이지  
│── pages/  
│   ├── posts/  
│   │   ├── list.html      # 게시글 목록 조회 페이지  
│   │   ├── detail.html    # 게시글 상세 페이지  
│   │   ├── create.html    # 새 게시글 작성 페이지  
│   │   ├── edit.html      # 게시글 수정 페이지  
│   ├── users/  
│   │   ├── profile.html   # 사용자 프로필 페이지  
│   │   ├── password.html  # 비밀번호 변경 페이지  
│   ├── auth/  
│   │   ├── login.html     # 로그인 페이지  
│   │   ├── register.html  # 회원가입 페이지  
│   ├── media/  
│   │   ├── images.html    # 이미지 목록 페이지  
│   
│── css/  
│   ├── main.css            # 전체 스타일   
│   ├── components/         # UI 컴포넌트 스타일  
│   ├── pages/              # 개별 페이지 스타일  
│   
│── js/  
│   ├── main.js             # 초기 실행 파일  
│   ├── api/                # API 관련 코드  
│   │   ├── request.js      # API 요청 함수  
│   │   ├── endpoints.js    # API 엔드포인트 정리  
│   ├── components/         # UI 컴포넌트 관련 JS  
│   │   ├── header.mjs      # 헤더  
│   ├── pages/              # 페이지별 JS  
│   │   ├── posts/          # 게시글 관련 기능  
│   │   │   ├── create.js   # 새 게시글 작성  
│   │   │   ├── edit.js     # 게시글 수정  
│   │   │   ├── detail.js   # 게시글 상세보기  
│   │   ├── users/          # 사용자 관련 기능  
│   │   │   ├── profile.js  # 프로필 조회/수정  
│   │   │   ├── password.js # 비밀번호 변경  
│   │   ├── auth/           # 인증 관련 기능  
│   │   │   ├── login.js    # 로그인  
│   │   │   ├── register.js # 회원가입  
│── assets/   
│   ├── images/             # 이미지 리소스    
│   ├── fonts/              # 웹 폰트  
│── data/                   # JSON, 로컬 데이터  
│── utils/                  # 유틸리티 함수 (날짜 변환, 포맷팅 등)   
│── README.md               # 프로젝트 설명 파일   




### 4주차에 보완해야 할 점 - 기능 구현하기

이번 주차에서는 디자인에 따라 사용자에게 보여지는 화면을 구성한 것, 링크 리다이렉트에 초점을 두었다.   
아래의 사항들은 추후에 보완해야 한다.  

1. 회원가입하면 회원이 등록되는 것   
2. 게시글을 작성하면 목록에 추가되게 하는 기능 
3. 댓글 수정, 삭제 권한이 본인이 작성한 댓글만 수정, 삭제할 수 있게 하는 것
(지금은 모든 댓글을 수정, 삭제할 수 있음)
4. 프로필을 수정하면 그것이 다른 페이지에서도 header에 반영되게 하는 것 
5. 아이디를 추가하면 그 아이디가 기존 아이디 리스트에 추가되게 하는 것 


현재는 mock data로 유효성 검증을 했다.  
