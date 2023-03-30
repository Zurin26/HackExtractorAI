const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");
const FileReader = require("filereader")
const { v4: uuidv4 } = require("uuid");
const { request } = require("https");

const FR_URL = process.env.FR_URL
const FR_KEY = process.env.FR_KEY

function* getTextOfSpans(content, spans) {
    for (const span of spans) {
      yield content.slice(span.offset, span.offset + span.length);
    }
  }

async function readDocumentData(urlfile) {
    // const modelID = uuidv4();
    const formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png"
    const client = new DocumentAnalysisClient(
        FR_URL,
        new AzureKeyCredential(FR_KEY)
    );

    // const { data } = await fetch(urlfile)

    const poller = await client.beginAnalyzeDocument("prebuilt-read", urlfile);

    const { content, languages, pages, styles } = await poller.pollUntilDone();

    if (pages.length <= 0) {
        console.log("No pages were extracted from the document.");
      } else {
        console.log("Pages:");
        for (const page of pages) {
          console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
          console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
          console.log(`  ${page.lines.length} lines, ${page.words.length} words`);
    
          if (page.lines.length > 0) {
            console.log("  Lines:");
    
            for (const line of page.lines) {
              console.log(`  - "${line.content}"`);
              for (const word of line.words()) {
                console.log(`    - "${word.content}"`);
              }
            }
          }
        }
      }

      if (languages.length <= 0) {
        console.log("No language spans were extracted from the document.");
      } else {
        console.log("Languages:");
        for (const languageEntry of languages) {
          console.log(
            `- Found language: ${languageEntry.languageCode} (confidence: ${languageEntry.confidence})`
          );
          for (const text of getTextOfSpans(content, languageEntry.spans)) {
            const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
            console.log(`  - "${escapedText}"`);
          }
        }
      }
    
      if (styles.length <= 0) {
        console.log("No text styles were extracted from the document.");
      } else {
        console.log("Styles:");
        for (const style of styles) {
          console.log(
            `- Handwritten: ${style.isHandwritten ? "yes" : "no"} (confidence=${style.confidence})`
          );
    
          for (const word of getTextOfSpans(content, style.spans)) {
            console.log(`  - "${word}"`);
          }
        }
      }
    
    return {
        pages : pages,
        styles : styles,
        content : content,
        languages : languages
    }
}


module.exports = {
    readDocumentData
}