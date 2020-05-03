## 202012706 고성환

7주차 과제 - 프론트엔드 추가 (pug 기반)

리스트, 게임 추가, 수정, 삭제는 index.pug에 작성해놨습니다.

기존의 삭제 및 수정 버그 수정 (index 참조 오류)

---

6주차 과제 - API 서버

index.js 실행

# 사용법

* [URL](#URL)
* [출력](#출력)
* [추가](#추가)
* [수정](#수정)
* [삭제](#삭제)
---
## URL

|항목|URL|Method|
|-:|--|--|
|[게임 목록 출력](#게임-목록-출력)|/games|GET|
|[게임 목록 검색 출력](#게임-목록-검색-출력)|/games/:METHOD/:TEXT|GET|
|[게임 목록 정렬 출력](#게임-목록-정렬-출력)|/games/:SORT|GET|
|[게임 출력](#게임-출력)|/game/:ID|GET|
|[게임 추가](#게임-추가)|/game|POST|
|[게임 수정](#게임-수정)|/game|PUT|
|[게임 삭제](#게임-삭제)|/game/:ID|DELETE|

---
## 출력

### 게임 목록 출력
|요청|설명|
|-:|--|
|URL|/games|
|Method|GET|

### 게임 목록 검색 출력
|요청|설명|
|-:|--|
|URL|/games/:METHOD/:TEXT|
|:METHOD|검색 분류 (title, dev, platform)|
|:TEXT|검색 텍스트|
|ex)|/games/title/close|
|Method|GET|

### 게임 목록 정렬 출력
|요청|설명|
|-:|--|
|URL|/games/:SORT|
|:SORT|정렬 분류 (id, title, dev, platform, score, date)|
|ex)|/games/title|
|Method|GET|

### 게임 출력
|요청|설명|
|-:|--|
|URL|/game/:ID|
|:ID|검색 ID|
|ex)|/game/1|
|Method|GET|


#### 출력 응답 예

|응답|설명|
|-:|--|
|id|ID|
|title|이름|
|genre|장르|
|developer|개발사|
|releaseDate|출시일|
|score|점수|
|platform|지원기기|

``` 
{
"data": [
    {
        "id": 0,
        "title": "MOTOGP 20",
        "genre": "Racing, Arcade, Automobile",
        "developer": "Dorna Sports S.L.",
        "releaseDate": 20200423,
        "score": 78,
        "platform": "PlayStation 4"
    },
    ...
```
---
## 추가

### 게임 추가
|요청|설명||
|-:|--|--|
|URL|/game||
|Method|PUSH||
|data|title|이름|
||genre|장르|
||developer|개발사|
||releaseDate|출시일|
||score|점수|
||platform|지원기기|

#### 추가 응답 예
추가 데이터를 보여줌
```
{
    "msg": "성공",
    "data": {
        "id": 5,
        "title": "HALF-LIFE: ALYX",
        "genre": "Action, First-Person, Shooter, Arcade",
        "developer": "Valve Software",
        "releaseDate": 20200323,
        "score": 93,
        "platform": "PC"
    }
}
```
---
## 수정

### 게임 수정
|요청|설명||
|-:|--|--|
|URL|/game||
|Method|PUT||
|data|id|ID|
||title|이름|
||genre|장르|
||developer|개발사|
||releaseDate|출시일|
||score|점수|
||platform|지원기기|


#### 수정 응답 예
수정 후 데이터를 보여줌
```
{
    "msg": "수정 성공",
    "data": {
        "id": 5,
        "title": "HALF-LIFE: ALYX",
        "genre": "Action, First-Person, Shooter, Arcade",
        "developer": "Valve Software",
        "releaseDate": 20200323,
        "score": 100,
        "platform": "PC"
    }
}
```
---
## 삭제

### 게임 삭제
|요청|설명||
|-:|--|--|
|URL|/game/:ID||
|Method|DELETE||
||:ID|ID|

#### 삭제 응답 예
삭제한 데이터를 보여줌

```
{
    "msg": "삭제 성공",
    "data": {
        "id": 5,
        "title": "HALF-LIFE: ALYX",
        "genre": "Action, First-Person, Shooter, Arcade",
        "developer": "Valve Software",
        "releaseDate": 20200323,
        "score": 100,
        "platform": "PC"
    }
}
```
---


# 개선할 점 


실제 API는 쿼리를 이용해 다양한 조건을 합쳐서 사용함

-> 게임 목록 출력 3개 합치기

인터페이스가 일관적이지 않음 (URL 경로와 검색이 혼용되어있음)

예제 자료가 너무 적음

카운트 추가

요청에 따라 다른 응답 (리스트에는 세부내용이 안나오는등)

분류 데이터들 id화