// Mock Data (댓글 리스트)
let comments = [
    { id: 1, author: "더미 작성자 1", date: "2021-01-01 00:00:00", content: "댓글 내용 1" },
    { id: 2, author: "더미 작성자 2", date: "2021-01-02 12:34:56", content: "댓글 내용 2" }
];
let viewCount = 123; //초기 조회수

// 댓글 화면 갱신
function renderComments() {
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = "";

    comments.forEach(comment => {
        const commentItem = document.createElement("li");
        commentItem.classList.add("comment-item");
        commentItem.innerHTML = `
            <div class="comment-meta">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-content">${comment.content}</p>
            <div class="comment-actions">
                <button class="edit-comment" onclick="editComment(${comment.id})">수정</button>
                <button class="delete-comment" onclick="deleteComment(${comment.id})">삭제</button>
            </div>
        `;
        commentList.appendChild(commentItem);
    });
}

// 댓글 추가
function addComment() {
    const commentInput = document.querySelector(".comment-input");
    const content = commentInput.value.trim();

    if (content === "") return;

    const newComment = {
        id: comments.length ? comments[comments.length - 1].id + 1 : 1,
        author: "현재 사용자", 
        date: new Date().toISOString().replace("T", " ").slice(0, 19),
        content: content
    };

    comments.push(newComment);
    commentInput.value = "";
    toggleCommentButton();
    renderComments();
}

// 댓글 수정
function editComment(commentId) {
    const commentItem = document.getElementById(`comment-${commentId}`);
    const commentContent = commentItem.querySelector(".comment-content");
    const oldText = commentContent.innerText;

    // 기존 댓글을 숨기고, input 추가
    commentContent.style.display = "none";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = oldText;
    inputField.classList.add("edit-input");

    const saveButton = document.createElement("button");
    saveButton.innerText = "저장";
    saveButton.classList.add("save-comment");
    saveButton.onclick = function () {
        saveComment(commentId, inputField.value);
    };

    commentItem.appendChild(inputField);
    commentItem.appendChild(saveButton);
}
function saveComment(commentId, newText) {
    if (!newText.trim()) {
        alert("댓글 내용을 입력하세요!");
        return;
    }

    // Mock Data 업데이트
    const commentIndex = comments.findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
        comments[commentIndex].content = newText;
    }

    // 화면 갱신
    renderComments();
}


// 댓글 삭제
function deleteComment(commentId) {
    if (confirm("댓글을 삭제하시겠습니까?")) {
        comments = comments.filter(c => c.id !== commentId);
        renderComments();
    }
}

// 댓글 입력 버튼 활성화
function toggleCommentButton() {
    let commentInput = document.querySelector(".comment-input");
    let submitButton = document.querySelector(".comment-submit");

    if (commentInput.value.trim().length > 0) {
        submitButton.classList.add("active");
        submitButton.disabled = false;
        submitButton.onclick = addComment;
    } else {
        submitButton.classList.remove("active");
        submitButton.disabled = true;
    }
}

// 초기 댓글 렌더링
document.addEventListener("DOMContentLoaded", () => {
    renderComments(); increaseViewCount();
});


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

// 게시글 수정 페이지로 이동
function editPost() {
    window.location.href = "../edit-post/edit-post.html";
}

// 모달 열기
function confirmDelete() {
    document.getElementById("delete-modal").style.display = "flex";
    document.body.style.overflow = "hidden";  // 배경 스크롤 방지
}

// 모달 닫기
function closeModal() {
    document.getElementById("delete-modal").style.display = "none";
    document.body.style.overflow = "auto";  // 스크롤 복구
}

// 게시글 삭제
function deletePost() {
    alert("게시글이 삭제되었습니다.");
    window.location.href = "../main/main.html";
}

// 조회수 및 댓글 수 포맷팅
function formatCount(num) {
    if (num >= 100000) return (num / 100000).toFixed(0) + "k";
    if (num >= 10000) return (num / 10000).toFixed(0) + "k";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
} 


let isLiked = false;
function toggleLike() {
    const likeButton = document.getElementById("like-count");

    let likeCount = parseInt(likeButton.innerText.split(" ")[0]);

    if (isLiked) {
        likeCount--; // 짝수 번째 클릭 시 -1
        likeButton.classList.remove("liked");
        likeButton.style.backgroundColor = "#f0f0f0"; // 원래 색상
    } else {
        likeCount++; // 홀수 번째 클릭 시 +1
        likeButton.classList.add("liked");
        likeButton.style.backgroundColor = "#aca0eb"; // 변경된 색상
    }

    isLiked = !isLiked; // 상태 반전
    likeButton.innerHTML = `${formatCount(likeCount)} <br>좋아요`;
}

// 댓글 개수 업데이트
function updateCommentCount() {
    document.getElementById("comment-count").innerHTML = `${comments.length} <br>댓글`;
}

// 조회수 증가 (페이지 로드 시)
function increaseViewCount() {
    viewCount++;
    document.getElementById("view-count").innerHTML = `${viewCount} <br>조회수`;
}

// 댓글 화면 갱신
function renderComments() {
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = "";

    comments.forEach(comment => {
        const commentItem = document.createElement("li");
        commentItem.classList.add("comment-item");
        commentItem.id = `comment-${comment.id}`;
        commentItem.innerHTML = `
            <div class="comment-meta">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-content">${comment.content}</p>
            <div class="comment-actions">
                <button class="edit-comment" onclick="editComment(${comment.id})">수정</button>
                <button class="delete-comment" onclick="deleteComment(${comment.id})">삭제</button>
            </div>
        `;
        commentList.appendChild(commentItem);
    });

    updateCommentCount(); 
}

