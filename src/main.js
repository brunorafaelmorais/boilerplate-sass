import importSvgIcons from './js/import-svg-icons';

const svgIconPathArray = require.context('./icons', true, /\.svg$/);

importSvgIcons(svgIconPathArray);
