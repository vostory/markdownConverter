const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, ImageRun } = require('docx');
const ExcelJS = require('exceljs');
const PptxGenJS = require('pptxgenjs');
const puppeteer = require('puppeteer');

// 微信公众号样式主题配置
const styleThemes = {
  // 默认样式
  default: {
    heading: {
      h1: 'padding: 10px 0; font-size: 24px; font-weight: bold; color: #333;',
      h2: 'padding: 8px 0; font-size: 20px; font-weight: bold; color: #333; border-left: 4px solid #1aad19; padding-left: 10px;',
      h3: 'padding: 6px 0; font-size: 18px; font-weight: bold; color: #333;',
      h4: 'padding: 4px 0; font-size: 16px; font-weight: bold; color: #333;',
      h5: 'padding: 3px 0; font-size: 14px; font-weight: bold; color: #333;',
      h6: 'padding: 2px 0; font-size: 12px; font-weight: bold; color: #666;'
    },
    paragraph: 'margin: 10px 0; line-height: 1.8; font-size: 16px; color: #333;',
    image: 'margin: 10px auto; display: block; max-width: 100%; height: auto;',
    code: {
      inline: 'background-color: #f5f5f5; padding: 2px 4px; border-radius: 3px; font-family: monospace;',
      block: 'background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; margin: 15px 0; font-family: monospace; font-size: 14px; line-height: 1.6;'
    },
    table: 'border-collapse: collapse; width: 100%; margin: 15px 0;',
    tableCell: 'border: 1px solid #ddd; padding: 8px 12px;',
    blockquote: 'border-left: 4px solid #1aad19; padding: 10px 15px; margin: 15px 0; background-color: #f9f9f9; font-style: italic;',
    ul: 'margin: 10px 0; padding-left: 25px;',
    ol: 'margin: 10px 0; padding-left: 25px;',
    listItem: 'margin: 5px 0; line-height: 1.8;',
    body: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin: 0; padding: 20px; background-color: #fff;'
  },
  // 简约样式
  simple: {
    heading: {
      h1: 'padding: 5px 0; font-size: 22px; font-weight: bold; color: #000;',
      h2: 'padding: 4px 0; font-size: 20px; font-weight: bold; color: #000;',
      h3: 'padding: 3px 0; font-size: 18px; font-weight: bold; color: #000;',
      h4: 'padding: 2px 0; font-size: 16px; font-weight: bold; color: #000;',
      h5: 'padding: 1px 0; font-size: 14px; font-weight: bold; color: #000;',
      h6: 'padding: 0; font-size: 12px; font-weight: bold; color: #000;'
    },
    paragraph: 'margin: 8px 0; line-height: 1.6; font-size: 15px; color: #000;',
    image: 'margin: 8px auto; display: block; max-width: 100%; height: auto;',
    code: {
      inline: 'background-color: #f0f0f0; padding: 1px 3px; font-family: monospace;',
      block: 'background-color: #f0f0f0; padding: 12px; overflow-x: auto; margin: 12px 0; font-family: monospace; font-size: 13px; line-height: 1.5;'
    },
    table: 'border-collapse: collapse; width: 100%; margin: 12px 0;',
    tableCell: 'border: 1px solid #eee; padding: 6px 10px;',
    blockquote: 'border-left: 3px solid #ddd; padding: 8px 12px; margin: 12px 0; font-style: italic;',
    ul: 'margin: 8px 0; padding-left: 20px;',
    ol: 'margin: 8px 0; padding-left: 20px;',
    listItem: 'margin: 4px 0; line-height: 1.6;',
    body: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin: 0; padding: 15px; background-color: #fff;'
  },
  // 现代样式
  modern: {
    heading: {
      h1: 'padding: 15px 0; font-size: 28px; font-weight: bold; color: #2c3e50; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
      h2: 'padding: 12px 0; font-size: 24px; font-weight: bold; color: #34495e; border-bottom: 2px solid #667eea; padding-bottom: 8px;',
      h3: 'padding: 10px 0; font-size: 20px; font-weight: bold; color: #34495e;',
      h4: 'padding: 8px 0; font-size: 18px; font-weight: bold; color: #34495e;',
      h5: 'padding: 6px 0; font-size: 16px; font-weight: bold; color: #34495e;',
      h6: 'padding: 4px 0; font-size: 14px; font-weight: bold; color: #7f8c8d;'
    },
    paragraph: 'margin: 12px 0; line-height: 1.8; font-size: 16px; color: #2c3e50;',
    image: 'margin: 15px auto; display: block; max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);',
    code: {
      inline: 'background-color: #f8f9fa; padding: 3px 6px; border-radius: 4px; font-family: "Fira Code", monospace; color: #e74c3c;',
      block: 'background-color: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0; font-family: "Fira Code", monospace; font-size: 14px; line-height: 1.6; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'
    },
    table: 'border-collapse: collapse; width: 100%; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);',
    tableCell: 'border: 1px solid #e1e8ed; padding: 12px 16px; background-color: #fff;',
    blockquote: 'border-left: 4px solid #667eea; padding: 15px 20px; margin: 20px 0; background-color: #f8f9fa; border-radius: 0 8px 8px 0; font-style: italic; color: #5a6c7d;',
    ul: 'margin: 12px 0; padding-left: 30px;',
    ol: 'margin: 12px 0; padding-left: 30px;',
    listItem: 'margin: 6px 0; line-height: 1.8;',
    body: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin: 0; padding: 30px; background-color: #f8f9fa;'
  },
  // 深色样式
  dark: {
    heading: {
      h1: 'padding: 10px 0; font-size: 24px; font-weight: bold; color: #e0e0e0;',
      h2: 'padding: 8px 0; font-size: 20px; font-weight: bold; color: #e0e0e0; border-left: 4px solid #61dafb; padding-left: 10px;',
      h3: 'padding: 6px 0; font-size: 18px; font-weight: bold; color: #e0e0e0;',
      h4: 'padding: 4px 0; font-size: 16px; font-weight: bold; color: #e0e0e0;',
      h5: 'padding: 3px 0; font-size: 14px; font-weight: bold; color: #e0e0e0;',
      h6: 'padding: 2px 0; font-size: 12px; font-weight: bold; color: #9e9e9e;'
    },
    paragraph: 'margin: 10px 0; line-height: 1.8; font-size: 16px; color: #e0e0e0;',
    image: 'margin: 10px auto; display: block; max-width: 100%; height: auto;',
    code: {
      inline: 'background-color: #3e3e3e; padding: 2px 4px; border-radius: 3px; font-family: monospace; color: #61dafb;',
      block: 'background-color: #282c34; color: #abb2bf; padding: 15px; border-radius: 5px; overflow-x: auto; margin: 15px 0; font-family: monospace; font-size: 14px; line-height: 1.6;'
    },
    table: 'border-collapse: collapse; width: 100%; margin: 15px 0;',
    tableCell: 'border: 1px solid #424242; padding: 8px 12px;',
    blockquote: 'border-left: 4px solid #61dafb; padding: 10px 15px; margin: 15px 0; background-color: #3e3e3e; font-style: italic;',
    ul: 'margin: 10px 0; padding-left: 25px;',
    ol: 'margin: 10px 0; padding-left: 25px;',
    listItem: 'margin: 5px 0; line-height: 1.8;',
    body: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin: 0; padding: 20px; background-color: #1e1e1e;'
  }
};

