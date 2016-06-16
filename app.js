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

  let $xml = $(xml),
      $annotations = $xml.find("span");


  let category,
      charSeqStart,
      charSeqEnd;

  /*
    assumes the annotations are in order to begin with. more robust way would be to sort first. also, a `for(let i = arr.length - 1, i >= 0; i--)` loop is probably faster than reversing in place
  */
  let reversedAnnotations = Array.from($annotations).reverse();

  reversedAnnotations.forEach( annotation => {
    category = annotation.attributes.category.value;
    charSeqStart = parseInt($(annotation).find('charseq')[0].attributes["START"].value);
    charSeqEnd = parseInt($(annotation).find('charseq')[0].attributes["END"].value);

    console.log("category:", category);
    console.log("charSeqStart:", charSeqStart);
    console.log("charSeqEnd:", charSeqEnd);
    console.log(" ");

    /*
      add html tags in reverse to preserve the start and end indices
    */
    text = text.slice(0, charSeqEnd + 1) + `</a><span class="category">[${category}]</span>` + text.slice(charSeqEnd + 1);
    text = text.slice(0, charSeqStart) + "<a class='highlight'>" + text.slice(charSeqStart);

  });

  /*
    use preformatted text tag to preserve whitespace
  */
  let pre = document.createElement("pre");
  pre.innerHTML = text;

  $('#textEl').append(pre);

  /* 
    TODO: on click of annotated word we will give delete and edit options 
  */
  $('.highlight').click( event => {
    console.log(event.target.innerHTML);
  });

});
