import json
from opencc import OpenCC

# 讀取 JSON 檔案
file_path = "./../json/southamerica.json"  # 替換為你的檔案路徑
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# 初始化簡繁轉換器（簡體轉繁體）
cc = OpenCC("s2t")

# 過濾 translations 只保留 zho 和 jpn，並轉換簡體為繁體
for item in data:
    if "translations" in item:
        translations = item["translations"]
        filtered_translations = {}

        # 保留日文 (jpn)
        if "jpn" in translations:
            filtered_translations["jpn"] = translations["jpn"]

        # 保留中文 (zho) 並轉換簡體為繁體
        if "zho" in translations:
            filtered_translations["zho"] = {
                "official": cc.convert(translations["zho"]["official"]),
                "common": cc.convert(translations["zho"]["common"])
            }

        # 更新 translations 欄位
        item["translations"] = filtered_translations

# 儲存處理後的 JSON
output_path = "southamerica.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"處理完成！已儲存至 {output_path}")