// 创建自定义渲染器
function createRenderer(styles) {
  const renderer = new marked.Renderer();
  
  // 自定义标题渲染
  renderer.heading = function(text, level) {
    const headingStyles = {
      1: styles.heading.h1,
      2: styles.heading.h2,
      3: styles.heading.h3,
      4: styles.heading.h4,
      5: styles.heading.h5,
      6: styles.heading.h6
    };
    return `<h${level} style="${headingStyles[level]}">${text}</h${level}>`;
  };
  
  // 自定义段落渲染
  renderer.paragraph = function(text) {
    return `<p style="${styles.paragraph}">${text}</p>`;
  };
  
  // 自定义图片渲染
  renderer.image = function(href, title, text) {
    return `<img src="${href}" alt="${text || ''}" title="${title || ''}" style="${styles.image}" />`;
  };
  
  // 自定义代码块渲染
  renderer.code = function(code, language) {
    return `<pre style="${styles.code.block}"><code>${code}</code></pre>`;
  };
  
  // 自定义行内代码渲染
  renderer.codespan = function(code) {
    return `<code style="${styles.code.inline}">${code}</code>`;
  };
  
  // 自定义表格渲染
  renderer.table = function(header, body) {
    return `<table style="${styles.table}"><thead>${header}</thead><tbody>${body}</tbody></table>`;
  };
  
  renderer.tablerow = function(content) {
    return `<tr>${content}</tr>`;
  };
  
  renderer.tablecell = function(content, flags) {
    return `<td style="${styles.tableCell}">${content}</td>`;
  };
  
  // 自定义引用渲染
  renderer.blockquote = function(quote) {
    return `<blockquote style="${styles.blockquote}">${quote}</blockquote>`;
  };
  
  // 自定义列表渲染
  renderer.list = function(body, ordered) {
    const tag = ordered ? 'ol' : 'ul';
    const style = ordered ? styles.ol : styles.ul;
    return `<${tag} style="${style}">${body}</${tag}>`;
  };
  
  renderer.listitem = function(text) {
    return `<li style="${styles.listItem}">${text}</li>`;
  };
  
  return renderer;
};

