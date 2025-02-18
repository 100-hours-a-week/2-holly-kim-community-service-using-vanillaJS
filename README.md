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


특정 화면을 보고 싶다면 다음과 같이 원하는 기능(x)을 url에 넣으면 된다.    
http://localhost:5500/x/x.html  



| x | 기능 |
| --- | --- |
| [edit-post](https://github.com/100-hours-a-week/2-holly-kim-week3/tree/main/edit-post) | 게시글 수정 |
| [login](https://github.com/100-hours-a-week/2-holly-kim-week3/tree/main/login) | 로그인 |
| [main](https://github.com/100-hours-a-week/2-holly-kim-week3/tree/main/main) | 게시글 목록 |
| [make post](https://github.com/100-hours-a-week/2-holly-kim-week3/tree/main/make%20post) | 게시글 생성 |
| [post-detail](https://github.com/100-hours-a-week/2-holly-kim-week3/tree/main/post-detail) | 게시글 상세보기 |
| [profile](https://github.com/100-hours-a-week/2-holly-kim-week3/tree/main/profile) | 프로필 수정 |
| [pwChange](https://github.com/100-hours-a-week/2-holly-kim-week3/tree/main/pwChange) | 비밀번호 수정 |
| [register](https://github.com/100-hours-a-week/2-holly-kim-week3/tree/main/register) | 회원가입 |



### 보완해야 할 점

이번 주차에서는 디자인에 따라 사용자에게 보여지는 화면을 구성한 것, 링크 리다이렉트에 초점을 두었다.   
아래의 사항들은 추후에 보완해야 한다.  

1. 회원가입하면 회원이 등록되는 것   
2. 게시글을 작성하면 목록에 추가되게 하는 기능 
3. 댓글 수정, 삭제 권한이 본인이 작성한 댓글만 수정, 삭제할 수 있게 하는 것
(지금은 모든 댓글을 수정, 삭제할 수 있음)
4. 프로필을 수정하면 그것이 다른 페이지에서도 header에 반영되게 하는 것 
5. 아이디를 추가하면 그 아이디가 기존 아이디 리스트에 추가되게 하는 것 



현재는 mock data로 유효성 검증을 했다. 


또한 현재 endpoint들이 동사로 되어 있는 경우들(edit-post, make post, pwChange, register)이 있는데 이는 추후에 바꿀 것이다.  
| 기존 URL | RESTful한 URL |
| --- | --- |
| `/edit-post` | `PUT /posts/{post_id}` |
| `/login` | `POST /auth/login` |
| `/main` | `GET /posts` |
| `/make-post` | `POST /posts` |
| `/post-detail` | `GET /posts/{post_id}` |
| `/profile` | `GET /users/{user_id}` |
| `/pwChange` | `PUT /users/{user_id}/password` |
| `/register` | `POST /auth/register` |
