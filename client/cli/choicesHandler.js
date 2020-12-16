const fs = require("fs");

const config = require("./config.json");
const {
  createStyledComponentFromTemplate,
  createFeatureTemplate,
} = require("./templates");

function handle({ type, name, path }) {
  switch (type) {
    case "styled-component":
      createStyledComponent({ name, path });
      break;
    case "feature":
      createFeature({ name, path });
      break;
    default:
      break;
  }
}

function createStyledComponent({ name, path }) {
  if (path.length > 0 && path[path.length - 1] !== "/") {
    path += "/";
  }
  name = name.replace(/^./, name[0].toLowerCase());

  var styledPath = config.styledPath + path + `${name}/`;
  const styledComponentName = styledPath + name + config.styledComponentExt;
  const styledCSSName = styledPath + name + config.styledCSSExt;
  const template = createStyledComponentFromTemplate(name);
  fs.mkdirSync(styledPath, {
    recursive: true,
    function(err) {
      if (err) {
        throw err;
      }
    },
  });
  const componentWriteStream = fs.createWriteStream(styledComponentName);
  componentWriteStream.write(template);
  componentWriteStream.close();

  const cssWriteStream = fs.createWriteStream(styledCSSName);
  cssWriteStream.write("");
  cssWriteStream.close();
}

function createFeature({ name, path }) {
  if (path.length > 0 && path[path.length - 1] !== "/") {
    path += "/";
  }
  name = name.replace(/^./, name[0].toLowerCase());
  var featurePath = config.featurePath + path + `${name}/`;

  const {
    sliceTemplate,
    componentTemplate,
    typeTemplate,
    i18nTemplate,
  } = createFeatureTemplate(name);

  const sliceName = featurePath + name + config.sliceExt;
  const componentName = featurePath + name + config.componentExt;
  const typeName = featurePath + name + config.typeExt;
  const i18nName = featurePath + name + config.i18nExt;

  fs.mkdirSync(featurePath, {
    recursive: true,
    function(err) {
      if (err) {
        throw err;
      }
    },
  });

  const sliceWriteStream = fs.createWriteStream(sliceName);
  sliceWriteStream.write(sliceTemplate);
  sliceWriteStream.close();

  const componentWriteStream = fs.createWriteStream(componentName);
  componentWriteStream.write(componentTemplate);
  componentWriteStream.close();

  const typeWriteStream = fs.createWriteStream(typeName);
  typeWriteStream.write(typeTemplate);
  typeWriteStream.close();

  const i18nWriteStream = fs.createWriteStream(i18nName);
  i18nWriteStream.write(i18nTemplate);
  i18nWriteStream.close();
}

module.exports = handle;
