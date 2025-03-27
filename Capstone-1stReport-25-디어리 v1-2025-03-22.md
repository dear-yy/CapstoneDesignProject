<!-- Template for PROJECT REPORT of CapstoneDesign 2025-2H, initially written by khyoo -->
<!-- 본 파일은 2025년도 컴공 졸업프로젝트의 <1차보고서> 작성을 위한 기본 양식입니다. -->
<!-- 아래에 "*"..."*" 표시는 italic체로 출력하기 위해서 사용한 것입니다. -->
<!-- "내용"에 해당하는 부분을 지우고, 여러분 과제의 내용을 작성해 주세요. -->

# Team-Info
| (1) 과제명 | *책을 읽지 않고 빠르게 교양을 얻고 싶은 사용자를 위한 openAI 활용 퀴즈 서비스*
|:---  |---  |
| (2) 팀 번호 / 팀 이름 | 25-디어리 |
| (3) 팀 구성원 | 황보혜 (2271066): 리더, BE, ERD 설계 및 데이터베이스 구축 <br> 이윤서 (2271048) : 팀원, BE, Django API 개발 <br> 박신양 (2271027): 팀원, FE, Flutter 기반 UI 설계 및 구현 |
| (4) 팀 지도교수 | 오세은 교수님 |
| (5) 과제 분류 | 산학과제 |
| (6) 과제 키워드 | 퀴즈봇, 프롬프트 엔지니어링, 교양 지식 |
| (7) 과제 내용 요약 | 본 과제의 주요 대상은 책을 읽지 않지만 교양 지식에 대한 욕구가 있는 성인이며, 이들을 위한 교양 퀴즈봇 시스템을 개발하는 것을 목표로 한다. <br> 최근 숏폼 소비가 증가하면서 짧은 시간에 정보를 얻는 데 익숙해진 이들이 많아졌다. 이는 집중력과 문해력 저하로 이어져 독서를 통한 지식 습득에 어려움을 겪는 사례가 늘고 있다. 이러한 문제를 해결하기 위해 책이 아닌 아티클 기반의 짧고 간편한 학습 경험을 모바일로 제공하고자 한다. <br> OpenAI와 Custom Search JSON API를 이용해 사용자가 입력한 키워드를 기반으로 적절한 아티클을 추천하고, 해당 콘텐츠로부터 자동 생성된 퀴즈를 제공한다. 이를 통해 사용자는 스스로 선택한 관심 주제에 따라 교양 지식을 쌓고 성취감을 얻을 수 있다. 또한 Django Channels를 활용한 실시간 사용자 간 퀴즈 배틀 기능을 구현 중이며, 추후 랭킹 시스템 도입을 통해 지속적인 참여와 학습 동기를 부여할 예정이다.

<br>

