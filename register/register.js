document.addEventListener("DOMContentLoaded", function () {
    const pictureUpload = document.getElementById("picture-upload");
    const profilePreview = document.getElementById("profile-preview");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordCheckInput = document.getElementById("password-check");
    const nicknameInput = document.getElementById("nickname");
    const registerBtn = document.getElementById("register-btn");

    // 가짜 데이터베이스 (중복 확인용)
    const existingEmails = ["test@example.com", "user@example.com"];
    const existingNicknames = ["user123", "nickname1"];

    pictureUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePreview.innerHTML = `<img src="${e.target.result}" alt="프로필 사진">`;
            };
            reader.readAsDataURL(file);
        }
        validateForm();
    });

    // 이메일 유효성 검사 및 중복 확인
    emailInput.addEventListener("blur", function () {
        // 입력된 모든 문자가 영문, '@', '.' 만 포함하는지 체크
        const allowedPattern = /^[A-Za-z@.]+$/;
        // 올바른 이메일 형식을 체크 (영문만 사용)
        const emailPattern = /^[A-Za-z]+(?:\.[A-Za-z]+)*@[A-Za-z]+\.[A-Za-z]+$/;
        
        if (!emailInput.value) {
            setError("email-error", "*이메일을 입력해주세요.");
        } else if (!allowedPattern.test(emailInput.value)) {
            setError("email-error", "*영문과 '@', '.'만 사용 가능합니다.");
        } else if (!emailPattern.test(emailInput.value)) {
            setError("email-error", "*올바른 이메일 주소 형식을 입력해 주세요.");
        } else if (existingEmails.includes(emailInput.value)) {
            setError("email-error", "*중복된 이메일입니다.");
        } else {
            clearError("email-error");
        }
        validateForm();
    });

    // 비밀번호 유효성 검사
    passwordInput.addEventListener("input", function () {
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
    passwordCheckInput.addEventListener("input", function () {
        if (!passwordCheckInput.value) {
            setError("password-check-error", "*비밀번호를 한 번 더 입력해 주세요.");
        } else if (passwordInput.value !== passwordCheckInput.value) {
            setError("password-check-error", "*비밀번호가 다릅니다.");
        } else {
            clearError("password-check-error");
        }
        validateForm();
    });

    // 닉네임 유효성 검사 및 중복 확인
    nicknameInput.addEventListener("blur", function () {
        if (!nicknameInput.value) {
            setError("nickname-error", "*닉네임을 입력해주세요.");
        } else if (nicknameInput.value.length > 10) {
            setError("nickname-error", "*닉네임은 최대 10자까지 작성 가능합니다.");
        } else if (/\s/.test(nicknameInput.value)) {
            setError("nickname-error", "*띄어쓰기를 없애주세요.");
        } else if (existingNicknames.includes(nicknameInput.value)) {
            setError("nickname-error", "*중복된 닉네임입니다.");
        } else {
            clearError("nickname-error");
        }
        validateForm();
    });

    // 폼 유효성 검사 및 회원가입 버튼 활성화
    function validateForm() {
        let isValid = true;
        
        // 프로필 사진 유효성 검사: 업로드하지 않았으면 오류 메시지 출력
        if (!pictureUpload.files.length) {
            setError("picture-error", "*프로필 사진을 추가해 주세요.");
            isValid = false;
        } else {
            clearError("picture-error");
        }
        
        isValid = isValid &&
            emailInput.value && !document.getElementById("email-error").textContent &&
            passwordInput.value && !document.getElementById("password-error").textContent &&
            passwordCheckInput.value && !document.getElementById("password-check-error").textContent &&
            nicknameInput.value && !document.getElementById("nickname-error").textContent;
        
        registerBtn.disabled = !isValid;
    }
    
    function setError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function clearError(id) {
        document.getElementById(id).textContent = "";
    }

    registerBtn.addEventListener("click", function () {
        if (!registerBtn.disabled) {
            alert("회원가입 성공");
            window.location.href = "../login/login.html";
        }
    });
});
