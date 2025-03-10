import { registerUser, checkDuplicate } from "../../api/request.js";

document.addEventListener("DOMContentLoaded", function () {
    const pictureUpload = document.getElementById("picture-upload");
    const profilePreview = document.getElementById("profile-preview");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordCheckInput = document.getElementById("password-check");
    const nicknameInput = document.getElementById("nickname");
    const registerBtn = document.getElementById("register-btn");

    let profileImageBase64 = ""; // 프로필 이미지를 저장할 변수

    // 프로필 사진 업로드 처리
    pictureUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePreview.innerHTML = `<img src="${e.target.result}" alt="프로필 사진">`;
                profileImageBase64 = e.target.result; // Base64로 저장
            };
            reader.readAsDataURL(file);
        }
        validateForm();
    });

    // 이메일 중복 확인 및 유효성 검사
    emailInput.addEventListener("blur", async function () {
        const emailPattern = /^[A-Za-z]+(?:\.[A-Za-z]+)*@[A-Za-z]+\.[A-Za-z]+$/;

        if (!emailInput.value) {
            setError("email-error", "*이메일을 입력해주세요.");
        } else if (!emailPattern.test(emailInput.value)) {
            setError("email-error", "*올바른 이메일 주소 형식을 입력해 주세요.");
        } else {
            const isDuplicate = await checkDuplicate("email", emailInput.value);
            if (isDuplicate) {
                setError("email-error", "*중복된 이메일입니다.");
            } else {
                clearError("email-error");
            }
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

    // 닉네임 중복 확인 및 유효성 검사
    nicknameInput.addEventListener("blur", async function () {
        if (!nicknameInput.value) {
            setError("nickname-error", "*닉네임을 입력해주세요.");
        } else if (nicknameInput.value.length > 10) {
            setError("nickname-error", "*닉네임은 최대 10자까지 작성 가능합니다.");
        } else if (/\s/.test(nicknameInput.value)) {
            setError("nickname-error", "*띄어쓰기를 없애주세요.");
        } else {
            const isDuplicate = await checkDuplicate("nickname", nicknameInput.value);
            if (isDuplicate) {
                setError("nickname-error", "*중복된 닉네임입니다.");
            } else {
                clearError("nickname-error");
            }
        }
        validateForm();
    });

    // 폼 유효성 검사 및 회원가입 버튼 활성화
    function validateForm() {
        let isValid = true;

        if (!pictureUpload.files.length) {
            setError("picture-error", "*프로필 사진을 추가해 주세요.");
            isValid = false;
        } else {
            clearError("picture-error");
        }

        isValid =
            isValid &&
            emailInput.value &&
            !document.getElementById("email-error").textContent &&
            passwordInput.value &&
            !document.getElementById("password-error").textContent &&
            passwordCheckInput.value &&
            !document.getElementById("password-check-error").textContent &&
            nicknameInput.value &&
            !document.getElementById("nickname-error").textContent;

        registerBtn.disabled = !isValid;
    }

    function setError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function clearError(id) {
        document.getElementById(id).textContent = "";
    }

    // 회원가입 버튼 클릭 이벤트
    registerBtn.addEventListener("click", async function () {
        if (!registerBtn.disabled) {
            const email = emailInput.value;
            const password = passwordInput.value;
            const nickname = nicknameInput.value;

            try {
                const newUser = await registerUser(email, password, nickname, profileImageBase64);
                if (newUser) {
                    alert("회원가입 성공!");
                    window.location.href = "../auth/login.html";
                } else {
                    alert("회원가입 중 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("회원가입 오류:", error);
                alert("회원가입 중 오류가 발생했습니다.");
            }
        }
    });
});
