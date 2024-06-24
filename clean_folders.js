/**
 * ==================================================================
 *
 * CLEAN FOLDERS SCRIPT
 *
 * ==================================================================
 * @author Danilo Ramírez Mattey
 * @version 1.0
 * @ref
 * @date 10/october/2021
 *
 * The purpose of this script is to delete all unwanted files inside a folder. Initially
 * this was thought to be used for building folders on JS frameworks, but it can be used
 * in any given folder.
 *
 * Please use with caution since it can delete system files with the right privileges.
 *
 * There are a lot of commented "log" instructions. If you want more information of
 * what the process is doing, please uncomment them
 *
 *
 */

/**************************
 *
 * Configuration
 *
 **************************/

// usually, build is for react projects and dist is for angular projects. Please change accordingly
const folders = ['build', 'dist', 'docs'];

// This is the list of extensions we want to remove from this folder (recursively).
// It works with full filenames as well
const extensions = ['scss', '.babelrc.js', '.md', 'yml', 'nuspec', 'ps1', 'CNAME'];

// The prefix for the logs
const logPrefix = '[CFL] ';

/**************************
 *
 * Required libraries
 *
 **************************/

const fs = require('fs-extra'); // npm install fs-extra
const path = require('path'); // Comes with NODE
const file = require('file'); // npm install file

/**************************
 *
 * Main Functions
 *
 **************************/

/**
 * This will try to delete all files that
 * match the extensions config variable
 * @param filesList
 * @param folder The folder parameter is actually here only to display the messages
 */
async function deleteRestrictedFiles(filesList, folder) {
    log(`Deleting all files that match the criteria inside the folder ${folder}`);

    for (let i = 0; i < extensions.length; i++) {
        const singleExtension = extensions[i];
        log(`Checking extension ${singleExtension}`);

        for (let j = 0; j < filesList.length; j++) {
            const singleFile = filesList[j];
            // The lower case instruction here is because we want to compare
            // regarding if it is uppercase or lowercase
            if (singleFile.toLowerCase().endsWith(singleExtension.toLowerCase())) {
                log(`The file ${singleFile} needs to be deleted`);
                try {
                    fs.unlinkSync(singleFile);
                    log('Successfully deleted');
                } catch (error) {
                    log('Error deleting the file');
                }

            }
        }
    }
}

/**
 * This will read all the files in a folder (recursive) and return all
 * of them with full path
 * @param folder
 * @returns Array
 */
async function readAllFilesRecursive(folder) {

    let listOfFiles = [];
    file.walkSync(folder + path.sep, (t) => {
        // Here we should have every single folder, each one of the variable "t"
        // The mapping at the end is to add the actual folder with the name of the file
        const filesInsideFolder = fs.readdirSync(t).map(f => t + path.sep + f);
        // log(`Files inside folder  ${t}`);
        // log(filesInsideFolder);
        listOfFiles = listOfFiles.concat(filesInsideFolder);

    });
    // log('All files from the folder: ' + folder);
    // log(listOfFiles);
    // now that we have the files, we can return them
    return listOfFiles;
}

/**
 * For each given folder, it will read all files in it
 */
async function processAllFolders() {
    // Lets do the same for all provided folders
    for (let i = 0; i < folders.length; i++) {

        const singleFolder = folders[i];
        if (fs.existsSync(singleFolder)) {
            log(` Checking folder ${singleFolder}`);
            const allFiles = await readAllFilesRecursive(singleFolder);
            // Now that we have all files, we can start removing those that we don't want
            await deleteRestrictedFiles(allFiles, singleFolder);
            space();
        } else {
            log(`Folder "${singleFolder}" does not exist`);
            space();
        }
        space();
    }
}

/**
 * it will console log the provided object. it can be text or any
 * other object class
 * @param ot
 */
function log(ot) {
    if (typeof ot === 'string') {
        try {
            console.log(logPrefix + ot);
        } catch (exception) {
        }
    } else {
        try {
            console.log(ot);
        } catch (exception) {
        }
    }
}

/**
 * This will log one single space
 */
function space() {
    log(' ');
}

async function main() {
    log('*****************************************');
    log('*         CLEAN FOLDER SCRIPT           *');
    log('*****************************************');
    space();
    log('Folders to process: ' + folders.join(', '));
    log('Extensions to process: ' + extensions.join(', '));
    space();
    await processAllFolders();

}

main();
