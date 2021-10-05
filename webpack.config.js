{
  "typeRoots": ["./typings"],
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "lib": ["es2015", "dom"],
    "baseUrl": "./src",
    "paths": {
      "@assets/*": ["./assets/*"],
      "@components/*": ["./components/*"],
      "@styles/*": ["./sass/*"],
      "@util": ["./util/index"],
      "@util/*": ["./util/*"],
    }
  },
  "exclude": ["node_modules", "**/*.js"]
}

