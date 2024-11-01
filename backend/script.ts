import axios from "axios";

(async () => {
  try {
    const resp = await getInshotNews();
    console.log(resp);
  } catch (error) {
    console.error(error);
  }
})();

async function getInshotNews(minNewsId?: string): Promise<Array<any>> {
  const response = await axios.get("https://inshorts.com/api/en/news", {
    params: {
      category: "top_stories",
      include_card_data: true,
      max_limit: 10,
      minNewsId: minNewsId,
    },
  });
  const data = response.data.data;
  minNewsId = data["min_news_id"]; // ! TODO: implement time check , only fetch last 1 hour news.

  const newsList: Array<any> = data["news_list"];
  return newsList.map((obj: any) => ({
    content: obj["news_obj"]["content"],
    sourceUrl: obj["news_obj"]["source_url"],
    title: obj["news_obj"]["title"],
    createdAt: obj["news_obj"]["created_at"],
  }));
}
