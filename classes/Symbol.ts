// Types
import { Symbols, OptionalSymbols } from "types/Symbols"

// Functions
import { toFlattenObject } from "ts/functions"

class Symbol {
  private static symbols: Symbols = {
    "東京工科大学": {
      "BT": "応用生物学部",
      "CS": "コンピュータサイエンス学部",
      "MS": "メディア学部",
      "ES": "工学部",
      "DS": "デザイン学部",
      "HS": "医療保健学部"
    },
    "クリエイターズカレッジ": {
      "B2": "放送芸術科",
      "T2": "声優・演劇科",
      "LA": "マンガ・アニメーション科四年制",
      "AN": "マンガ・アニメーション科"
    },
    "デザインカレッジ": {
      "L4": "ゲームクリエイター科四年制",
      "GM": "ゲームクリエイター科",
      "CG": "CG映像科",
      "G2": "デザイン科"
    },
    "ミュージックカレッジ": {
      "R2": "ミュージックアーティスト科",
      "F2": "コンサート・イベント科",
      "M2": "音響芸術科"
    },
    "ITカレッジ": {
      "IS": "ITスペシャリスト科",
      "AI": "AIシステム科",
      "C2": "情報処理科",
      "PN": "ネットワークセキュリティ科",
      "L2": "情報ビジネス科"
    },
    "テクノロジーカレッジ": {
      "AR": "ロボット科",
      "E2": "電子・電気科",
      "EV": "一級自動車整備科",
      "RV": "自動車整備科",
      "BN": "応用生物学科",
      "X4": "建築科",
      "X2": "建築設計科",
      "YZ": "土木・造園科",
      "DC": "機械設計科"
    },
    "スポーツ・医療カレッジ": {
      "N3": "スポーツトレーナー科三年制",
      "NA": "スポーツトレーナー科",
      "NE": "スポーツ健康学科三年制",
      "N2": "スポーツ健康学科",
      "S3": "鍼灸科",
      "J3": "柔道整復科",
      "MI": "医療事務科"
    }
  }

  public static get allSymbols() {
    return this.symbols
  }

  public static get neecSymbols() {
    let obj = Object.assign({}, this.symbols) as OptionalSymbols
    delete obj["東京工科大学"]
    return obj
  }

  public static get tutSymbols() {
    return this.symbols["東京工科大学"]
  }

  public static toStringSymbol(symbol: string) {
    const flatObj = toFlattenObject(this.symbols)
    return flatObj[symbol]
  }
}

export default Symbol