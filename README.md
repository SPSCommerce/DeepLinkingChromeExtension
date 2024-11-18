# Deep Linking Chrome Extension
For ERP Systems that have a light footprint but still need Deep Linking functionality, this Chrome extension adds a Deep linking button to the ERP web page.  It is designed to handle multiple ERPs and to focus on specific pages within the ERP.  The code runs in the background for pages that match patterns specified in the manifest.json.  

##Scope
This is a POC project.  The objective is to add a button to a Sales Order Screen in multiple ERPs that will allow the user to open a Fulfillment Search Screen with the Customer ORder Number or similar as the keyword search item.

## Features

- Adds a Deep Linking button to ERP web pages.
- Supports multiple ERP systems.
- Focuses on specific pages within the ERP.
- Runs in the background for pages matching specified patterns.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/ChromeExtension.git
    ```
2. Navigate to the project directory:
    ```sh
    cd ChromeExtension/Prototype3
    ```
3. Load the extension in Chrome:
    - Open Chrome and go to `chrome://extensions/`
    - Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the project directory.

## Usage

1. Navigate to your ERP system in Chrome.
2. Click the Deep Linking button added by the extension.
3. If the Deep Linking button doesn't appear you may need to refresh the screen.

##TODO
As of writing, this project only works if you access a website with "SO301000" in the URL.  This is designed to target Acumatica installations.  The intent of this
project is to target multiple ERP sites.  In order to add an ERP to the mix:
1. Alter Manifest.json so that the code injection runs on URLs matching the matching rule
2. Add a function for finding the input field with the data you would like to use for deep linking to content.js
3. Call the function in addButtonToERP() in the section for finding the input
4. Acquire better button images.

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature-branch
    ```
5. Open a pull request.


