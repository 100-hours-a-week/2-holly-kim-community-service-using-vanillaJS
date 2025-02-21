document.addEventListener("DOMContentLoaded", () => {
    // 비밀번호 입력 필드 및 버튼 가져오기
    const passwordInput = document.getElementById("password");
    const passwordCheckInput = document.getElementById("password-check");
    const updateBtn = document.getElementById("update-btn");
    const dropdown = document.getElementById("dropdown-menu");

    // 오류 메시지 설정 및 제거
    const setError = (id, message) => {
        document.getElementById(id).textContent = message;
    };

    const clearError = (id) => {
        document.getElementById(id).textContent = "";
    };
    // 폼 유효성 검사 및 업데이트 버튼 활성화
    const validateForm = () => {
        const isValid =
            passwordInput.value && !document.getElementById("password-error").textContent &&
            passwordCheckInput.value && !document.getElementById("password-check-error").textContent;

        if (updateBtn) updateBtn.disabled = !isValid;
    };

    
    // 비밀번호 유효성 검사
    passwordInput.addEventListener("input", () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

        if (!passwordInput.value) {
            setError("password-error", "*비밀번호를 입력해주세요.");
        } else if (!passwordPattern.test(passwordInput.value)) {
            setError("password-error", "*비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.");
        } else {
            clearError("password-error");
        }

        validateForm();
    });

    // 비밀번호 확인 검사
    passwordCheckInput.addEventListener("input", () => {
        if (!passwordCheckInput.value) {
            setError("password-check-error", "*비밀번호를 한 번 더 입력해 주세요.");
        } else if (passwordInput.value !== passwordCheckInput.value) {
            setError("password-check-error", "*비밀번호가 다릅니다.");
        } else {
            clearError("password-check-error");
        }

        validateForm();
    });

    
    // 비밀번호 업데이트 버튼 클릭 이벤트
    updateBtn.addEventListener("click", () => {
        if (!updateBtn.disabled) {
            alert("비밀번호 업데이트 완료");
            window.location.href = "profile.html";
        }
    });
 
    document.addEventListener("click", (event) => { 
        if (event.target.matches(".profile-img")) {
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        } else if (dropdown) {
            dropdown.style.display = "none";
        }
    });

});
