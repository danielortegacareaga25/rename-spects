const glob = require("glob");
var fs = require("fs");
const directoryOrigin = "C:/Users/danie/Documents/nodeProjects/projects/";

glob(__dirname + "/**/*.spec.ts", {}, async (err, files) => {
  //   console.log(files);
  for await (variableFile of files) {
    const directoryName = variableFile.replace(directoryOrigin, "");
    const TextAppend = `describe('${directoryName}', () => {`;
    const data = await fs.promises.readFile(variableFile, "utf8");
    // const manyTImesDescribe = data.split("describe").length - 1;
    // console.log("Archive", directoryName);
    // console.log("Many times describe", manyTImesDescribe);
    const firstDescribe = data.indexOf("describe");
    const beforeDescribe = data.substring(0, firstDescribe);
    const afterDescribe = data.substring(firstDescribe);
    const newContent = `${beforeDescribe} ${TextAppend} 
    ${afterDescribe}});
    `;
    const write = await fs.promises.writeFile(variableFile, newContent);
  }
});
