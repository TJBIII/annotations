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
    Handles delete and edit options
  */
  $('#textEl').click( event => {

    if (event.target.className.indexOf("highlight") >= 0){
      let categoryEl = event.target.nextSibling;

      //strip brackets
      let category = categoryEl.innerHTML.replace(/[\[\]]/g, "");
      let newCategory = prompt("Hit 'backspace' and then 'enter' to delete, or type in a new annotation label:", category);

      if (newCategory.length === 0){
        //delete case
        console.log("deleting");
        let text = event.target.innerText;

        //remove annotation
        event.target.nextSibling.remove();

        //replace anchor tag element with text
        event.target.outerHTML = text;

      } else {
        //edit case
        newCategory = newCategory.toUpperCase();
        categoryEl.innerHTML = `[${newCategory}]`
      }
    }

  });


  /*
    When a user selects text prompt them for the annotation (category) to add and add to DOM
  */
  $('#textEl').mouseup( event => {
    let s =  window.getSelection().getRangeAt(0);

    let startOffset = s.startOffset,
        endOffset = s.endOffset,
        selectedText = document.getSelection().toString();


    if (startOffset !== endOffset) {
      let newAnnotation = window.prompt(`You selected: '${selectedText}'. Type in your category label and click OK.`);

      if (newAnnotation !== null && newAnnotation.length > 0){
        //uppercase here so we dont get error if it is null
        newAnnotation = newAnnotation.toUpperCase();
        replaceSelection(`<a class="highlight">${selectedText}</a><span class="category">[${newAnnotation}]</span>`);
      }
    }

  });

});


/*
  modified from here: http://stackoverflow.com/questions/7991474/calculate-position-of-selected-text-javascript-jquery

  replaces the selected range with replacementHTML
*/
function replaceSelection(replacementHTML) {

  let sel,
      range,
      fragment;

  if (typeof window.getSelection != "undefined") {
    sel = window.getSelection();
    // Test that the Selection object contains at least one Range
    if (sel.getRangeAt && sel.rangeCount) {
      // Get the first Range (only Firefox supports more than one)
      range = window.getSelection().getRangeAt(0);

      range.deleteContents();

      // Create a DocumentFragment to insert and populate it with HTML
      fragment = range.createContextualFragment(replacementHTML);

      let firstInsertedNode = fragment.firstChild,
          lastInsertedNode = fragment.lastChild;

      range.insertNode(fragment);
    }
  }
}

