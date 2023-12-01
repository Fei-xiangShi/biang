import os
import json
import re

pattern1 = r'\s+\$t\("([^"]+)"\)'
pattern2 = r'"t\(\'([^\']+)\'\)'
pattern3 = r'\s+t\("([^"]+)"\)'
pattern4 = r'\s+t\(`([^`]+)`\)'

pattern_unspecified = r'\s+t\((.*)\)'


def find_and_extract_text(root_dir, output_file, unspecified_file):
    result = {}
    unspecified_result = {}
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.vue'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = re.findall(pattern1, content)
                    matches += re.findall(pattern2, content)
                    matches += re.findall(pattern3, content)
                    matches += re.findall(pattern4, content)
                    for match in matches:
                        result[match] = match
                    matches = re.findall(pattern_unspecified, content)
                    for match in matches:
                        unspecified_result[match] = match
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    with open(unspecified_file, 'w', encoding='utf-8') as f:
        json.dump(unspecified_result, f, indent=2, ensure_ascii=False)


root_dir = '../'
output_file = '../locales/gen.json'
unspecified_file = '../locales/unspecified.json'

find_and_extract_text(root_dir, output_file, unspecified_file)
