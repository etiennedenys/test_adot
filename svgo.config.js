const { extendDefaultPlugins } = require('svgo');

let svgCounter = 0;

module.exports = {
    plugins: extendDefaultPlugins([
        {
            name: 'cleanupIDs',
            params: {
                remove: false,
                minify: true,
                prefix: {
                    toString() {
                        return `id01-${svgCounter++}`;
                    },
                },
            },
        },
        // important when working with inline SVG, id's allow us to reference the individual symbols
        {
            name: 'cleanupAttrs',
            active: false,
        },
        {
            name: 'removeDoctype',
            active: true,
        },
        {
            name: 'removeXMLProcInst',
            active: true,
        },
        {
            name: 'removeComments',
            active: true,
        },
        // OK
        {
            name: 'removeMetadata',
            active: true,
        },
        {
            name: 'removeTitle',
            active: true,
        },
        // OK
        {
            name: 'removeDesc',
            active: true,
        },
        // OK
        {
            name: 'removeUselessDefs',
            active: true,
        },
        {
            name: 'removeEditorsNSData',
            active: true,
        },
        {
            name: 'removeEmptyAttrs',
            active: true,
        },
        {
            name: 'removeHiddenElems',
            active: true,
        },
        {
            name: 'removeEmptyText',
            active: false,
        },
        // OK
        {
            name: 'removeEmptyContainers',
            active: false,
        },
        // OK
        {
            name: 'removeViewBox',
            active: false,
        },
        // OK
        // { name: 'cleanUpEnableBackground', active: true },
        {
            name: 'convertStyleToAttrs',
            active: true,
        },
        {
            name: 'convertColors',
            active: false,
        },
        // OK
        {
            name: 'convertPathData',
            active: false,
        },
        // this option break "d" attribut when removing ","
        {
            name: 'convertTransform',
            active: false,
        },
        {
            name: 'removeUnknownsAndDefaults',
            active: false,
        },
        {
            name: 'removeNonInheritableGroupAttrs',
            active: true,
        },
        {
            name: 'removeUselessStrokeAndFill',
            active: true,
        },
        {
            name: 'removeUnusedNS',
            active: true,
        },
        {
            name: 'cleanupNumericValues',
            active: false,
        },
        {
            name: 'moveElemsAttrsToGroup',
            active: false,
        },
        {
            name: 'moveGroupAttrsToElems',
            active: true,
        },
        {
            name: 'collapseGroups',
            active: false,
        },
        // OK
        {
            name: 'removeRasterImages',
            active: false,
        },
        {
            name: 'mergePaths',
            active: false,
        },
        {
            name: 'convertShapeToPath',
            active: false,
        },
        {
            name: 'sortAttrs',
            active: true,
        },
        // { name: 'transformsWithOnePath', active: false },
        {
            name: 'removeDimensions',
            active: false,
        },
        // OK
        {
            name: 'removeAttrs',
            active: false,
        },
    ]),
};