# Project-Summary
| 항목 | 내용 |
|:---  |---  |
| (1) 문제 정의 | 최근 책을 읽지 않고도 교양을 쌓고자 하는 성인 비독서자들이 증가하고 있다. 이들은 SNS를 통해 자신의 지식을 드러내고자 하는 욕구가 높지만, 유튜브, 틱톡 등의 숏폼 시청이 일상화 되면서 집중력과 문해력이 저하되어 독서를 통한 지식 습득에 어려움을 느끼고 있다. 또한 책보다 영상 매체를 선호하여 빠르게 정보를 습득하는 것에 익숙하다. 이로 인해 교양과 상식에 관심이 있음에도 불구하고 독서에 진입장벽을 느끼고 있다. 이들은 많은 시간이 필요한 전통적인 독서보다 짧고 간편한 방식을 통해 교양 지식을 얻길 원한다. 이에 따라, 관심 분야에 대해 빠르고 간단하게 교양 지식을 얻을 수 있는 학습 형태가 필요하다. |
| (2) 기존연구와의 비교 | 아직까지 openAI를 사용하여 사용자 맞춤 퀴즈를 제공하는 서비스는 시중에 존재하지 않는다. “상식 퀴즈”는 사용자의 상식을 증진시킬 수 있는 퀴즈 앱으로 사용자가 특정 분야를 선택할 수 없고 오직 일반 상식만을 다룬다. “Quiz Planet”의 경우, 대부분의 문제가 간단한 키워드 맞히기, 유명인이 남긴 명언 맞히기와 같은 간단한 객관식으로 장기 사용자가 없으며 심심풀이용으로 잠깐 소비되는 것이 특징인 퀴즈 앱이다. 이렇게 “상식 퀴즈”와 “Quiz Planet”은 정적인 퀴즈 생성 방식으로 앱 사용 방법이 간단하기 때문에 진입장벽이 낮다는 장점을 가지는 한편 사용자의 관심사와 흥미와는 무관한 지식을 다루고 있다는 한계점이 있다. 이에 반해 본 과제가 제안하는 서비스는 사용자가 요청한 분야를 실제로 학습할 수 있다는 점이 큰 장점이다. 또한, 해당 분야에 대한 사전 지식이 없더라도 제공된 아티클을 읽으며 학습할 수 있다는 점과 동적으로 퀴즈를 생성한다는 점에서 단순히 퀴즈만을 제공하는 다른 앱들과 차별성이 있다. 경쟁 모드인 배틀 기능을 활용하여 게임과 같은 재미와 오랫동안 학습할 계기를 제공한다는 점도 우리 서비스의 장점이다. |
| (3) 제안 내용 | 1. 책보다 빠르고 간편하게 접근하여 교양과 상식을 얻을 수 있도록 온라인 서비스를 제공한다. <br> 2. 사용자들이 관심을 가지고 학습을 시작할 수 있도록 사용자가 원하는 분야에 대한 아티클을 제공한다. <br> 3. 사용자의 집중력을 고려하여 15분 내외의 빠른 시간 내에 끝낼 수 있는 학습 서비스를 제공한다. <br> 4. 채팅 형식의 상호작용을 통해 사용자의 학습을 평가하고 올바른 학습 방향성을 제시한다. <br> 5. 학습 동기 부여와 성취감을 위해 배틀 모드, 랭킹 시스템 등의 게이미피케이션 요소를 활용한다. <br> 6. 주기적인 학습을 통해 글을 읽는 습관을 들이고 집중력을 키울 수 있도록 도와준다. |
| (4) 기대효과 및 의의 | 사용자가 원하는 키워드와 관련된 아티클을 읽고 퀴즈를 풂으로써 독서보다 간편하게 교양 지식을 습득할 수 있다. 이를 통해 짧은 영상 매체에 익숙한 비독서자들에게 학습 대안을 제시할 수 있으며, 사용자의 지적 욕구를 효율적으로 충족시킬 수 있다. 장기적으로는 글을 읽는 습관을 들일 수 있도록 함으로써 사용자의 집중력, 문해력 향상에도 도움을 줄 수 있다. 또한 AI 기반 서술형 퀴즈 피드백과 퀴즈 배틀 및 랭킹 시스템을 통한 게이미피케이션 요소는 학습 몰입도를 높이고 반복학습을 유도하여 장기적인 학습을 가능하게 한다는 점에서 교육적 의의가 있다. |
| (5) 주요 기능 리스트  |**1. 안드로이드 어플리케이션** <br> **2. 관심 키워드 기반 아티클 추천**: Instruction-based Prompting과 Custum Search JSON API를 이용하여 사용자가 입력한 키워드와 관련된, 책보다 짧고 핵심 주제가 명확하며 공신력있는 아티클을 제공 <br> **3. 자동 퀴즈 생성과 서술형 퀴즈 피드백**: OpenAI와 Beautiful Soup, 텍스트 분할 함수, 아티클 요약 함수를 통해 사용자에게 퀴즈(객관식 2, 서술형 1)와 모범 답안을 제공 <br>**4. 퀴즈봇**: Django Channels를 이용한 실시간 Websocket 통신을 통해 챗봇 형식의 퀴즈 학습 제공 <br> **5. 실시간 퀴즈 배틀**: Django Channels와 Redis를 이용한 Websocket 통신을 통해 실시간 동접자 배틀 모드를 제공  <br> **6. 랭킹 시스템** |

<br>
 
