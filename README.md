# BirdCount

[![Release](https://github.com/aviculturist/bird-count//actions/workflows/release.yaml/badge.svg)](https://github.com/aviculturist/bird-count//actions/workflows/release.yamlrelease.yaml)
[![Lint](https://github.com/aviculturist/bird-count/actions/workflows/lint.yaml/badge.svg)](https://github.com/aviculturist/bird-count/actions/workflows/lint.yml)

BirdCount comprises a proof of concept [Stacks](https://stacks.co) and [Next.js](https://nextjs.org/) app.

It implements a simple [Clarity](https://clarity-lang.org/) counter contract and knits together a web frontend interface, testing frameworks, integration environment, scripting setup, and static IPFS deployment workflow.

**NOTE: THIS PROJECT AND SUPPORTING LIBRARIES HAVE NOT BEEN AUDITED, IT IS IN ALPHA STATE. USE AT YOUR OWN RISK / DISCRETION**  

## Accessing BirdCount

To access BirdCount, use an IPFS gateway link from the
[latest release](https://github.com/aviculturist/bird-count/releases/latest),
or visit [bird-count.com](https://bird-count.com).

## Getting Started

To run the integration environment locally, install and run [Docker Desktop](https://www.docker.com/products/docker-desktop).

Install [Clarinet](https://github.com/hirosystems/clarinet).

Clone this repository and bootstrap your `localnet` which consists of a Bitcoin node, Stacks node, Stacks API server, and Stacks and Bitcoin explorers:

```bash
cd bird-count
clarinet integrate
```

In a different terminal, install the dependencies and start the development server:

```bash
yarn && yarn run dev
```

In your browser, install the [Hiro Wallet](https://www.hiro.so/wallet/install-web) and select `Change Network -> Localnet`.

Open [http://localhost:3000](http://localhost:3000) with your browser to load the app. Click on `Connect Stacks Wallet` and then use the `+` button to increment the counter.

## Testing

To run the tests (both `@clarigen/test` and Clarinet examples are included), try:

```bash
$ yarn test
yarn run v1.22.10
$ jest && clarinet test tests/*.ts
 PASS  tests/clarigen/bird-count.test.ts (5.595 s)
  Counter contract
    ✓ initial counter is 0 (34 ms)
    ✓ increment counter (34 ms)
    ✓ decrement counter (28 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        5.754 s
Ran all test suites.

Running file:///Projects/bird-count/tests/bird-count_test.ts
* get-bird-count returns u0 immediately after being deployed ... ok (22ms)
* increment function counts up ... ok (11ms)

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (808ms)

✨  Done in 12.81s.
```

Each testing framework can also be run independently `npx jest` for the Clarigen test and `clarinet test tests/bird-count_test.ts` for the Clarinet one.

## Scripts

There's an example `node` script written with `@clarigen/node` that will call the public `increment` function within the integration environment:

```bash
$ yarn ts-node scripts/increment.ts
yarn run v1.22.10
$ /Projects/bird-count/node_modules/.bin/ts-node scripts/increment.ts
http://localhost:3999/extended/v1/tx/0x10242276f35714c18ababdd36bd5a667383f4d820bdbeeb65c649808c82d74e7
✨  Done in 3.44s.
```

## Potential Future Features

* Integration with `@clarigen/web`
* Generate and display build hashes on the app
* Release monitoring scripts to help support the IPFS deployment
* Deployment scripts for contracts (`regtest`, `testnet`, `mainnet`)
* A more robust CI setup

## Making changes

Add or modify a Clarity contract in `./contracts`

Run `clarinet check`

Copy or edit `src/pages/index.tsx`, `Next.js` automatically creates routes for additional pages in that directory.

Files in `src/utils/clarigen` are automatically generated with boilerplate including Clarinet test accounts by running `yarn clarigen`.

## About

`bird-count` was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and then integrated with [Clarinet](https://github.com/hirosystems/clarinet) (testing and integration) and [Clarigen](https://github.com/obylabs/clarigen) (testing and boilerplate). It utilizes [micro-stacks](https://github.com/fungible-systems/micro-stacks/) to connect to Stacks and [jotai-query-toolkit](https://github.com/fungible-systems/jotai-query-toolkit) for managing query state.

The interface is currently built with components from MUI v5 and the `styled-components` library but that could change in the future if more flexible options become apparent (suggestions welcome!). 

Implementing a "no compromises" `DarkMode`, `i18n/l10n` (with RTL support) as well as a `fully static` build using `export` are core principles of the project.

Huge thanks to both [@aulneau](https://github.com/aulneau) and [@hstove](https://github.com/hstove) for helping get these elements working together nicely. Many thanks also to the countless others on the Interwebs, too numerous to individually cite, links to many of whom I have tried to remember to embed within comments of the relevant area of the codebase.

## Caveats

- There is at times an error about a className missmatch when running `yarn run dev`, does not seem to effect production
  https://github.com/mui-org/material-ui/issues/18018
  https://github.com/mui-org/material-ui/pull/27088
- Most of the app is wrapped in `NoSsr` because `Next.js` does not currently support `i18n` static exports. The main implication is that only the English version of the page is built during export and translations are loaded dynamically.
- The hosting environment (IPFS) can't produce responsive headers so that limits some interaction options.
