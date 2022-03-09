# express-jwt


### `'jsonwebtoken' 라이브러리 기반 access_token 발급, 로그인 인증 구현` ✅

- a. 유저 로그인 -> access_token 발급 후 쿠키에 담아 response한다.
- b. 이후 모든 요청에 대해 access_token 검증을 하는 미들웨어를 거친다.
- c. access_token이 유효하다면 정상적으로 응답하고, 기간이 만료됐거나 토큰에 문제가 있는 경우 기존 토큰을 폐기하고 재 로그인을 유도한다.