# Project-Design & Implementation
| 항목 | 내용 |
|:---  |---  |
| (1) 요구사항 정의 | **1.기능 명세 (API 중심)** <br> <img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/API_user_and_quiz.png" width="65%" /> <br> <img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/API_battle.png" width="65%" /><br> <img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/API_ranking.png" width="65%"/> <br> **2. Entity-Relationship Diagram** <img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/ERD.jpg" width="80%" />
| (2) 전체 시스템 구성 | <strong>System Architecture</strong><br><img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/sw%20%EA%B5%AC%EC%A1%B0%EB%8F%84.jpeg" width="530" /> <br> **주요 SW 모듈 및 역할** <br>Flutter (프론트엔드 앱): 사용자 인터페이스 및 퀴즈 채팅 및 배틀 화면과 랭킹 화면 제공 <br> Django (백엔드 API): 사용자 정보 관리, 퀴즈 생성, 점수 저장, 매칭 시스템 <br> PostgreSQL (DB): 사용자 데이터, 퀴즈 기록, 채팅 내역, 배틀 결과 저장 <br> **오픈소스 사용** <br> Django Rest Framework (DRF): API 개발 <br> Django Channels: WebSocket 기반 실시간 통신 <br> Custom Search JSON API: 키워드를 이용하여 뉴스, 아티클을 선정 |
| (3) 주요엔진 및 기능 설계 | GPT API (OpenAI): 기사의 주요 내용 요약 및 적절 기사 추천, 퀴즈 3문제 생성, 모범 답안 생성 및 서술형 점수 부여하는데 사용하며, AI에게 명확한 지시사항을 제공하여 원하는 출력값을 유도하는 instruction-base-prompting기법을 기반으로 을 기반으로 구현함<br> WebSocket (Django Channels): 메세지 전송을 위한 위한 실시간 통신 제공 모듈로, 채팅형 퀴즈 형식을 구현하기 위해 사용<br> Redis: 동시 접속 중인 사용자들을 1:1 매칭시키기 위해 사용|
| (4) 주요 기능의 구현 | <strong>1. 관심 키워드 기반 아티클 추천 기능</strong><br>관심 키워드 기반 아티클 추천 기능은 크게 세 가지 단계를 거쳐 구현된다.<br><br>먼저, 사용자가 관심사에 대해 간단히 입력하면, OpenAI를 통해 해당 입력과 관련된 키워드를 추출된다. 이때, 이전에 추출된 키워드가 있다면 이를 포함하여 새로운 키워드를 추출함으로써 사용자의 관심 분야를 확장하는 방식으로 키워드 목록을 갱신한다.<br><img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/keyword_extract_prompt.png" width="80%" /><br><br>이후, 키워드 기반 기사 검색을 위해 미리 신뢰할 수 있는 언론사 목록을 작성하고, Custom Search JSON API를 사용하여 키워드와 언론사 정보를 바탕으로 쿼리를 구성하여 관련 기사 리스트를 추출한다.<br><br>마지막으로, 추출된 기사 목록과 사용자 입력을 활용하여 OpenAI를 통해 사용자 관심사와 퀴즈 출제에 가장 적합한 기사를 선정할 수 있도록 Instruction-based Prompting 기법을 활용해 기사를 추천하도록 요청한다. 이 과정을 통해 사용자는 자신의 관심에 맞는 기사들을 추천받을 수 있게 된다.<br><img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/article_recommend_prompt.png" width="80%" /><br><br>- 사용 기술: GPT-4o-mini, Custom Search JSON API <br><br><br><br><strong>2. 퀴즈와 서술형 퀴즈 피드백 생성</strong><br>퀴즈와 서술형 퀴즈 피드백 생성을 위해서는 아티클 스크래핑, 아티클 기반 퀴즈와 서술형 피드백 생성 과정을 거친다.<br><br>먼저 아티클을 스크래핑하기 전에 각 언론사의 도메인과 본문을 찾을 태그 및 클래스를 미리 매핑하여 SITE_CLASS_MAPPING 리스트를 작성한다.그 후, 최종 선택된 아티클을 기반으로 매핑 정보를 활용해 requests를 사용하여 HTML을 요청하고, BeautifulSoup으로 파싱하여 본문을 추출한다. 본문을 추출할 때는 텍스트 요소를 찾아 줄바꿈을 포함한 본문을 반환하며, 오류가 발생하면 None을 반환하도록 한다.<br><br>아티클 기반 퀴즈와 서술형 피드백 생성을 OpenAI로 처리하기 위해, 스크래핑을 통해 추출된 본문 텍스트를 OpenAI의 프롬프트에 적합한 크기와 형태로 가공해야 한다. 이를 위해 텍스트 분할 함수와 아티클 요약 함수를 사용하여 텍스트를 가공한다. 이후, 가공된 아티클 본문을 프롬프트에 포함시켜 Instruction-based Prompting 기법으로 아티클 기반 퀴즈와 서술형 피드백 생성을 요청하는 프롬프트를 구성한다. 다음 프롬프트로 OpenAI에게 아티클 기반 퀴즈와 서술형 피드백 생성을 요청하고, 요청 결과로 받은 퀴즈와 피드백 정보를 파싱하여 사용자에게 제공한다.<br><img scr="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/descriptive_answer_prompt.png" width="80%"><br><br>- 사용 기술: GPT-4o-mini, BeautifulSoup<br><br><br><br><strong>3.퀴즈봇 형식의 퀴즈 출제</strong><br> Django Channels를 이용한 실시간 WebSocket 통신을 구현하였다. 먼저, 실시간 통신을 위해 ASGI를 설정하여 WebSocket을 처리할 수 있도록 환경을 설정하고, URL 라우팅을 처리하였다. 이후, 클라이언트와의 통신을 위한 Consumer 클래스를 작성하여 웹소켓 연결과 채팅 형식의 실시간 퀴즈 데이터와 응답 메세지 처리를 구현하였다.<br><img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/quizroom_UI.png" width="200"><br><br>- 사용 기술: Django-channels, Redis<br><br><br><br><strong>4. 배틀 매칭</strong><br>경쟁 모드는 실시간 퀴즈 배틀 기능으로 Redis의 Queue 기능을 사용하여, 대기열에 추가된 접속 중인 사용자 두 명을 1:1로 매칭 시켜 배틀방을 생성하면서 시작한다.<br><br> 두 사용자가 동시에 배틀룸에 접속한 상태에서 배틀룸의 아티클과 퀴즈를 준비하고, 추천이 완료된 아티클 정보를 Django Channels의 group 메세지를 통해 두 사용자에게 동시에 전송한다. 이후 두 사용자에게 전송한 아티클 기반으로 생성된 동일한 퀴즈 3개를 제공하여 제한 시간 내에 더 높은 점수를 획득한 사용자가 이기는 게임 형식의 기능이다.<br><img src="https://github.com/dear-yy/CapstoneDesignProject/blob/main/image/battle_match_code.png" width="80%"><br><br>- 사용 기술: Django-channels, Redis<br><br>|
| (5) 기타 | *기타 사항을 기술*  |

<br>

