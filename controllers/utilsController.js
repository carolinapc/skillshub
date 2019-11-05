
// Defining methods for the utils controlllers
module.exports = {

  //upload a file to the tmp folder and return its fileName
  uploadFile: function (req, res) {
    // check if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to upload files");
    }
    else {
      if (req.files) {
              
        let fileName = req.files.file.name;
        
        //get the file extension
        let fileExt = fileName.split(".");
        fileExt = fileExt[fileExt.length - 1];

        //add extension to filename
        let fullFileName = `${req.files.file.tempFilePath}.${fileExt}`.toLowerCase();
        
        fileName = fullFileName.split("/");
        fileName = fileName[fileName.length - 1];
        
        //rename the file to add the extension
        req.files.file.mv(fullFileName, function(err) {
          if (!err) {
            fullFileName = fullFileName.replace("client/public/", "");
            data = {
              fileName: fileName,
              fullFileName: fullFileName
            };
            
            res.json(data);
          }
          else {
            res.status(400).end(err.message);
          }
        });      
        
      }
      else {
        res.status(500).end("File was not sent");
      }  
    }
  }
}
