# se9oo.GG

> RIOT API를 활용한 리그오브레전드 전적 검색 사이트

<br>

## 🛠 사용한 기술

### Front-end

- React ( Hooks )
- Redux & Redux saga
- Ant Design
- Styled Component
- Next.js
- highcharts.js (chart)

### Back-end

- Express.js ( node )
- MySQL

### DEVOPS

- AWS ( EC2 )

<br>

## 🖥 실행 화면 

### 목차  
[1. 메인](#메인)  
[2. 전적](#전적)  
- [2-1. 인게임 정보](#인게임-정보)  
- [2-2. 전적 상세 정보](#전적-상세-정보)  
- [2-3. 참가자 상세 정보](#참가자-상세-정보)  
- [2-4. 팀 분석 정보](#팀-분석-정보)  
- [2-5. 빌드 정보](#빌드-정보)  
- [2-6. 챔피언별 통계 정보](#챔피언별-통계-정보)  

[3. 로그인](#로그인)  
- [3-1. 회원가입](#회원가입)  
- [3-2. 프로필](#프로필)  

[4. 커뮤니티](#커뮤니티)  
- [4-1. 게시글 작성 및 수정](#게시글-작성-및-수정)  
- [4-2. 댓글 작성 및 삭제](#댓글-작성-및-삭제)  
  
[5. 챔피언](#챔피언)  
- [5-1. 챔피언 상세 정보](#챔피언-상세-정보)  

<br>
  
### 메인
![1. 메인](https://user-images.githubusercontent.com/39517335/169253735-a26f95a4-df5c-4a22-b696-a29a1f44e96d.png)
- 사용자 게임상 닉네임으로 전적을 조회 할 수 있습니다.

[목차로 이동](#목차)

<br>

### 전적
![2. 전적](https://user-images.githubusercontent.com/39517335/169260949-d9e33ba5-6bed-4dff-b5c5-121b6dbfaa9d.png)
![2. 전적-1](https://user-images.githubusercontent.com/39517335/169261096-2e2c6feb-96bf-4d59-88db-aaaf341305ff.png)
- 검색한 사용자의 솔로 랭크, 숙련도 TOP3, 전적 목록 정보를 조회 할 수 있습니다.

[목차로 이동](#목차)

<br>

#### 인게임 정보
![2-1. 인게임 정보](https://user-images.githubusercontent.com/39517335/169260456-bb5f5394-f363-409f-be56-a6dd69cb412e.png)
- 현재 진행중인 게임 정보를 확인 할 수 있습니다.

[목차로 이동](#목차)

<br>

#### 전적 상세 정보
![2-2. 전적 상세 ](https://user-images.githubusercontent.com/39517335/169274170-a2566583-9b81-4a1b-9b2f-da2af9dd5037.png)
- 진행한 게임에 대한 정보(승패, 진행 시기, 게임 총 시간, 오브젝트 점수, 아이템, 스펠, 룬, 스탯, 참가자)가 표시 됩니다.

[목차로 이동](#목차)

<br>

#### 참가자 상세 정보
![2-3. 참가자 상세](https://user-images.githubusercontent.com/39517335/169274903-531b41ac-5547-40c7-8739-a0e687b9b27d.png)
![2-3. 참가자 상세2](https://user-images.githubusercontent.com/39517335/169275389-0b21cbb7-10e7-4736-810e-3ae6d8a7a44b.png)

- 진행한 게임에 대한 참가자들의 정보(레벨, 스펠, 룬, 스텟, 아이템)가 표시 됩니다.

[목차로 이동](#목차)

<br>

#### 팀 분석 정보
![2-4. 팀 분석](https://user-images.githubusercontent.com/39517335/169275864-37c5d618-db1c-47df-aa22-ce46848123df.png)
- 챔피언에게 가한 피해, 골드 획득량, 챔피언 처치 등 게임 통계를 그래프로 표시 됩니다.

[목차로 이동](#목차)

<br>

#### 빌드 정보
![2-5. 빌드 정보](https://user-images.githubusercontent.com/39517335/169276251-7c8bb9ae-cee0-47b5-a6ef-ac48f5d3f704.png)
- 아이템을 구매/판매한 기록이 타임라인 순으로 표시됩니다.
- 스킬 마스터 순서와 각 레벨에 선택한 스킬이 표시됩니다.
- 선택한 룬과 하위 퍽, 특성 정보가 표시됩니다.

[목차로 이동](#목차)

<br>

#### 챔피언별 통계 정보
![2-6. 챔피언별 통계 정보](https://user-images.githubusercontent.com/39517335/169277472-dff3c2c5-84db-486f-a894-81f4f4c2377f.png)
- 챔피언별 골드 획득, 경험치 획득, CS 정보를 타임라인 순으로 표시됩니다.

[목차로 이동](#목차)

<br>
  
### 로그인
![3. 로그인](https://user-images.githubusercontent.com/39517335/169280806-c43a42f8-1e7a-4282-8aee-abf890acc20b.png)
- 이메일과 비밀번호를 입력하여 로그인 합니다.

[목차로 이동](#목차)

<br>

#### 회원가입
![3-1. 회원가입](https://user-images.githubusercontent.com/39517335/169281201-41140542-89b4-40d7-a8a9-6e74565ebe7d.png)
- 이메일, 닉네임, 비밀번호를 입력하여 회원가입 합니다.
- 비밀번호는 암호화되어 저장됩니다. (bcrypt)

[목차로 이동](#목차)

<br>
  
#### 프로필
![3-2. 프로필](https://user-images.githubusercontent.com/39517335/169285393-88bb9078-6237-4694-a2da-044c810ed0a5.png)
- 로그인한 사용자의 프로필 정보가 표시됩니다.
- 작성글 수, 작성글 목록, 레벨, 가입일이 표시됩니다.
- 비밀번호를 변경 할 수 있습니다.
- 프로필 이미지를 등록 할 수 있습니다.

[목차로 이동](#목차)

<br>
  
### 커뮤니티
![4. ](https://user-images.githubusercontent.com/39517335/169281987-15410599-5d17-44ff-b3dd-264368f825aa.png)
- 커뮤니티 게시글 목록이 조회되어 표시됩니다.
- 게시글 작성, 수정, 삭제가 가능합니다.
- 댓글 작성, 삭제가 가능합니다.
- 게시글에 좋아요 표시를 할 수 있습니다.

[목차로 이동](#목차)

<br>

#### 게시글 작성 및 수정
![4-1 게시글 작성 및 수정](https://user-images.githubusercontent.com/39517335/169281651-98511c88-da98-4ba2-8803-6c2c0dcac00f.png)
- 게시글을 작성하거나 삭제 할 수 있습니다.

[목차로 이동](#목차)

<br>

#### 댓글 작성 및 삭제
![4-2 댓글 작성 및 삭제](https://user-images.githubusercontent.com/39517335/169283657-32bce377-1aba-4011-92a0-b7e599760638.png)
- 댓글 작성하거나 삭제 할 수 있습니다.

[목차로 이동](#목차)

<br>

### 챔피언
![5. 챔피언](https://user-images.githubusercontent.com/39517335/169286515-e7e38191-ef20-4aeb-b4ab-a77fa7e82a12.png)
![5. 챔피언검색](https://user-images.githubusercontent.com/39517335/169287427-b08c1ff6-9d9f-4e01-8d22-9d6d1bfb49b1.gif)
- 리그오브레전드 모든 챔피언 정보를 확인 할 수 있는 페이지입니다.
- 챔피언을 검색 할 수 있습니다.

[목차로 이동](#목차)

<br>

#### 챔피언 상세 정보 
![5-1. 챔피언 상세](https://user-images.githubusercontent.com/39517335/169287825-1a4263c1-9395-439c-ad4f-df956e537a1e.png)
![5-1. 챔피언 상세2](https://user-images.githubusercontent.com/39517335/169287992-aac09a9b-be46-428c-983e-499cc5098d99.png)
![5-1. 챔피언 상세3](https://user-images.githubusercontent.com/39517335/169288115-ebacb48b-c40a-4f1d-b937-b245ac65ab82.png)
![5-1. 챔피언 상세4](https://user-images.githubusercontent.com/39517335/169290309-23c542ed-b40c-483e-aa61-0fc670443e51.gif)
- 챔피언의 상세 정보를 확인 할 수 있습니다.
- 챔피언 이름, 간략 스토리, 역할, 직업군, 스킬 정보가 표시되며 기본 스탯정보는 그래프로 표시됩니다.
- 챔피언 한줄평을 등록, 삭제 할 수 있습니다.
- 챔피언 스킨 목록은 캐루셀로 볼 수 있습니다.


[목차로 이동](#목차)

<br>
