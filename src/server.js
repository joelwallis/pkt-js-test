'use strict'

const express = require( 'express' );
const multer = require( 'multer' );
const fs = require( 'fs' );
const junk = require( 'junk' );
const path = require( 'path' );
let app = express();

const projectDir = path.join(__dirname, '..')
const srcDir = path.join(projectDir, 'src')
const buildDir = path.join(projectDir, 'build')
const dataDir = path.join(projectDir, 'images')

// I'm building the project with gulp into the directory `build, so the server
// needs the project to be built before working. Please run `npm run build`
// before starting the server.
// PS: I'm doing it synchronously to keep the code simple
try {
  fs.accessSync(buildDir)
} catch (e) {
  console.error([
    'ERROR: Please build the source code before running the server script.',
    '\n  ',
    '$ npm run build'
  ].join(''))
  process.exit(1)
}

app.use( express.static(buildDir) );
app.use( '/images', express.static(dataDir) );

// define file name and destination to save
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dataDir)
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split( '.' );
    ext = ext[ext.length - 1];
    cb(null, 'uploads-' + Date.now() + '.' + ext);
  }
});

// define what file type to accept
let filter = ( req, file, cb ) => {
  if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ) {
    cb( null, true );
  } else {
    cb( 'Failed: format not supported' );
  }
}

// set multer config
let upload = multer( {
  storage: storage,
  fileFilter: filter
}).single( 'upload' );

/* ===============================
  ROUTE
 ============================== */

// route for file upload
app.post( '/uploads', ( req, res ) => {
  upload( req, res, err => {
    if ( err ) {
      console.log( err )
      res.status(400).json( {message: err} );
    } else {
      res.status(200).json( {
        file: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
      } )
    }
  })
})

app.get( '/images', ( req, res ) => {
  let file_path = req.protocol + '://' + req.get('host') + '/images/';
  let files = fs.readdirSync( dataDir );
  files = files
          .filter( junk.not ) // remove .DS_STORE etc
          .map( f => file_path + f ); // map with url path
  res.json( files );
});

// general route
app.get( '/', ( req, res ) => {
  res.sendFile( path.join(buildDir, '/index.html') );
})

var server = app.listen( 8000, _ => {
  console.log( 'server started. listening to 8000' );
})