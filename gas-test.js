function keepMyGakujoAlive() {
  //urlはこれじゃなくても機能する
  const url = "https://gakujo.shizuoka.ac.jp/lcu-web/SC_01002B00_00/scheduleInformation";
  
  // 取得したCookieをセット
  const myCookie = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const options = {
    "method": "get",
    "headers": {
      "Cookie": myCookie,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
    },
    "followRedirects": false
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();
    const content = response.getContentText();
    if (code === 200) {
      const json = JSON.parse(content);
      if (Array.isArray(json) && json.length === 0) {
        console.warn("Warning: レスポンスが空配列 [] です。セッションが切れているか、データが存在しません。 (" + new Date().toLocaleString('ja-JP') + ")");
      } else {
        console.log("Response JSON:", JSON.stringify(json, null, 2));
        console.log("Success: セッションを延長しました。 (" + new Date().toLocaleString('ja-JP') + ")");
      }
    } else if (code === 302) {
      console.warn("Warning: ログアウトされた可能性があります。Cookieを更新してください。");
    } else {
      console.error("Error: ステータスコード " + code);
    }
  } catch (e) {
    console.error("Critical Error: リクエストに失敗しました。\n" + e);
  }
}
