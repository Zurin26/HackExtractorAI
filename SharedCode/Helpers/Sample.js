/*
  This code sample shows Prebuilt Read operations with the Azure Form Recognizer client library. 

  To learn more, please visit the documentation - Quickstart: Form Recognizer Javascript client library SDKs
  https://docs.microsoft.com/en-us/azure/applied-ai-services/form-recognizer/quickstarts/try-v3-javascript-sdk
*/

const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
 
function* getTextOfSpans(content, spans) {
  for (const span of spans) {
    yield content.slice(span.offset, span.offset + span.length);
  }
}

/*
  Remember to remove the key from your code when you're done, and never post it publicly. For production, use
  secure methods to store and access your credentials. For more information, see 
  https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-security?tabs=command-line%2Ccsharp#environment-variables-and-application-configuration
*/
const endpoint = "YOUR_FORM_RECOGNIZER_ENDPOINT";
const key = "YOUR_FORM_RECOGNIZER_KEY";

// sample document
const formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png"

async function main() {
  // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
  const poller = await client.beginAnalyzeDocument("prebuilt-read", formUrl);

  const { content, pages, languages, styles } = await poller.pollUntilDone();

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

          // The words of the line can also be iterated independently. The words are computed based on their
          // corresponding spans.
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
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});