// 转换为 HTML
function convertMarkdownToHtml(inputFile, outputFile, styleName = 'default') {
  try {
    const styles = styleThemes[styleName] || styleThemes.default;
    const renderer = createRenderer(styles);
    const markdownContent = fs.readFileSync(inputFile, 'utf8');
    const htmlContent = marked(markdownContent, { renderer });
    
    const finalHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown to HTML</title>
  <style>
    body {
      ${styles.body}
    }
    * {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
    
    fs.writeFileSync(outputFile, finalHtml, 'utf8');
    console.log(`✅ 转换完成！输出文件: ${outputFile}`);
    console.log(`📋 使用样式: ${styleName}`);
    
  } catch (error) {
    console.error('❌ 转换失败:', error.message);
    process.exit(1);
  }
}

// 转换为 Word
async function convertMarkdownToWord(inputFile, outputFile) {
  try {
    const markdownContent = fs.readFileSync(inputFile, 'utf8');
    const tokens = marked.lexer(markdownContent);
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: []
      }]
    });
    
    for (const token of tokens) {
      if (token.type === 'heading') {
        const levels = [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3, 
                     HeadingLevel.HEADING_4, HeadingLevel.HEADING_5, HeadingLevel.HEADING_6];
        doc.addSection({
          children: [
            new Paragraph({
              text: token.text,
              heading: levels[token.depth - 1],
              spacing: { after: 200 }
            })
          ]
        });
      } else if (token.type === 'paragraph') {
        doc.addSection({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: token.text,
                  size: 24
                })
              ],
              spacing: { after: 200 }
            })
          ]
        });
      } else if (token.type === 'list') {
        for (const item of token.items) {
          doc.addSection({
            children: [
              new Paragraph({
                text: '• ' + item.text,
                indent: { left: 720 },
                spacing: { after: 100 }
              })
            ]
          });
        }
      }
    }
    
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputFile, buffer);
    console.log(`✅ 转换完成！输出文件: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ 转换失败:', error.message);
    process.exit(1);
  }
}

// 转换为 Excel
async function convertMarkdownToExcel(inputFile, outputFile) {
  try {
    const markdownContent = fs.readFileSync(inputFile, 'utf8');
    const tokens = marked.lexer(markdownContent);
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Markdown Content');
    
    let rowIndex = 1;
    
    for (const token of tokens) {
      if (token.type === 'heading') {
        worksheet.getCell(`A${rowIndex}`).value = token.text;
        worksheet.getCell(`A${rowIndex}`).font = { bold: true, size: 14 };
        rowIndex++;
      } else if (token.type === 'paragraph') {
        worksheet.getCell(`A${rowIndex}`).value = token.text;
        rowIndex++;
      } else if (token.type === 'list') {
        for (const item of token.items) {
          worksheet.getCell(`A${rowIndex}`).value = '• ' + item.text;
          rowIndex++;
        }
      } else if (token.type === 'table') {
        const header = token.header;
        const rows = token.rows;
        
        let colIndex = 1;
        for (const cell of header) {
          worksheet.getCell(rowIndex, colIndex).value = cell;
          worksheet.getCell(rowIndex, colIndex).font = { bold: true };
          colIndex++;
        }
        rowIndex++;
        
        for (const row of rows) {
          colIndex = 1;
          for (const cell of row) {
            worksheet.getCell(rowIndex, colIndex).value = cell;
            colIndex++;
          }
          rowIndex++;
        }
      }
    }
    
    worksheet.columns = [
      { key: 'content', width: 100 }
    ];
    
    await workbook.xlsx.writeFile(outputFile);
    console.log(`✅ 转换完成！输出文件: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ 转换失败:', error.message);
    process.exit(1);
  }
}

