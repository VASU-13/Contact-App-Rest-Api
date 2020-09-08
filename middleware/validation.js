var fs = require('fs');

module.exports = (req,res,next) => {

  if (typeof(req.file) === 'undefined' || typeof(req.body) === 'undefined') {

    return res.status(400).json({
      errors: 'Problem with sending data... Required All fields'
    })
  }

 

  if(!(req.file.mimetype).includes('jpg')
    && !(req.file.mimetype).includes('png')
    && !(req.file.mimetype).includes('jpeg') ) {

      fs.unlinkSync(req.file.path)
      return res.status(400).json({
        errors: " file format not supported "
      })

  }

  if(req.file.size >= 1024 * 1024 * 2.5){
    
    fs.unlinkSync(req.file.path)
    return res.status(400).json({
      errors: "File is Too large maxsize 2.5MB"
    })

  }

  if(!req.body.username || !req.body.name) {
    return res.status(400).json({
      errors:"all fields are required"
    })
  }

  next();


}