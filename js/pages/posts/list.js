// import { apiRequest } from "../../api/request.js";
// import { ENDPOINTS } from "../../api/endpoints.js";

// async function fetchPosts() {
//   try {
//     const posts = await apiRequest(ENDPOINTS.POSTS.LIST);
//     renderPosts(posts);
//   } catch (error) {
//     console.error("게시글 목록을 불러오는 중 오류 발생:", error);
//   }
// }

// function renderPosts(posts) {
//   const postContainer = document.getElementById("post-list");
//   postContainer.innerHTML = posts
//     .map((post) => `<div class="post-item">${post.title}</div>`)
//     .join("");
// }

// document.addEventListener("DOMContentLoaded", fetchPosts);



let postCount=0;
const postList = document.getElementById("post-list"); 

// 날짜 및 시간 포맷팅 함수
function getFormattedDate() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

// 숫자 단위 변환 함수 (1k, 10k, 100k)
function formatNumber(num) {
    if (num >= 100000) return Math.floor(num / 1000) + "k";
    if (num >= 10000) return (num / 1000).toFixed(0) + "k";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
}

// 게시글 작성 버튼 클릭 시 post.html로 이동
document.getElementById("create-btn").addEventListener("click", function () {
    window.location.href = "../../pages/posts/create.html";
});

// 게시글 생성 함수 (최신 게시글이 아래로 추가)
function createPost(title, stats, date, author, authorImgUrl) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.innerHTML = `
        <h2>${title.slice(0, 26)}</h2>
        <p class="meta">${stats}</p>
        <p class="time">${date}</p> 
        <div class="author-container">
            <img src="${authorImgUrl}" alt="${author}의 프로필" class="author-img">
            <p class="author">${author}</p>
        </div>
    `;

    // 현재 postCount 값을 고정
    const currentPostId = postCount;

    // 카드 클릭 시 게시글 상세 페이지로 이동
    newPost.addEventListener("click", function () {
        window.location.href = `../../pages/posts/detail.html?id=${currentPostId}`;
    });

    postList.appendChild(newPost); // 최신 게시글이 아래로 추가
    postCount++; 
}


// 초기 게시글 3개 추가
function loadInitialPosts() {
    for (let i = 1; i <= 3; i++) {
        const likes = Math.floor(Math.random() * 1500);
        const comments = Math.floor(Math.random() * 1200);
        const views = Math.floor(Math.random() * 200000);
        const postStats = `좋아요 ${formatNumber(likes)} | 댓글 ${formatNumber(comments)} | 조회수 ${formatNumber(views)}`;

        createPost(`제목 1`, postStats, getFormattedDate(), "더미 작성자 1", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s");
    }
}

// 인피니티 스크롤링
window.addEventListener("scroll", function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMorePosts();
    }
});

// 추가 게시글 로드 함수
function loadMorePosts() {
    for (let i = 0; i < 3; i++) {
        const likes = Math.floor(Math.random() * 1500);
        const comments = Math.floor(Math.random() * 1200);
        const views = Math.floor(Math.random() * 200000);
        const postStats = `좋아요 ${formatNumber(likes)} | 댓글 ${formatNumber(comments)} | 조회수 ${formatNumber(views)}`;

        createPost(`제목 1`, postStats, getFormattedDate(), "더미 작성자 1", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s");
    }
}

// 초기 게시글 로드 실행
loadInitialPosts();

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