// 转换为 PPT
async function convertMarkdownToPpt(inputFile, outputFile) {
  try {
    const markdownContent = fs.readFileSync(inputFile, 'utf8');
    const tokens = marked.lexer(markdownContent);
    
    const pptx = new PptxGenJS();
    
    for (const token of tokens) {
      if (token.type === 'heading') {
        const slide = pptx.addSlide();
        slide.addText(token.text, {
          fontSize: 36,
          bold: true,
          color: '363636',
          align: 'center'
        });
      } else if (token.type === 'paragraph') {
        const slide = pptx.addSlide();
        slide.addText(token.text, {
          fontSize: 24,
          color: '666666',
          align: 'left'
        });
      } else if (token.type === 'list') {
        const slide = pptx.addSlide();
        for (const item of token.items) {
          slide.addText('• ' + item.text, {
            fontSize: 20,
            color: '666666',
            bullet: true
          });
        }
      }
    }
    
    await pptx.writeFile({ fileName: outputFile });
    console.log(`✅ 转换完成！输出文件: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ 转换失败:', error.message);
    process.exit(1);
  }
}

// 转换为 PDF
async function convertMarkdownToPdf(inputFile, outputFile, styleName = 'default') {
  try {
    const styles = styleThemes[styleName] || styleThemes.default;
    const renderer = createRenderer(styles);
    const markdownContent = fs.readFileSync(inputFile, 'utf8');
    const htmlContent = marked(markdownContent, { renderer });
    
    const finalHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Markdown to PDF</title>
  <style>
    body {
      ${styles.body}
      margin: 20mm;
    }
    * {
      box-sizing: border-box;
    }
    @media print {
      body { margin: 0; }
    }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.setContent(finalHtml);
    
    await page.pdf({
      path: outputFile,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    await browser.close();
    console.log(`✅ 转换完成！输出文件: ${outputFile}`);
    console.log(`📋 使用样式: ${styleName}`);
    
  } catch (error) {
    console.error('❌ 转换失败:', error.message);
    process.exit(1);
  }
}

// 转换为图片
async function convertMarkdownToImage(inputFile, outputFile, styleName = 'default') {
  try {
    const styles = styleThemes[styleName] || styleThemes.default;
    const renderer = createRenderer(styles);
    const markdownContent = fs.readFileSync(inputFile, 'utf8');
    const htmlContent = marked(markdownContent, { renderer });
    
    const finalHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Markdown to Image</title>
  <style>
    body {
      ${styles.body}
      max-width: 800px;
      margin: 0 auto;
    }
    * {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.setContent(finalHtml);
    
    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png'
    });
    
    await browser.close();
    
    fs.writeFileSync(outputFile, screenshot);
    console.log(`✅ 转换完成！输出文件: ${outputFile}`);
    console.log(`📋 使用样式: ${styleName}`);
    
  } catch (error) {
    console.error('❌ 转换失败:', error.message);
    process.exit(1);
  }
}

// 处理命令行参数
function main() {
  const args = process.argv.slice(2);
  
  let inputFile, outputFile, styleName = 'default', format = 'html';
  let currentIndex = 0;
  
  while (currentIndex < args.length) {
    const arg = args[currentIndex];
    
    if (arg === '--style' || arg === '-s') {
      if (currentIndex + 1 < args.length) {
        styleName = args[currentIndex + 1];
        if (!styleThemes[styleName]) {
          console.error(`警告: 样式 "${styleName}" 不存在，将使用默认样式`);
          styleName = 'default';
        }
        currentIndex += 2;
      } else {
        console.error('错误: --style 参数需要指定样式名称');
        printHelp();
        process.exit(1);
      }
    } else if (arg === '--format' || arg === '-f') {
      if (currentIndex + 1 < args.length) {
        format = args[currentIndex + 1].toLowerCase();
        const validFormats = ['html', 'word', 'excel', 'ppt', 'pdf', 'image'];
        if (!validFormats.includes(format)) {
          console.error(`错误: 不支持的格式 "${format}"`);
          console.error(`支持的格式: ${validFormats.join(', ')}`);
          process.exit(1);
        }
        currentIndex += 2;
      } else {
        console.error('错误: --format 参数需要指定格式');
        printHelp();
        process.exit(1);
      }
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else {
      inputFile = arg;
      currentIndex++;
      
      if (currentIndex < args.length && !args[currentIndex].startsWith('-')) {
        outputFile = args[currentIndex];
        currentIndex++;
      }
      continue;
    }
  }
  
  if (!inputFile) {
    console.error('错误: 缺少输入文件路径');
    printHelp();
    process.exit(1);
  }
  
  if (!path.isAbsolute(inputFile)) {
    let projectRoot;
    if (process.pkg) {
      projectRoot = path.join(path.dirname(process.execPath), '..');
    } else {
      projectRoot = __dirname;
    }
    inputFile = path.join(projectRoot, 'input', inputFile);
  }
  
  if (!outputFile) {
    const baseName = path.basename(inputFile, '.md');
    let projectRoot;
    if (process.pkg) {
      projectRoot = path.join(path.dirname(process.execPath), '..');
    } else {
      projectRoot = __dirname;
    }
    const extensions = {
      html: '.html',
      word: '.docx',
      excel: '.xlsx',
      ppt: '.pptx',
      pdf: '.pdf',
      image: '.png'
    };
    outputFile = path.join(projectRoot, 'output', `${baseName}${extensions[format]}`);
  } else if (!path.isAbsolute(outputFile)) {
    let projectRoot;
    if (process.pkg) {
      projectRoot = path.join(path.dirname(process.execPath), '..');
    } else {
      projectRoot = __dirname;
    }
    outputFile = path.join(projectRoot, 'output', outputFile);
  }
  
  switch (format) {
    case 'html':
      convertMarkdownToHtml(inputFile, outputFile, styleName);
      break;
    case 'word':
      convertMarkdownToWord(inputFile, outputFile);
      break;
    case 'excel':
      convertMarkdownToExcel(inputFile, outputFile);
      break;
    case 'ppt':
      convertMarkdownToPpt(inputFile, outputFile);
      break;
    case 'pdf':
      convertMarkdownToPdf(inputFile, outputFile, styleName);
      break;
    case 'image':
      convertMarkdownToImage(inputFile, outputFile, styleName);
      break;
  }
}

function printHelp() {
  console.log('用法: npm run convert <input.md> [output.html] [--format <format>] [--style <style-name>] [--help]');
  console.log('');
  console.log('参数:');
  console.log('  <input.md>           输入的 Markdown 文件');
  console.log('  [output.html]         输出文件名（可选）');
  console.log('  --format, -f <format>  输出格式（默认: html）');
  console.log('  --style, -s <style>    样式主题（默认: default）');
  console.log('  --help, -h            显示帮助信息');
  console.log('');
  console.log('支持的格式:');
  console.log('  html   - HTML 格式');
  console.log('  word   - Word 文档 (.docx)');
  console.log('  excel  - Excel 表格 (.xlsx)');
  console.log('  ppt    - PowerPoint 演示文稿 (.pptx)');
  console.log('  pdf    - PDF 文档 (.pdf)');
  console.log('  image  - PNG 图片 (.png)');
  console.log('');
  console.log('可用样式:');
  console.log('  default: 默认样式');
  console.log('  simple: 简约样式');
  console.log('  modern: 现代样式');
  console.log('  dark: 深色样式（适合代码阅读）');
  console.log('');
  console.log('示例:');
  console.log('  npm run convert sample.md');
  console.log('  npm run convert sample.md output.html -f word');
  console.log('  npm run convert sample.md --format pdf --style modern');
  console.log('  npm run convert sample.md output.pdf -f pdf -s dark');
  console.log('');
  console.log('注意: 输入文件默认从input文件夹读取，输出文件默认保存到output文件夹');
}

if (require.main === module) {
  main();
}

module.exports = { 
  convertMarkdownToHtml, 
  convertMarkdownToWord, 
  convertMarkdownToExcel, 
  convertMarkdownToPpt, 
  convertMarkdownToPdf, 
  convertMarkdownToImage,
  styleThemes 
};
