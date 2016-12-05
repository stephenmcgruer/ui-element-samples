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

function initializeExpando() {
  var container = document.querySelector('.container');
  var nested = document.querySelector('.img-container');
  var shrunk = false;
  container.addEventListener('click', function() {
    console.log('clicked');
    container.style.animation = 'expando 120ms linear' + (shrunk ? ' reverse': '') + ' forwards';
    nested.style.animation = 'antiexpando 120ms linear' + (shrunk ? ' reverse': '') + ' forwards';
    shrunk = !shrunk;
  });
  container.addEventListener('animationend', function() {
    console.log('done');
    container.style.transform = getComputedStyle(container).transform;
    nested.style.transform = getComputedStyle(nested).transform;
    container.style.animation = '';
    nested.style.animation = '';
  });
}
