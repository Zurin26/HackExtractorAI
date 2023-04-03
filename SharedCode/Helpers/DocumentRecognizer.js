const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const FR_URL = process.env.FR_URL
const FR_KEY = process.env.FR_KEY

function* getTextOfSpans(content, spans) {
    for (const span of spans) {
      yield content.slice(span.offset, span.offset + span.length);
    }
  }

async function readDocumentData(urlfile) {
    const formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png"
    const client = new DocumentAnalysisClient(
        FR_URL,
        new AzureKeyCredential(FR_KEY)
    );

    const poller = await client.beginAnalyzeDocument("prebuilt-read", urlfile);

    const { content, languages, pages, styles } = await poller.pollUntilDone();

    const pagesLine = [];
    const pagesWord = [];
    const contentLang = [];
    const contentStyle = [];

    if (pages.length <= 0) {
      } else {
        for (const page of pages) {
          if (page.lines.length > 0) {
            for (const line of page.lines) {
            //   console.log(`  - "${line.content}"`);
              pagesLine.push(line.content);
              for (const word of line.words()) {
                // console.log(`    - "${word.content}"`);
                pagesWord.push(word.content);
              }
            }
          }
        }
      }
    
      if (languages.length <= 0) {
      } else {
        for (const languageEntry of languages) {
          for (const text of getTextOfSpans(content, languageEntry.spans)) {
            const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
            // console.log(`  - "${escapedText}"`);
            contentLang.push(escapedText);
          }
        }
      }
    
      if (styles.length <= 0) {
      } else {
        for (const style of styles) {
          for (const word of getTextOfSpans(content, style.spans)) {
            // console.log(`  - "${word}"`);
            contentStyle.push(word);
          }
        }
      }
      return {
        valid: true,
        pages : {
            pagesLine : pagesLine,
            pagesWord : pagesWord
        },
        styles : styles,
        content : {
            contentLang : contentLang,
            contentStyle : contentStyle
        },
        languages : languages
    }
}


module.exports = {
    readDocumentData
}