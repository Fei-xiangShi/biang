#!/bin/bash

# 指定目录，可以根据需要修改
DIRECTORY="./"

# 遍历目录下的所有.vue文件
find "$DIRECTORY" -name "*.vue" | while read -r file
do
    # 使用awk进行文件处理
    awk '
    # 找到</template>前的</view>标签的行
    /<\/view>\s*<\/template>/ {
        print "</scroll-view>"  # 先添加新的一行
        print $0  # 打印当前行
        next  # 跳过下一步的打印操作
    }
    # 找到<navbar开头的行
    /<navbar/ {
        print $0  # 打印当前行
        # 添加新的<scroll-view>标签
        print "<scroll-view\n      :scroll-y=\"true\"\n      :scroll-with-animation=\"true\"\n      style=\"height: 100%\"\n    >"
        next  # 跳过下一步的打印操作
    }
    { print $0 }  # 打印其他所有行
    ' "$file" > temp_file && mv temp_file "$file"  # 处理文件并保存更改
done

echo "处理完成"
