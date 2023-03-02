const { favicons } = require('favicons');
const path = require('path');
const fs = require('fs');


async function generate() {
  const source = path.resolve(__dirname, '../public/assets/favicon.svg');

  const config = {
    path: '/assets',
    appName: '2048_Game',
    appShortName: '2048',
    icons: {
      appleStartup: false,
      windows: false,
      yandex: false,
    },
  };

  const response = await favicons(source, config);

  for (const image of response.images) {
    if (!templates.includes(image.name)) continue;

    const imageDir = path.resolve(__dirname, `../public/assets/${image.name}`);
    fs.writeFile(imageDir, image.contents, (err) => {
      if (err) return console.error(err.message);
      console.log(`Save image <${image.name}> in file.`);
    });
  }
}

generate();
