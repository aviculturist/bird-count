This project contains a proof of concept [Stacks](https://stacks.co) and [Next.js](https://nextjs.org/) app.

It implements a simple [Clarity](https://clarity-lang.org/) counter contract and knits together a web front end, testing frameworks, integration environment and scripting setup.

**NOTE: THIS PROJECT AND SUPPORTING LIBRARIES HAVE NOT BEEN AUDITED, IT IS IN ALPHA STATE. USE AT YOUR OWN RISK / DISCRETION**  

## Getting Started

First, install and run [Docker Desktop](https://www.docker.com/products/docker-desktop).

Install [Clarinet](https://github.com/hirosystems/clarinet)

Clone this repository and boot the integration environment (Bitcoin node, Stacks node, api server and explorers):

```bash
cd bird-count
clarinet integrate
```

In a different terminal, start the development server:

```bash
yarn && yarn run dev
```

Install the [Hiro Wallet](https://www.hiro.so/wallet/install-web) and add `http://localhost:3999` as the `Address`. Use `LocalDevNet` for `Name` and `2147483648` for `Key`.

Open [http://localhost:3000](http://localhost:3000) with your browser to load the app. You can connect your wallet and use the `+` button to increment the counter.

## Making changes

Add or modify a Clarity contract in `./contracts`

Run `clarinet check`

Copy or edit `src/pages/index.tsx`, `Next.js` automatically creates routes for additional pages in that directory.

Files in `src/utils/clarigen` are automatically generated with boilerplate including Clarinet test accounts by running `yarn clarigen`.

## Theming

Integrates Material UI and `styled-components`. TODO.

## Testing

To run the tests (both `@clarigen/test` and Clarinet examples are included), try:

```bash
$ yarn test
yarn run v1.22.10
$ jest && clarinet test tests/*.ts
 PASS  tests/clarigen/bird-count.test.ts (5.563 s)
  Counter contract
    ✓ initial counter is 0 (28 ms)
    ✓ increment counter (67 ms)
    ✓ decrement counter (59 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        5.7 s
Ran all test suites.

Running file:///Projects/bird-count/tests/bird-count_test.ts
* get-bird-count returns u0 for principals that never called count-bird before ... ok (15ms)
* count-bird counts up for the tx-sender ... ok (14ms)

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (792ms)

✨  Done in 12.22s.

```

Each testing framework can also be run independently.

## Scripts

There's a simple `node` script that utilizes `@clarigen/node` that will call the public `increment` function within the integration environment:

```bash
$ yarn ts-node scripts/increment.ts
yarn run v1.22.10
$ /Projects/bird-count/node_modules/.bin/ts-node scripts/increment.ts
http://localhost:3999/extended/v1/tx/0x10242276f35714c18ababdd36bd5a667383f4d820bdbeeb65c649808c82d74e7
✨  Done in 3.44s.
```

## Potential Future Features

* Integration with `@clarigen/web`
* Deployment scripts for contracts (`regtest`, `testnet`, `mainnet`)
* Deployment scripts and CI setup for `Next.js`


## About
`bird-count` was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and then integrated with [Clarinet](https://github.com/hirosystems/clarinet) (testing and integration) and [Clarigen](https://github.com/obylabs/clarigen) (testing and boilerplate). It utilizes [micro-stacks](https://github.com/fungible-systems/micro-stacks/) and [jotai-query-toolkit](https://github.com/fungible-systems/jotai-query-toolkit) for state management. Huge thanks to both [@aulneau](https://github.com/aulneau) and [@hstove](https://github.com/hstove) for helping get these elements working together nicely.

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
