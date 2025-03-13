// ==UserScript==
// @name         Restore VSCode extensions download button
// @namespace    melashri.net
// @version      0.1.0
// @description  Adds download link to VSCode Marketplace Extension pages
// @author       melashri
// @match        https://marketplace.visualstudio.com/items*
// @grant        none
// @license      MIT
// @downloadURL https://github.com/MohamedElashri/vsix/raw/refs/heads/main/vsix_download.user.js
// @updateURL  https://github.com/MohamedElashri/vsix/raw/refs/heads/main/vsix_download.user.js
// ==/UserScript==


(function() {
    'use strict';
    // Wait for page to finish loading
    window.addEventListener('load', function() {
        setTimeout(addDownloadLink, 1000);
    });
    function addDownloadLink() {
        // Get version number
        const versionElement = document.querySelector('td[role="definition"][aria-labelledby="version"]');
        if (!versionElement) {
            console.log('Version element not found');
            return;
        }
        const version = versionElement.textContent.trim();
        console.log('Found version:', version);
        // Get publisher and extension name from URL
        const url = window.location.href;
        const match = url.match(/items\?itemName=([^.]+)\.([^&]+)/);
        if (!match) {
            console.log('Unable to parse publisher and extension name from URL');
            return;
        }
        const publisher = match[1];
        const extension = match[2];
        // Build download link
        const downloadUrl = `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisher}/vsextensions/${extension}/${version}/vspackage`;
        // Find Resources list
        const resourcesList = document.querySelector('.ux-section-resources ul');
        if (!resourcesList) {
            console.log('Resources list not found');
            return;
        }
        // Create new list item
        const downloadLi = document.createElement('li');
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.target = '_blank';
        downloadLink.textContent = 'Download';
        downloadLi.appendChild(downloadLink);
        // Add to the end of the list
        resourcesList.appendChild(downloadLi);
        console.log('Download link added');
    }
})();
