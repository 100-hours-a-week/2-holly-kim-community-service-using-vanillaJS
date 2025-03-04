export function renderHeader() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); 

  const profileImage = currentUser && currentUser.profileImage ? currentUser.profileImage : "../../assets/images/profile.png";

  const headerHTML = `
    <header class="header"> 
      <span class="back-button">&lt;</span>
      <span>아무말 대잔치</span>
      <div class="profile-container">
        <img src="${profileImage}" alt="사용자 프로필" class="profile-img" />
        <ul class="dropdown-menu" id="dropdown-menu">
          <li><a href="../users/profile.html" class="edit-profile">회원정보 수정</a></li>
          <li><a href="../users/password.html" class="edit-pw">비밀번호 수정</a></li>
          <li class="logout">로그아웃</li>
        </ul>
      </div>
    </header>
  `;

  // body의 맨 앞에 삽입
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  const backButton = document.querySelector(".back-button");
  if (backButton) {
      backButton.addEventListener("click", goBack);
  }

  document.querySelector(".logout").addEventListener("click", function() {
    localStorage.clear(); 
    alert("로그아웃 되었습니다!");
    window.location.href = "../auth/login.html"; // 로그인 페이지로 이동 (선택 사항)
  });
}

function goBack() {
  window.location.href = "/pages/posts/list.html";
}
