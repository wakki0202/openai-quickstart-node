import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [wordsInput, setWordsInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ words: wordsInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setWordsInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Word Rearrange Genius -並び替え問題専用アプリ-</title>
      </Head>

      <main className={styles.main}>
        <h3>Word Rearrange Genius</h3>
        <p>
          空白区切りで英単語を複数入力すると日本語訳付きで適切な順番に並び替えてくれるよ！（単語が足りない場合は補ってくれます）
        </p>
        <p>
          例）I two have dogs ⇨ I have two dogs. (私は2匹の犬を飼っています。)
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="words"
            placeholder="空白区切りで単語を入力"
            value={wordsInput}
            onChange={(e) => setWordsInput(e.target.value)}
            pattern="^[0-9a-zA-Z\s]+$"
            required
          />
          <input type="submit" value="並び替える" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
