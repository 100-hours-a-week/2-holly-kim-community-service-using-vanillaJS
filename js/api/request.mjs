const BASE_URL = "http://localhost:3000"; // JSON Server 주소

// 게시글 목록 가져오기 (GET)
export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`); 
    const posts = await response.json();
    console.log(posts);
    return posts;
  } catch (error) {
    console.error("게시글 가져오기 실패:", error);
  }
}

// 게시글 작성 (POST)
export async function createPost(email, author, title, content, created_at, likes, comments, views, imgUrl) {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, author, title, content, created_at, likes, comments, views, imgUrl }),
    }); 
    post = await response.json();
    console.log(post);
    return post;
  } catch (error) {
    console.error("게시글 작성 실패:", error);
  }
}

// 게시글 상세보기 (GET)
export async function fetchPost(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`); 
    if (!response.ok) throw new Error("게시글을 찾을 수 없음");
    const post = await response.json();
    console.log(post);
    return post;
  } catch (error) {
    console.error("게시글 가져오기 실패:", error);
  }
}

// 게시글 수정하기 (PATCH)
export async function updatePost(id, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("게시글 수정 실패");

    const updatedPost = await response.json();
    console.log("게시글 수정 완료:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생:", error);
  }
}

// 게시글 삭제하기 (DELETE)
export async function deletePost(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("게시글 삭제 실패");

    console.log(`게시글 ${id} 삭제 완료`);
    return true;
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생:", error);
    return false;
  }
}

// 게시글 좋아요 수 업데이트 (PATCH)
export async function updatePostLikes(postId, likes) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ likes }), // 좋아요 수를 업데이트
        });

        if (!response.ok) {
            throw new Error("게시글 업데이트 실패");
        }
        
        return await response.json(); // 업데이트된 게시글 반환
    } catch (error) {
        console.error("좋아요 업데이트 실패:", error);
    }
}

// 프로필 목록 가져오기 (GET) 
export async function getProfiles() {
  try {
    const response = await fetch(`${BASE_URL}/profile`);
    const profiles = await response.json();
    return profiles;
  } catch (error) {
    console.error("프로필 가져오기 실패:", error);
    throw error;
  }
}

// 프로필 업데이트 (PATCH) 
export async function updateProfile(profileId, profileData) {
  try {
    const response = await fetch(`${BASE_URL}/profile/${profileId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error("프로필 업데이트 실패");
    }

    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    return null;
  }
}

// 비밀번호 변경 (PATCH)
export async function updatePassword(profileId, newPassword) {
    try {
        const response = await fetch(`${BASE_URL}/profile/${profileId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: newPassword }) // 비밀번호만 업데이트
        });

        if (!response.ok) {
            throw new Error("비밀번호 변경 실패");
        }

        const updatedProfile = await response.json();
        return updatedProfile;
    } catch (error) {
        console.error("비밀번호 변경 실패:", error);
        return null;
    }
}

// 프로필 정보 가져오기 (기존 사용자 정보 조회)
export async function getProfile(profileId) {
    try {
        const response = await fetch(`${BASE_URL}/profile/${profileId}`);

        if (!response.ok) {
            throw new Error("프로필 조회 실패");
        }

        const profile = await response.json();
        return profile;
    } catch (error) {
        console.error("프로필 조회 실패:", error);
        return null;
    }
}

// 중복 이메일 또는 닉네임 체크
export async function checkDuplicate(field, value) {
    try {
        const response = await fetch(`${BASE_URL}/profile?${field}=${value}`);
        const data = await response.json();
        return data.length > 0; // 중복이 있으면 true, 없으면 false 반환
    } catch (error) {
        console.error("중복 확인 실패:", error);
        return false;
    }
}

// 회원가입 (POST)
export async function registerUser(email, password, nickname, profileImage) {
    try {
        // 이메일과 닉네임 중복 검사
        const isEmailDuplicate = await checkDuplicate("email", email);
        const isNicknameDuplicate = await checkDuplicate("nickname", nickname);

        if (isEmailDuplicate) {
            throw new Error("이미 사용 중인 이메일입니다.");
        }
        if (isNicknameDuplicate) {
            throw new Error("이미 사용 중인 닉네임입니다.");
        }

        // 새 사용자 추가
        const response = await fetch(`${BASE_URL}/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password, // 실제 서비스에서는 비밀번호 해싱 필요 (bcrypt.js 사용 가능)
                nickname,
                profileImage, // 프로필 이미지 (Base64 형식)
            })
        });

        if (!response.ok) {
            throw new Error("회원가입 실패");
        }

        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.error("회원가입 오류:", error);
        return null;
    }
}
 
export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/profile`);
  const users = await response.json();

  const user = users.find((u) => u.email === email && u.password === password);
  console.log(user);
  return user || null; // 로그인 성공 시 사용자 객체 반환, 실패 시 null 반환
}
