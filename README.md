# Markdown to Multi-Format Converter

一个将Markdown格式转换为多种格式的小工具，支持 HTML、Word、Excel、PPT、PDF、图片等多种输出格式。

## 功能特点

- 📝 **完整Markdown支持**：支持标题、列表、图片、代码块、表格、引用等所有常用Markdown语法
- 🎨 **精美样式**：提供多种主题样式可供选择
  - 标题：不同层级的字体大小和样式
  - 图片：居中显示、响应式宽度
  - 代码块：美观的背景色和边框样式，支持行号显示
  - 表格：清晰的边框和单元格样式
  - 引用：左侧绿色边框和背景色
  - 列表：合理的缩进和行高
- 🎨 **多主题支持**：提供 default、simple、modern、dark 四种样式主题，可通过命令行参数选择
- � **多格式输出**：支持转换为 HTML、Word、Excel、PPT、PDF、图片等多种格式
- �️ **命令行接口**：简单易用的命令行参数
- 🚀 **快速转换**：一键将Markdown转换为多种格式
- 📋 **批处理脚本支持**：提供build.bat和convert.bat脚本，简化安装和转换流程
- 📦 **独立可执行文件**：支持打包为独立的 exe 文件，无需安装 Node.js 即可运行

## 支持的输出格式

| 格式 | 文件扩展名 | 说明 |
|------|------------|------|
| **HTML** | .html | 网页格式，可直接在浏览器中打开 |
| **Word** | .docx | Microsoft Word 文档格式 |
| **Excel** | .xlsx | Microsoft Excel 表格格式 |
| **PPT** | .pptx | PowerPoint 演示文稿格式 |
| **PDF** | .pdf | 便携式文档格式 |
| **图片** | .png | PNG 图片格式 |

## 安装步骤

### 1. 环境准备

确保您的电脑已安装Node.js（版本14或更高）：

```bash
node --version
```

