const miniProgramPreset = require('tailwindcss-miniprogram-preset');
const plugin = require('tailwindcss/plugin');
/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */

module.exports = {
    purge: miniProgramPreset.purge.content,
    presets: [miniProgramPreset],
    corePlugins: {
        boxShadow: false
    },
    plugins: [
        plugin(({ addUtilities }) => {
            const newUtilities = {};
            addUtilities(newUtilities);
        })
    ]
};
