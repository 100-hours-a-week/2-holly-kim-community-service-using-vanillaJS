# 3-4주차 과제 
html, css, vanilla javascript로 커뮤니티 웹사이트 구현하기

### 실행방법
VSCode에서 Go Live로 실행 ([http://localhost:5500](http://localhost:5500)으로 redirect됨.)  


cd json-server  
npm start


로그인 화면에서 시작하면 된다.  
- 로그인 사용자 mock data는 다음과 같고 이 계정정보 중 하나로 로그인하면 된다.  
        { email: "user@example.com", password: "NewSecureP@ssword1" },  
        { email: "hobbit@gmail.com", password: "aA1!1111" },   


- 회원가입 시 아래는 이미 등록된 정보이므로 다른 정보를 입력해야 한다.  
이메일 목록: ["hobbit@gmail.com", "user@example.com"]  
닉네임 목록: ["typicode", "hobbit"]



### 폴더 구성
``` 
/project-root  
│── index.html         # 메인 페이지  
│  
├── pages/              
│   ├── posts/         # 게시글 관련 페이지  
│   │   ├── list.html     # 게시글 목록  
│   │   ├── detail.html   # 게시글 상세보기  
│   │   ├── create.html   # 새 게시글 작성  
│   │   ├── edit.html     # 게시글 수정  
│   │  
│   ├── users/         # 사용자 관련 페이지  
│   │   ├── profile.html   # 프로필 페이지  
│   │   ├── password.html  # 비밀번호 변경  
│   │  
│   ├── auth/          # 인증 관련 페이지  
│   │   ├── login.html     # 로그인  
│   │   ├── register.html  # 회원가입  
│   │  
│   ├── media/         # 미디어 페이지  
│   │   ├── images.html    # 이미지 목록  
│  
├── css/                 
│   ├── main.css       # 초기 페이지 스타일 
│   ├── components/    # UI 컴포넌트 스타일  
│   ├── pages/         # 개별 페이지 스타일  
│  
├── js/                   
│   ├── main.js        # 초기 실행 파일  
│   ├── api/           # API 관련 코드  
│   │   ├── request.js    # API 요청 함수  
│   │   ├── endpoints.js  # API 엔드포인트 정리  
│   │  
│   ├── components/    # UI 컴포넌트 관련 JS  
│   │   ├── header.mjs    # 헤더 컴포넌트  
│   │  
│   ├── pages/         # 페이지별 기능  
│   │   ├── posts/        # 게시글 기능  
│   │   │   ├── create.js   # 새 게시글 작성  
│   │   │   ├── edit.js     # 게시글 수정  
│   │   │   ├── detail.js   # 게시글 상세보기  
│   │   │  
│   │   ├── users/        # 사용자 기능  
│   │   │   ├── profile.js   # 프로필 조회/수정  
│   │   │   ├── password.js  # 비밀번호 변경  
│   │   │  
│   │   ├── auth/         # 인증 기능  
│   │   │   ├── login.js     # 로그인  
│   │   │   ├── register.js  # 회원가입  
│  
├── assets/            # 정적 파일 (리소스)  
│   ├── images/        # 이미지 리소스  
│   ├── fonts/         # 웹 폰트  
│  
├── data/              # JSON 및 로컬 데이터  
├── utils/             # 유틸리티 함수 (날짜 변환, 포맷팅 등)  
├── README.md          # 프로젝트 설명 파일  

```
 

### 아직 보완해야 할 점 

1. 댓글 수정, 삭제 권한이 본인이 작성한 댓글만 수정, 삭제할 수 있게 하는 것
(지금은 모든 댓글을 수정, 삭제할 수 있음)
2. 프로필을 수정하면 그것이 다른 페이지에서도 header에 반영되게 하는 것
3. 게시글 목록에 작성자 프로필 이미지 뜨게 하는 것   




