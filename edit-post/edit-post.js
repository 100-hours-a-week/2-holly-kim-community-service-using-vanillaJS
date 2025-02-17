const updateBtn = document.getElementById("update-btn");

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("dropdown-menu");
    if (!event.target.matches('.profile-img')) {
        dropdown.style.display = "none";
    }
});

// 뒤로가기 기능
function goBack() {
    window.location.href = "../main/main.html";
}

updateBtn.addEventListener("click", function () { 
        alert("게시글 수정 완료");
        window.location.href = "../post-detail/post-detail.html";
    
});

