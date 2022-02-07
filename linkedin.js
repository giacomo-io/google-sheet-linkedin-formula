/* MIT License

Copyright (c) 2022 Giacomo Melzi

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
SOFTWARE. */

/**
 * Find the url of a Linkedin profile
 *
 * @param {string} query The person or company whose profile you want to find on Linkedin
 * @param {bool} company [OPTIONAL] Type TRUE if you're looking for a company profile. Default is FALSE
 * @param {number} index [OPTIONAL] Get a different result index. Default is 1. Write 0 to return all the results
 * @return if found, the hyperlink of the profile 
 * @customfunction
 */
function LINKEDINPROFILE(query, company, index = 1) {

  const apiKey = "yourApiKey";
  const searchEngineId = "yourSearchEngineId";

  const urlQuery =
    `https://www.googleapis.com/customsearch/v1?key={{apiKey}}&cx={{searchEngineId}}&q={{query}}&num=10`;

  const url = urlQuery
    .replace("{{apiKey}}", encodeURIComponent(apiKey))
    .replace("{{searchEngineId}}", encodeURIComponent(searchEngineId))
    .replace("{{query}}", encodeURIComponent(query));

  const response = UrlFetchApp.fetch(url);

  try {
    const res = JSON.parse(response.getContentText());

    let results = res.items.map(e => {
      return e.formattedUrl;
    });

    let output;

    if (company) {
      output = results.filter(e => {
        return e.includes("/company/");
      });
    } else {
      output = results.filter(function(e, i) {
        return e.includes("/in/");
      });
    }

    output = getResults(output,index);

    return output;
  }
  catch (err) {
    throw new Error (err)
  }
}

const getResults = (data,index) => {
  let res;

  if (index == 0) {
    res = data.map((e,i) => `${i+1} ${e}`);
    res.flat();
  } else {
    res = data[index-1];
  }
  console.log(res);
  return res;
}
