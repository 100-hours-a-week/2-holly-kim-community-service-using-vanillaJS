import { renderHeader } from "/js/components/header.mjs";

document.addEventListener("DOMContentLoaded", () => {
    renderHeader(); // 공통 헤더 삽입

    const updateBtn = document.getElementById("update-btn");

    if (updateBtn) {
        updateBtn.addEventListener("click", () => {
            alert("게시글 수정 완료");
            window.location.href = "/pages/posts/detail.html";
        });
    }

    document.addEventListener("click", (event) => {
        const dropdown = document.getElementById("dropdown-menu");

        if (event.target.matches(".profile-img")) {
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        } else if (dropdown) {
            dropdown.style.display = "none";
        }
    });
});
