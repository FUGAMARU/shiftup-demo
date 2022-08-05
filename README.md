﻿# ShiftUP!

### サービス名について
| 物理名 | 論理名 |
| ---- | ---- |
| shiftup | ShiftUP!|

### エンドユーザー一覧
| 名称 | 役割 |
| ---- | ----| 
| キャスト | 実際にオープンキャンパスの業務を遂行する学生 |
| 運営チーム | 新しいキャストの募集、各種連絡、シフトを組んだりと<br>オープンキャンパス業務の運営管理を行う |

### 現状のオープンキャンパスバイト出勤までのフロー
1. 運営チームが任意のタイミングで、向こう1ヶ月分のオープンキャンパス開催日程を提示する
2. キャストはそれぞれの開催日程に対して、出勤できるのかできないのかをアンケートで回答する
3. 運営チームが`2`の回答結果を元に、1日分の出勤者リストを作り、これをオープンキャンパス当日の1週間以内にキャストに送信する
4. キャストは`3`で送られてきたリストに自分が入っているか確認し、入っていればDiscordにて`◯◯ ◯◯ □月□日 確定`のように名前と日付を送信して自分の出勤を確定させる。
5. 運営チームはオープンキャンパス当日の朝に、役割ごと(受付、誘導など)のスケジュール表を作り、配布する。

### 実装したい機能
- シフト希望日程アンケート作成 / 回答(`1`と`2`に該当)
- シフト希望日程ごとの、出勤可能者のリストアップ
- `3`の出勤者リストに自分が含まれていればメール通知
- `3`の出勤者リストに自分が含まれていた場合の、出勤確定処理(通知)ボタン(`4`に該当)
- 出勤確定した人のリストアップ
- キャスト用のマイページがあり、PDFファイルを開くことなくそこから自分の1日のスケジュールが確認できる
- Discord APIにて自動でキャストを該当する役職のチャンネルに参加させる
- 運営チームが許可したGoogleアカウントのみサービスを利用できるようにする

### あったら良いかもしれない機能
- 月あたりの合計出勤回数
- 給与確認
  - 棒グラフなどでグラフィカルだと尚良し 

### 作る必要のあるページ
- 共通
  - アカウント登録 / ログイン
    - といっても実際はGoogleのOAuthを使うだけ
- キャストサイド
  - マイページ
    - 希望日程アンケート一覧
    - 出勤確定待ち一覧
    - その日のスケジュール確認
    - Optional
      - 月出勤回数
      - 給与計算
  - [希望日程回答](https://shiftup.vercel.app/answer-survey)
  -  [出勤確定](https://shiftup.vercel.app/confirm-attendance)
- 運営チームサイド
  - スケジュールテンプレート作成
  - キャスト情報登録 
  - [希望日程アンケート作成](https://shiftup.vercel.app/management/create-survey)
  - [アンケート集計・出勤可能者リストアップ・確定処理要求送信](https://shiftup.vercel.app/management/tally-survey)
  - 出勤確定者アサイン

### 開発メモ

#### 属性記述の優先順位目安(気づいたら修正)

1. クラス名
1. サイジング
1. スペーシング
1. 文字に関するもの
1. 表示に関するもの
1. ホバーなどその他表示に関するもの
1. イベントハンドラー(e.g. onClick())