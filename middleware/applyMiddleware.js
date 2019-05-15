const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = expressApp => {
  // FIXME Disable cors
  expressApp.use(cors());
  expressApp.use(bodyParser.json());
  expressApp.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
};
