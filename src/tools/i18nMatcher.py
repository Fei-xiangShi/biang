import json

def merge_json_files(new_file, old_file, merge_file):
    with open(new_file, 'r', encoding='utf-8') as f:
        new_data = json.load(f)
    
    with open(old_file, 'r', encoding='utf-8') as f:
        old_data = json.load(f)
    merge_data = {}
    for key, value in new_data.items():
        part_key = key.split('.')[1]
        if part_key in old_data:
            merge_data[key] = old_data[part_key]
        else:
            merge_data[key] = value
    
    with open(merge_file, 'w', encoding='utf-8') as f:
        json.dump(merge_data, f, ensure_ascii=False, indent=2)

old_file = '../locales/zh-Hans.json'
new_file = '../locales/gen.json'
merge_file = '../locales/merge-Hans.json'

merge_json_files(new_file, old_file, merge_file)
