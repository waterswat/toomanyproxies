# SystemYA's TOMP implementation

This repository implements the proxy model found [here](https://github.com/tomphttp/specifications/blob/master/ProxyModel.md).

- [Demo](https://tomp.sys32.dev/)
- [Frontend](https://github.com/sysce/tomp-demo)

## Usage

We provide a command-line interface for compiling the code.

For more features, specify the `--help` option when running the CLI.

## Wiki

Documentation for components such as the Bootstrapper can be found in [the wiki](https://github.com/sysce/tomp/wiki).

### Quickstart

1. Clone the repository locally
```sh
git clone https://github.com/sysce/tomp.git
```

2. Enter the folder
```sh
cd toomanyproxies
```

3. Install dependencies
```sh
npm install
```

3. Build to the `tompbuild` folder
```sh
node ./app.mjs build --folder tompbuild
```
