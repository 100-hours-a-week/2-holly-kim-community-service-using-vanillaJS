import { updateProfile, getProfiles, loginUser } from "../../api/request.mjs";

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const profileImage = currentUser && currentUser.profileImage ? currentUser.profileImage : "../../assets/images/profile.png";

document.addEventListener("DOMContentLoaded", () => {
    const pictureUpload = document.getElementById("picture-upload");
    const profilePreview = document.getElementById("profile-preview");
    const quitBtn = document.querySelector(".quit");
    const quitModal = document.getElementById("quit-modal");
    const mainBtn = document.querySelector(".homepage");
    const closeModalBtn = document.querySelector(".reject-btn"); // 모달 닫기 버튼
    const quitConfirmBtn = document.querySelector(".confirm-btn"); // 탈퇴 확정 버튼
    const profileImg = document.querySelector(".profile-img");
    const dropdown = document.getElementById("dropdown-menu");
    const updateBtn = document.getElementById("update-btn");
    const currentImg=document.getElementById("current-img");

    profileImg.src = profileImage;
    currentImg.src=currentUser.profileImage; 

    let nickname = "";
    let profileImageData = ""; // 파일 업로드로 읽은 이미지 데이터를 저장

    // 닉네임 검증 함수 (json-server의 프로필 데이터를 기반으로 중복 검사)
    const validateNickname = async () => {
        const nicknameInput = document.getElementById("nickname");
        const errorText = document.getElementById("nickname-error");
        if (!nicknameInput || !errorText) return false;

        if (nicknameInput.value !== nicknameInput.value.replace(" ", "")) {
            errorText.textContent = "*공백이 제거된 닉네임을 입력해주세요.";
            return false;
        }

        nickname = nicknameInput.value;

        if (!nickname) {
            errorText.textContent = "*닉네임을 입력해주세요.";
            return false;
        }

        if (nickname.length > 10) {
            errorText.textContent = "*닉네임은 최대 10자까지 작성 가능합니다.";
            return false;
        }

        try {
            // json-server의 db.json에서 프로필 데이터를 가져옴
            const profiles = await getProfiles();
            // 입력한 닉네임과 동일한 닉네임이 존재하는지 확인
            const duplicate = profiles.find((profile) => profile.nickname === nickname);
            if (duplicate) {
                errorText.textContent = "*중복된 닉네임입니다.";
                return false;
            }
        } catch (error) {
            console.error("닉네임 중복 확인 중 오류: ", error);
            errorText.textContent = "*닉네임 확인 중 오류가 발생했습니다.";
            return false;
        }

        errorText.textContent = "";
        return true;
    };

    updateBtn.addEventListener("click", async () => {
        const isValid = await validateNickname();
        if (!isValid) return;

        // 업데이트할 프로필 데이터를 구성 (profileImageData가 있으면 추가)
        const profileData = {
            nickname,
            ...(profileImageData ? { profileImage: profileImageData } : {})
        };
        const profileId = currentUser.id;
        try {
            const result = await updateProfile(profileId, profileData);
            if (result) {
                showToast();
                // 업데이트된 사용자 정보 localStorage에 저장 
                localStorage.setItem("currentUser", JSON.stringify(result));
            } else {
                alert("프로필 수정 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("프로필 수정 중 오류: ", error);
            alert("프로필 수정 중 오류가 발생했습니다.");
        }
    });

    // 토스트 메시지 표시 함수
    const showToast = () => {
        const toast = document.getElementById("toast");
        if (!toast) return;

        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 5000);
    };

    // 프로필 이미지 변경 미리보기
    if (pictureUpload && profilePreview) {
        pictureUpload.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImageData = e.target.result; // Base64 데이터 저장
                    profilePreview.innerHTML = `
                        <img src="${profileImageData}" alt="프로필 사진">
                        <div class="profile-overlay">변경</div>
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 홈페이지 이동
    if (mainBtn) {
        mainBtn.addEventListener("click", () => {
            window.location.href = "/pages/posts/list.html";
        });
    }

    // 드롭다운 토글
    const toggleDropdown = () => {
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        }
    };

    if (profileImg) {
        profileImg.addEventListener("click", toggleDropdown);
    }

    // 페이지 클릭 시 드롭다운 닫기
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".profile-img") && dropdown) {
            dropdown.style.display = "none";
        }
    });

    // 회원 탈퇴 모달 표시
    if (quitBtn && quitModal) {
        quitBtn.addEventListener("click", () => {
            quitModal.style.display = "flex";
        });
    }

    // 모달 닫기 기능
    const closeModal = () => {
        if (quitModal) {
            quitModal.style.display = "none";
        }
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    // 회원 탈퇴 확정 기능
    const quit = () => {
        alert("회원 탈퇴가 완료되었습니다.");
        window.location.href = "/pages/auth/login.html";
    };

    if (quitConfirmBtn) {
        quitConfirmBtn.addEventListener("click", quit);
    }
    
    document.querySelector(".logout").addEventListener("click", function() {
        localStorage.clear(); 
        alert("로그아웃 되었습니다!");
        window.location.href = "../auth/login.html";  
      });
});
