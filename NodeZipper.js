//npm packages used for this project
const fs = require('fs')
const path = require('path')
const zl = require("zip-lib")

//target folder name
const directoryName = 'node_modules'

//starting Path extraction to string from array
const startingPath = process.argv.slice(2).toString();

//fucntion to check folder and zip then delete the target folder
function crawl(directoryPath) {
    //console.log('[+]', directoryPath);
    //read files and folders from directory path
    let files = fs.readdirSync(directoryPath);
    for(let x in files) {
        //pick a single file or folder from list
        let next = path.join(directoryPath, files[x])
        //check if it file or folder. If folder then proceed.
        if(fs.lstatSync(next).isDirectory() == true){
            //check if folder is node_modules
            if(next.split('\\').pop() == directoryName){
                zip_path = directoryPath +"\\"+ "node_modules.zip"
                //zip the folder
                zl.archiveFolder(next, zip_path).then(function () {
                    console.log("Zip folder is created");
                }, function (err) {
                    console.log(err);
                }).then(function(){
                     //removing the node-module directory
                    fs.rmdir(next, { recursive: true }, err => {
                        if (err) {
                          throw err
                        }
                        console.log(`${directoryName} is deleted!`)
                      }); 
                });     
            }
            //recursive call to the function to process each folder 
            //in the given path
           crawl(next)
        }
    }
}
//call to main fucntion 
crawl(startingPath);