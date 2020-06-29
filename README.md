## 202012706 고성환

# 최종 과제 - (MySQL 기반)

<img src='https://user-images.githubusercontent.com/39910963/86020250-a40b8080-ba62-11ea-95ef-e37d8bc5cee1.jpg'>

사이트 - 겜평소

사용자가 로그인하여 게임 평가를 등록하는 사이트

AWS(RDS) 사용, session 사용

## AWS(RDS) MYSQL 사용

## 사용 테이블 USERS(로그인용), GAMES(게임), FLATFORMS(지원기기)

## session 활용 로그인

## 로그인 아이디 샘플

admin - 1234

user - user


# 가입 페이지 (get : /resister, post : /resister)

<img src='https://user-images.githubusercontent.com/39910963/86020247-a40b8080-ba62-11ea-8dcb-f61e623c7e4c.jpg'>


# 로그인 페이지 (get : 로그인 하지 않을시 표시, post: /login)

<img src='https://user-images.githubusercontent.com/39910963/86020245-a372ea00-ba62-11ea-92e9-0ba9d6b7e5f7.jpg'>

중복 id 가입 방지가 적용 되어있습니다.

# 목록 페이지 (get : /)

정렬 기능 - 상단의 이름을 클릭하면 해당열로 정렬

추가 (post : /game)

수정 (put : /game)

삭제 (delete : /game/:gameId)

<img src='https://user-images.githubusercontent.com/39910963/86020250-a40b8080-ba62-11ea-95ef-e37d8bc5cee1.jpg'>
