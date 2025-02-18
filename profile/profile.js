const mockNicknames = ["user1", "admin", "master"]; // 닉네임 중복 확인용 
const pictureUpload = document.getElementById("picture-upload");
const profilePreview = document.getElementById("profile-preview");
const quitBtn = document.querySelector(".quit");
const quitModal = document.getElementById("quit-modal");
const mainBtn = document.querySelector(".homepage");

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function(event) {
    const dropdown = document.getElementById("dropdown-menu");
    if (!event.target.matches('.profile-img')) {
        dropdown.style.display = "none";
    }
});

function validateNickname() {
    const nicknameInput = document.getElementById("nickname");
    const errorText = document.getElementById("nickname-error");
    const nickname = nicknameInput.value.trim();

    if (!nickname) {
        errorText.textContent = "*닉네임을 입력해주세요.";
        return;
    }
    
    if (nickname.length > 10) {
        errorText.textContent = "*닉네임은 최대 10자까지 작성 가능합니다.";
        return;
    }
    
    if (mockNicknames.includes(nickname)) {
        errorText.textContent = "*중복된 닉네임입니다.";
        return;
    }

    errorText.textContent = "";
    showToast();
}


function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000); 
} 

pictureUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePreview.innerHTML = `<img src="${e.target.result}" alt="프로필 사진">  <div class="profile-overlay">변경</div>`;
        };
        reader.readAsDataURL(file);
    } 
});

mainBtn.addEventListener("click", function(){
    window.location.href = "../main/main.html";
})

// 모달 표시
quitBtn.addEventListener("click", function () {
    quitModal.style.display = "flex"; 
});

// 모달 닫기
function closeModal() {
    quitModal.style.display = "none";
}

function quit() {
    alert("회원 탈퇴가 완료되었습니다.");
    window.location.href = "../login/login.html";
}
 