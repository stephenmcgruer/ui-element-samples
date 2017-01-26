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

function calculateKeyframes(expandedSize, nestedSize) {
  var scaleStep = 1 / (expandedSize / nestedSize);
  var count = 20;
  var keyframes = '';
  for (var i = 0; i <= count; i++) {
    var scale = (i / count) * (scaleStep - 1) + 1;
    var counterScale = 1 / scale;
    keyframes += ((i / count) * 100) + '% {transform: scale(' + counterScale + ');}' + '\n';
  }
  console.log(keyframes);

  var otherframes = '';
  otherframes += '0% { transform: scale(1); opacity: 1; }\n';
  otherframes += '0% { transform: scale(' + scaleStep + '); opacity: 0; }\n';
  console.log(otherframes);

  otherframes = '';
  otherframes += '0% { transform: scale(1); opacity: 0; }\n';
  otherframes += '0% { transform: scale(' + scaleStep + '); opacity: 1; }\n';
  console.log(otherframes);
}

function initializeExpando(expandoContainer, shrunkContent, expandedContent) {
  // Correct math?
  var reqRadius = Math.sqrt(Math.pow(expandedContent.offsetHeight, 2) + Math.pow(expandedContent.offsetWidth, 2));
  calculateKeyframes(reqRadius, Math.min(expandoContainer.offsetHeight, expandoContainer.offsetWidth));

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
