# 크롤링 함수
import requests
from bs4 import BeautifulSoup

def get_article_body(url:str, domain:str) -> str:
    # 본문 추출을 위한 사이트별 태그 정보#
    SITE_CLASS_MAPPING = {
        "bbc.com": [{"tag": "main", "class": "bbc-fa0wmp"}],
        "khan.co.kr": [{"tag": "div", "class": "art_body"}],
        "hani.co.kr": [{"tag": "div", "class": "article-text"}],
        "ytn.co.kr": [{"tag": "div", "class": "vodtext"}],
        "sisain.co.kr": [{"tag": "div", "class": "article-body"}],
        "news.sbs.co.kr": [{"tag": "div", "class": "main_text"}],
        "h21.hani.co.kr": [{"tag": "div", "class": "arti-txt"}],
        "ohmynews.com": [
            {"tag": "article", "class": "article_body at_contents article_view"},
            {"tag": "div", "class": "news_body"},
        ],
    }

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"}

    try:
        # URL에서 HTML (요청)가져오기
        response = requests.get(url, headers=headers)
        response.raise_for_status() # 오류 발생하면, 예외 발생
        soup = BeautifulSoup(response.text, "html.parser")

        # 도메인이 제공된 경우 SITE_CLASS_MAPPING에서 처리
        site_info = SITE_CLASS_MAPPING.get(domain)
        if not site_info: # 해당 도메인에 대한 정보가 없는 경우
            return None

        # 모든 매핑 리스트 순회하며 태그/클래스 처리
        for mapping in site_info:
            tag_name = mapping.get("tag")
            class_name = mapping.get("class")
            main_body = soup.find(tag_name, class_=class_name)
            if main_body:
                # 태그 내부에 p, h1 등이 있는 경우와 없는 경우 처리
                text_elements = main_body.find_all(["h1", "h2", "h3", "h4", "p", "li"])
                # <p> 태그 개수 확인 (2개 이하이면 본문이 부족하다고 간주)

                paragraph_count = len(main_body.find_all("p"))
                if paragraph_count <= 2:
                    return main_body.get_text(strip=True)

                if text_elements:
                    return "\n".join(
                        [element.get_text(strip=True) for element in text_elements]
                    )
                else:
                    return main_body.get_text(strip=True)
        # 해당 도메인에 매핑된 태그와 클래스를 찾을 수 없는 경우
        return None
    except requests.exceptions.RequestException as e: # HTTP 요청 오류
        return None
    except Exception as e: # 본문 추출중 오류
        return None



# 모델 로드
from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')


# 1. (사용자 입력 키워드 VS gpt 생성 아티클 검색 키워드)검증 함수 
def compute_similarities(user_input, keywords, label=""):
    emb_input = model.encode(user_input, convert_to_tensor=True)
    similarities = []

    print(f"\n🔹 유사도 비교: {label}")
    for kw in keywords:
        emb_kw = model.encode(kw, convert_to_tensor=True)
        sim = util.cos_sim(emb_input, emb_kw).item()
        similarities.append(sim)
        print(f"Input: '{user_input}' vs Keyword: '{kw}' => Similarity: {sim:.3f}")

    avg_sim = sum(similarities) / len(similarities)
    max_sim = max(similarities)

    print(f"📊 Average similarity for '{label}': {avg_sim:.3f}")
    print(f"🔥 Max similarity for '{label}': {max_sim:.3f}")

    return avg_sim, max_sim




# 2. (아티클 추천 정확도)검증 함수
def compare_keyword_to_article(keywords: list, article_title: str, article_body: str, label: str = "") -> tuple:
    # 키워드 리스트 → 하나의 텍스트로 결합
    keyword_text = " ".join(keywords)

    # 임베딩
    emb_keyword = model.encode(keyword_text, convert_to_tensor=True)
    emb_title = model.encode(article_title, convert_to_tensor=True)
    emb_body = model.encode(article_body, convert_to_tensor=True)

    # 유사도 계산
    sim_title = util.cos_sim(emb_keyword, emb_title).item() # 키워드 & 제목
    sim_body = util.cos_sim(emb_keyword, emb_body).item()   # 키워드 & 아티클

    # 출력
    print(f"\n🔍 유사도 비교 - {label}")
    print(f"Title similarity: {sim_title:.3f}")
    print(f"Body similarity: {sim_body:.3f}")

    return sim_title, sim_body



# 데이터 로드 (코랩 기준)
from google.colab import drive
import pandas as pd

drive.mount('/content/drive')
file_path = "/content/drive/MyDrive/Colab Notebooks/capstone_test_data.xlsx"

input_df = pd.read_excel(file_path)
print(input_df.head())


# 검증 데이터 파일 생성

results = []  # 결과 저장 리스트

for idx, row in input_df.iterrows():
    user_input1 = row['user_input1']
    user_input2 = row['user_input2']
    keyword1 = row['keyword1'].split(',')  # 문자열 → 리스트
    keyword2 = row['keyword2'].split(',')
    url = row['URL']
    domain = row['Domain']
    title = row['title']
    speed = row['speed']

    # 본문 가져오기
    body = get_article_body(url, domain)

    # 1. 유저 입력 vs GPT 키워드 유사도
    avg1, max1 = compute_similarities(user_input1, keyword1)
    combined_input = user_input1 + " " + user_input2
    avg2, max2 = compute_similarities(combined_input, keyword2)

    # 2. 키워드 vs 아티클(title/body)
    title_score, body_score = compare_keyword_to_article(keyword1, title, body)

    # 3. 결과 저장
    results.append({
        "max1": max1,
        "avg1": avg1,
        "max2": max2,
        "avg2": avg2,
        "title_score": title_score,
        "body_score": body_score,
        "speed": speed
    })


results_df = pd.DataFrame(results)
results_df.to_excel("검증_결과_리포트.xlsx", index=False) # ✅ 결과 DataFrame → 엑셀 저장


from google.colab import files
files.download("검증_결과_리포트.xlsx")

print("✅ 검증 완료: '검증_결과_리포트.xlsx'로 저장되었습니다.")
