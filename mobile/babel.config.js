module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          // `import.meta` polyfill — needed because zustand/middleware references
          // `import.meta.env.MODE` (Vite-style devtools detection). babel-preset-expo
          // only auto-enables this transform for server-env builds (e.g. expo-router
          // static rendering); since we use `web.output: "single"` and don't depend
          // on expo-router, we must opt in explicitly. The plugin replaces
          // `import.meta` with `globalThis.__ExpoImportMetaRegistry`, which Expo's
          // runtime polyfills (see `expo/winter/runtime`).
          unstable_transformImportMeta: true,
        },
      ],
      "nativewind/babel",
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