如果未安装Node.js，可以从[官网](https://nodejs.org/)下载并安装。

### 2. 安装依赖

进入项目目录，执行以下命令安装依赖：

```bash
npm install
```

## 使用方法

### 基本使用

```bash
npm run convert -- <input.md>
```

示例：
```bash
npm run convert -- article.md
```

这将从 `input/` 文件夹读取 `article.md`，并在 `output/` 文件夹中生成一个名为 `article.html` 的文件（默认使用 `default` 样式）。

> **注意**：使用 npm run convert 时，需要在命令中使用 `--` 分隔符，这样后面的参数才会正确传递给 node 脚本。

### 指定输出文件

```bash
npm run convert -- <input.md> <output.html>
```

示例：
```bash
npm run convert -- article.md output.html
```

这将从 `input/` 文件夹读取 `article.md`，并在 `output/` 文件夹中生成一个名为 `output.html` 的文件（默认使用 `default` 样式）。

### 选择样式主题

使用 `--style` 或 `-s` 参数选择不同的样式主题：

```bash
npm run convert -- <input.md> [output.html] --style <style-name>
# 或简写
npm run convert -- <input.md> [output.html] -s <style-name>
```

示例：
```bash
# 使用 modern 样式
npm run convert -- article.md --style modern

# 使用 dark 样式并指定输出文件
npm run convert -- article.md output.html -s dark
```

#### 可用的样式主题

- **default**：默认样式，适合大多数场景
- **simple**：简约样式，简洁清晰
- **modern**：现代样式，带有阴影和圆角效果
- **dark**：深色样式，适合代码阅读场景

### 查看帮助信息

使用 `--help` 或 `-h` 参数查看详细的使用说明：

```bash
npm run convert -- --help
# 或简写
npm run convert -- -h
```

### 选择输出格式

使用 `--format` 或 `-f` 参数选择不同的输出格式：

```bash
npm run convert -- <input.md> [output.html] --format <format-name>
# 或简写
npm run convert -- <input.md> [output.html] -f <format-name>
```

#### 可用的输出格式

- **html**：HTML 网页格式（默认）
- **word**：Word 文档格式 (.docx)
- **excel**：Excel 表格格式 (.xlsx)
- **ppt**：PowerPoint 演示文稿格式 (.pptx)
- **pdf**：PDF 文档格式 (.pdf)
- **image**：PNG 图片格式 (.png)

#### 格式使用示例

```bash
# 转换为 HTML（默认）
npm run convert -- article.md

# 转换为 Word
npm run convert -- article.md --format word

# 转换为 Excel
npm run convert -- article.md -f excel

# 转换为 PPT
npm run convert -- article.md --format ppt

# 转换为 PDF
npm run convert -- article.md -f pdf

# 转换为图片
npm run convert -- article.md --format image

# 组合使用：指定输出文件和格式
npm run convert -- article.md output.docx -f word

# 组合使用：指定格式和样式
npm run convert -- article.md --format pdf --style modern

# 完整示例：所有参数
npm run convert -- article.md output.pdf -f pdf -s dark
```

#### 格式说明

| 格式 | 适用场景 | 特点 |
|------|----------|------|
| **HTML** | 网页发布、博客文章 | 可直接在浏览器中打开，支持样式主题 |
| **Word** | 文档编辑、打印 | 兼容 Microsoft Word，适合文档编辑 |
| **Excel** | 数据表格、报表 | 适合表格型数据，便于数据处理 |
| **PPT** | 演示文稿、培训 | 每个元素独立一页，适合演示 |
| **PDF** | 文档分享、打印 | 通用格式，保持格式一致 |
| **图片** | 社交媒体、预览 | 便于分享和预览，支持样式主题 |

### 直接使用node命令

如果您下载了独立的node.exe文件，可以直接使用：

```bash
node index.js sample.md
```

这将从 `input/` 文件夹读取 `sample.md`，并在 `output/` 文件夹中生成一个名为 `sample.html` 的文件（默认使用 `default` 样式）。

使用样式主题：

```bash
node index.js sample.md --style modern
node index.js sample.md -s dark
```

也可以指定完整路径并选择样式：

```bash
node index.js C:\path\to\article.md C:\path\to\output.html --style modern
```

### 使用批处理脚本（Windows系统）

#### 1. 构建与测试脚本 (build.bat)

双击运行 `build.bat` 或在命令行执行：

```bash
.\build.bat
```

该脚本会：
- 检查node.exe是否存在
- 自动安装依赖（如果未安装）
- 测试转换功能
- 显示使用说明

#### 2. 快速转换脚本 (convert.bat)

直接在命令行执行：

```bash
.\convert.bat <input.md> [output.html] [--style <style-name>|-s <style-name>]
```

示例：
```bash
.\convert.bat article.md
.\convert.bat article.md output.html
.\convert.bat article.md --style modern
.\convert.bat article.md output.html -s dark
```

该脚本会：
- 检查node.exe是否存在
- 验证输入文件（默认从 `input/` 文件夹读取）
- 执行转换（支持选择不同样式主题）
- 在 `output/` 文件夹中生成输出文件
- 提供后续操作指引

可用的样式主题：
- **default**：默认样式，适合大多数场景
- **simple**：简约样式，简洁清晰
- **modern**：现代样式，带有阴影和圆角效果
- **dark**：深色样式，适合代码阅读场景

#### 3. 快速运行脚本 (run.bat)

直接双击运行 `run.bat` 或在命令行执行：

```bash
.\run.bat
```

该脚本会使用 npm 命令快速转换 README.md 文件，使用 simple 样式生成 `README_simple.html`。您可以根据需要修改 run.bat 文件中的参数。

### 4. 打包为独立可执行文件

如果您需要将项目打包为独立的 exe 文件（无需安装 Node.js 即可运行），可以使用以下命令：

#### 安装打包工具

首先全局安装 pkg 工具：

```bash
npm install -g pkg
```

#### 打包 exe 文件

在项目目录下执行：

```bash
npm run build
```

打包完成后，会在 `dist/` 文件夹中生成 `markdownConverter.exe` 文件。

#### 使用 exe 文件

exe 文件的使用方法与 npm 命令类似：

```bash
# 基本使用（默认 HTML 格式）
dist\markdownConverter.exe sample.md

# 指定输出文件
dist\markdownConverter.exe sample.md output.html

# 选择样式主题
dist\markdownConverter.exe sample.md --style modern
dist\markdownConverter.exe sample.md output.html -s dark

# 选择输出格式
dist\markdownConverter.exe sample.md --format word
dist\markdownConverter.exe sample.md -f pdf

# 组合使用：指定格式和样式
dist\markdownConverter.exe sample.md --format pdf --style modern
dist\markdownConverter.exe sample.md output.docx -f word -s dark

# 查看帮助
dist\markdownConverter.exe --help
```

**注意事项**：
- exe 文件无需安装 Node.js 即可运行
- 输入文件默认从当前目录的 `input` 文件夹读取
- 输出文件默认保存到当前目录的 `output` 文件夹
- 支持所有样式主题：default、simple、modern、dark
- 支持所有输出格式：html、word、excel、ppt、pdf、image

详细的 exe 使用说明请参考 [dist/使用说明.md](dist/使用说明.md)。

## 支持的Markdown语法

### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 文本格式
```markdown
**粗体**
*斜体*
***粗斜体***
`内联代码`
```

### 列表
```markdown
- 无序列表项1
- 无序列表项2
  - 子列表项

1. 有序列表项1
2. 有序列表项2
```

### 图片
```markdown
![图片描述](https://example.com/image.jpg)
```

### 代码块
```markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```
```python
def hello():
    print("Hello, World!")
```
```

### 表格
```markdown
| 姓名 | 年龄 | 城市 |
|------|------|------|
| 张三 | 25   | 北京 |
| 李四 | 30   | 上海 |
```

### 引用
```markdown
> 这是一个引用示例
> 支持的引用样式
```

### 链接
```markdown
[GitHub](https://github.com)
```

### 分隔线
```markdown
---
```

### 任务列表
```markdown
- [x] 已完成任务
- [ ] 未完成任务
```

## 示例

项目中包含了一个 `input/sample.md` 示例文件，您可以使用以下命令测试：

### 转换为 HTML（默认）

```bash
npm run convert -- sample.md
```

转换后的文件将生成在 `output/` 文件夹中，名称为 `sample.html`。

### 转换为不同格式

```bash
# 转换为 Word
npm run convert -- sample.md --format word

# 转换为 Excel
npm run convert -- sample.md -f excel

# 转换为 PPT
npm run convert -- sample.md --format ppt

# 转换为 PDF
npm run convert -- sample.md --format pdf

# 转换为图片
npm run convert -- sample.md -f image
```

### 使用不同样式主题进行测试

```bash
# 使用 simple 样式
npm run convert -- sample.md --style simple

# 使用 modern 样式
npm run convert -- sample.md --style modern

# 使用 dark 样式
npm run convert -- sample.md --style dark
```

### 组合使用示例

```bash
# 指定输出文件和格式
npm run convert -- sample.md output.docx -f word

# 指定格式和样式
npm run convert -- sample.md --format pdf --style modern

# 完整示例：所有参数
npm run convert -- sample.md output.pdf -f pdf -s dark
```

## 转换后使用

1. 用浏览器打开转换后的HTML文件
2. 复制页面中的所有内容
3. 粘贴到您的网站或博客编辑器中
4. 稍作调整即可发布

## 注意事项

- 代码块目前不支持语法高亮
- 图片需要使用网络图片链接，本地图片请先上传到图床
- 建议使用简洁清晰的Markdown语法，避免过度复杂的嵌套

## 项目结构

```
markdown-to-html/
├── index.js          # 主程序文件
├── package.json      # 项目配置文件
├── README.md         # 项目说明文档
├── build.bat         # 构建与测试脚本（Windows）
├── convert.bat       # 快速转换脚本（Windows）
├── run.bat           # 快速运行脚本（Windows）
├── dist/             # 打包输出目录
│   ├── markdownConverter.exe  # 独立可执行文件
│   └── 使用说明.md   # exe 使用说明文档
├── input/            # 输入文件目录
│   └── sample.md     # 示例输入文件
└── output/           # 输出文件目录
    └── sample.docx # 转换后的示例文件
```

## 许可证

本项目采用 MIT 许可证开源。

### 许可证文本

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 权利与义务

根据 MIT 许可证，您可以：

- ✅ **商业使用** - 您可以将此软件用于商业目的
- ✅ **修改** - 您可以修改此软件
- ✅ **分发** - 您可以分发此软件
- ✅ **私人使用** - 您可以私下使用此软件
- ✅ **再许可** - 您可以根据此许可证再许可此软件

您需要：

- ⚠️ **包含版权声明** - 在所有副本或实质部分中包含版权声明
- ⚠️ **包含许可证** - 在所有副本或实质部分中包含此许可证

### 免责声明

本软件按"原样"提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人都不对任何索赔、损害或其他责任负责，无论是合同、侵权或其他形式的诉讼，由软件或软件的使用或其他交易引起。

### 完整许可证

完整的许可证文本请参见项目根目录下的 [LICENSE](LICENSE) 文件。

## 第三方依赖许可证

本项目使用了以下开源库，感谢这些优秀的项目：

| 库名称 | 许可证 | 用途 |
|---------|---------|------|
| **marked** | MIT License | Markdown 解析和渲染 |
| **docx** | MIT License | 生成 Word 文档 |
| **exceljs** | MIT License | 生成 Excel 表格 |
| **pptxgenjs** | MIT License | 生成 PowerPoint 演示文稿 |
| **puppeteer** | Apache License 2.0 | 生成 PDF 和图片 |
| **sharp** | Apache License 2.0 | 图片处理（已移除） |

### Node.js 运行时

项目目录中包含的 `node.exe` 是 Node.js 的官方可执行文件，由 OpenJS Foundation 维护，采用 **MIT License**。

**重要说明：**
- `node.exe` 是 Node.js 官方产品，不是本项目的一部分
- 用户需要自行下载并放置在项目目录中
- Node.js 官方网站：https://nodejs.org/
- Node.js 许可证：https://github.com/nodejs/node/blob/main/LICENSE

### 许可证兼容性

本项目采用 MIT 许可证，与所有使用的第三方依赖许可证兼容：
- ✅ MIT License - 完全兼容
- ✅ Apache License 2.0 - 完全兼容，允许在 MIT 项目中使用

所有依赖都可以在商业和非商业项目中自由使用、修改和分发。