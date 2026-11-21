# 割り勘の入力検証（2026-11-16）
## 対象
main f7df47216ecbb34276f4bea44c6525440dd2e5ac / calculator blob d0c6550a130e5a7d59ce2dcdcbb1bffba22dcaf7。
公開画面で1000円・1.9人が1人1000円として計算・コピーされること、小数会計1000.9円が1000円になること、固定額-100円が0円になることを再現。
## 修正
人数・会計・固定額を丸めたり0へ置換せず検証。不正時は既存のエラー表示と文章消去を使う。比率の非有限値も拒否。
## 実行済み
node tests/warikan-validation.cjs: 計算16検査と全スクリプト構文検査合格。
独立担当の追加VM検査: 小数会計・小数人数・負固定額の保存復元3件合格。
## 未完・限界
候補実ブラウザ試験はChromium起動のsocket権限制限で未実行。旧公開画面の再現は候補合格ではない。
独立担当は同一モデル。AGENTSの別AI（Claude）による最終検品は未完。完成へ移さずdraftとする。
既存の極端な有限比率では中間演算がoverflow/underflowする（人数2・比率1e308で徴収0、比率5e-324でInfinity）。今回の対象外で、全面的数値安全性を主張しない。
## 重複・費用
TODO作業中なし、既存open PR #1はTODO企画のみ。既存チェック係の実行状態は未確認、所有権を奪わず別branchのレビュー用差分。
publicをAPIで確認。main全treeに.github/workflowsなし。既存run 43778228759はmainのdynamic Pages、3jobともubuntu-latest。branchとdraft PRだけ作成しmain・Pages・設定を変更しない。新しいworkflow、外部API、artifact/cache uploadは追加しない。
標準runnerの公開repo利用は無料（larger runnerは有料）: https://docs.github.com/en/billing/concepts/product-billing/github-actions
今回のbranch/PRからActionsストレージ増加を起こすworkflowは確認されない。アカウント全体の請求状態を無料とは断定しない。
## 次
別AIの検品と候補ブラウザ検査を行う。マージ・公開は実施しない。
