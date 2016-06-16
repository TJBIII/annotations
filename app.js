"use strict";

function getText () {
  return $.ajax({
            url: './ch8text.txt',
            type: 'GET',
            dataType: 'text',
          })
          .fail(function(err) {
            console.log("Error loading text:", err.statusText);
          });
}


function getAnnotations () {
  return $.ajax({
            url: './ch8annotations.xml',
            type: 'GET',
            dataType: 'xml',
          })
          .fail(function(err) {
            console.log("Error loading annotations:", err.statusText);
          });
}


$.when(getText(), getAnnotations()).done( (getTextResponse, getAnnotationsResponse) => {
  /*
    getTextResponse and getAnnotationsResponse are arrays of length 3 containing the response text, status, and jquery XHR object
  */

  let text = getTextResponse[0],
      xml = getAnnotationsResponse[0];

  console.log("text", text);
  console.log("xml", xml);
});