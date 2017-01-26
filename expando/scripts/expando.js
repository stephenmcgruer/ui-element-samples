/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


function initializeCSSNode() {
  var sheet = document.createElement('style');
  sheet.id = 'expando-css';
  sheet.type = 'text/css';
  document.body.appendChild(sheet);

  var styleSheetList = document.styleSheets;
  for (var i=0; i < document.styleSheets.length; i++){
    var styleSheet = document.styleSheets[i];
    if (styleSheet === sheet.sheet) {
      console.log('Found my inserted sheet!');
      return styleSheet;
    }
  }

  console.log('Found nothing :(');
  return null;
}

function calculateKeyframes(styleSheet, expandedSize, nestedSize) {
  var scaleStep = 1 / Math.ceil(expandedSize / nestedSize);

  var cssToInsert = '@keyframes antiexpando {\n';
  var count = 20;
  for (var i = 0; i <= count; i++) {
    var scale = (i / count) * (scaleStep - 1) + 1;
    var counterScale = 1 / scale;
    cssToInsert += '  ' + Math.round(((i / count) * 100)) + '% {transform: scale(' + counterScale.toFixed(2) + ');}' + '\n';
  }
  cssToInsert += '}\n';
  console.log('Adding rule: ' + cssToInsert);
  styleSheet.insertRule(cssToInsert, styleSheet.cssRules.length);

  cssToInsert = '@keyframes expando {\n';
  cssToInsert += '  0% { transform: scale(1); opacity: 1; }\n';
  cssToInsert += '  100% { transform: scale(' + scaleStep.toFixed(1) + '); opacity: 0; }\n';
  cssToInsert += '}\n';
  console.log('Adding rule: ' + cssToInsert);
  styleSheet.insertRule(cssToInsert, styleSheet.cssRules.length);

  cssToInsert = '@keyframes expando2 {\n';
  cssToInsert += '0% { transform: scale(1); opacity: 0; }\n';
  cssToInsert += '100% { transform: scale(' + scaleStep.toFixed(1) + '); opacity: 1; }\n';
  cssToInsert += '}\n';
  console.log('Adding rule: ' + cssToInsert);
  styleSheet.insertRule(cssToInsert, styleSheet.cssRules.length);
}

function initializeExpando(expandoContainer, shrunkContent, expandedContent) {
  var styleSheet = initializeCSSNode();

  // Correct math?
  var reqRadius = Math.sqrt(Math.pow(expandedContent.offsetHeight, 2) + Math.pow(expandedContent.offsetWidth, 2));
  calculateKeyframes(styleSheet, reqRadius, Math.min(expandoContainer.offsetHeight, expandoContainer.offsetWidth));

  var shrunk = false;
  expandoContainer.addEventListener('click', function() {
    expandoContainer.style.animation = 'antiexpando 120ms linear' + (shrunk ? ' reverse': '') + ' forwards';
    shrunkContent.style.animation = 'expando 120ms linear' + (shrunk ? ' reverse': '') + ' forwards';
    expandedContent.style.animation = 'expando2 120ms linear' + (shrunk ? ' reverse': '') + ' forwards';
    shrunk = !shrunk;
  });

  expandoContainer.addEventListener('animationend', function() {
    // Set the transform and opacity, to make the animation concrete.
    expandoContainer.style.transform = getComputedStyle(expandoContainer).transform;
    shrunkContent.style.transform = getComputedStyle(shrunkContent).transform;
    expandedContent.style.transform = getComputedStyle(expandedContent).transform;
    shrunkContent.style.opacity = getComputedStyle(shrunkContent).opacity;
    expandedContent.style.opacity = getComputedStyle(expandedContent).opacity;

    // We are done animating.
    expandoContainer.style.animation = '';
    shrunkContent.style.animation = '';
    expandedContent.style.animation = '';
  });
}
