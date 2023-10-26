# wahyoo-post-api-internal


### Create module
```
yarn run nest:create:module organizations
```

### Create service
```
yarn run nest:create:service organizations
```

### Create resolver
```
yarn run nest:create:resolver organizations
```

### Running application in local
```
yarn start
```


### Formatting source code
```
yarn run format
```

### How to link wahyoo-shared project to main project
by default wahyoo-shared download from repository latest tag and located in node_modules, but how if you develop in local and wanna as soon as possible to testing changes code, solution is using npm link, to link local project follow instruction below:

- open wahyoo-shared project folder
- run `npm link`
- open main project
- run `npm link @wahyoo/wahyoo-shared`
- completed!

### How to upgrade version wahyoo-shared

for example upgrade to v0.2.0
```
yarn upgrade @wahyoo/wahyoo-shared@0.2.0
```