# -🐦+ BirdCount

[![Release](https://github.com/aviculturist/bird-count/actions/workflows/release.yaml/badge.svg)](https://github.com/aviculturist/bird-count/actions/workflows/release.yamlrelease.yaml)
[![Lint](https://github.com/aviculturist/bird-count/actions/workflows/lint.yaml/badge.svg)](https://github.com/aviculturist/bird-count/actions/workflows/lint.yml)

BirdCount comprises a proof of concept [Stacks](https://stacks.co) and [Next.js](https://nextjs.org/) app.

It implements a simple [Clarity](https://clarity-lang.org/) counter contract and knits together a web frontend interface, testing frameworks, integration environment, scripting setup, and static IPFS deployment workflow.

**NOTE: THIS PROJECT AND SUPPORTING LIBRARIES HAVE NOT BEEN AUDITED, IT IS IN ALPHA STATE. USE AT YOUR OWN RISK / DISCRETION**

## Accessing BirdCount

To access BirdCount, use an IPFS gateway link from the
[latest release](https://github.com/aviculturist/bird-count/releases/latest),
or visit [bird-count.com](https://bird-count.com).

> The counter is statically set at `15` but will fetch
> the counter state dynamically every 3 seconds using
> whichever network you have selected.

> NOTE: `mainnet` is the default network and `localnet`
> only works in development mode due to browser
> security limitations (CORS and mixed content)

## Running BirdCount

> If you prefer not using the integration environment,
> BirdCount can be run locally and pointed at `mainnet`,
> `regtest`(with some limitations), or `testnet`. Skip
> ahead to Step 4 and for Steps 5 and 6 use another network.

1. To run BirdCount with the integration environment locally, install and run [Docker Desktop](https://www.docker.com/products/docker-desktop).

2. Install [Clarinet](https://github.com/hirosystems/clarinet).

3. Clone this repository and bootstrap your `localnet` which consists of a Bitcoin node, Stacks node, Stacks API server, and Stacks and Bitcoin explorers:

```bash
cd bird-count
clarinet integrate
```

4. In a different terminal, install the dependencies and start the development server:

```bash
yarn && yarn run dev
```

5. In your browser, install the [Hiro Wallet](https://www.hiro.so/wallet/install-web) and select `Change Network -> Localnet`.

6. Open [http://localhost:3000](http://localhost:3000) with your browser to load the app. Click on `Connect Stacks Wallet` and make sure you are connected to `Localnet`, then use the `+` button to increment the counter. Open the [Chrome DevTools](https://developer.chrome.com/docs/devtools/) to view the console and network queries.

Once your transaction has confirmed, the counter will automatically update.

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

## Translation

`lingui` is used for translations. To add a new translation, edit `lingui.config.js`. Then run:

```bash
yarn run lingui
```

TODO: document the other areas of the app that need to be edited to add a new langauge, control locale and text direction.

## About

BirdCount was developed while participating in the first [Clarity Universe](https://clarity-lang.org/universe) cohort.

It was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and then integrated with [Clarinet](https://github.com/hirosystems/clarinet) (testing and integration) and [Clarigen](https://github.com/obylabs/clarigen) (testing and boilerplate). It utilizes [micro-stacks](https://github.com/fungible-systems/micro-stacks/) to connect to Stacks and [jotai-query-toolkit](https://github.com/fungible-systems/jotai-query-toolkit) for managing query state.

The interface is currently built with components from [MUI v5](https://mui.com/) and the [styled-components](https://styled-components.com/) library but that could change in the future if more flexible options become apparent (suggestions welcome!).

Implementing a `fully static` `SSG` build using `Next.js` `export`, "no compromises" `DarkMode`, `i18n/l10n` (including RTL support) are core principles of the project.

## A Starter Project

BirdCount is intended to be a starting template for building more functional Stacks apps; it's been built as a proof of concept minimally viable app that's production ready and can be statically deployed on a censorship resistant network like IPFS. To that end, please fork it and build something!

Here are some things you can try:

- Add or modify a Clarity contract in `./contracts`
- Run `clarinet check`
- Files in `src/utils/clarigen` are automatically generated by running `yarn clarigen`. The resulting boilerplate can be used for running tests and scripts (and eventually, when the `@clarigen/web` stabilizes, may power the web app itself.)
- Write new tests against your contract
- Create new pages in `src/pages/` using `src/pages/index.tsx`, as an example. `Next.js` automatically creates routes for additional pages in that directory (e.g., see the `about` page).

### Deploying

Deploying your app manually to IPFS to share your work is pretty simple once you have the [IPFS Command-line](https://docs.ipfs.io/install/command-line/) installed, have done an `ipfs init` and have the daemon running:

```bash
yarn build && yarn export
ipfs add -r out
ipfs name publish /ipfs/<...Content Identifier (CID) of the out folder...>
```

When I started, I used to manually run the above, and I also set up an account at pinata to manually pin each release (to make sure at least one IPFS node has a copy):

```bash
ipfs pin remote add --service=pinata /ipfs/<...Content Identifier (CID) of the out folder...>
```

Now all of the above as well as a `dnslink`-based name resolution system are handled automatically via the Github [Release](https://github.com/aviculturist/bird-count//actions/workflows/release.yaml) workflow using [Github encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets). SSL termination is handled using [Cloudflare](https://developers.cloudflare.com/distributed-web/ipfs-gateway) and pinning via [Pinata](https://www.pinata.cloud/). Yes, you have to actually email Cloudflare to ask them to set up the SSL certificate.

### Pinning the latest releases

Anyone running `ipfs` can support the project by pinning the latest version.

First find the CID hash on the latest release page, or by running:

```bash
dig +short txt _dnslink.bird-count.com
"dnslink=/ipfs/<...Content Identifier (CID) of the out folder...>"
```

(alternatively, you can run `ipfs dns bird-count.com` to get the latest CID hash)

To pin this content, run:

```bash
ipfs pin add -r /ipfs/<...Content Identifier (CID) of the out folder...>

```

## Contributions and TODO

If you'd like to contribute to the project, here's my current TODO list.

- Fix onboarding to connect (or install) the Hiro Wallet (auto-dismiss popup after connect)
- Infinite query to scan blocks for history and portably cache scanned blocks
- User-defined nodes and explorers
- Sync `localStorage` with gaia hub
- Scripts to help the community support the IPFS deployment
- Deployment scripts for contracts (`regtest`, `testnet`, `mainnet`)
- BirdCount V2! A per-`principle` counter. V1 will continue to be maintained indefinitely
- A more robust CI setup including `yarn changeset`
- Integrate an external translation service
- Refactor with `@clarigen/web` to power the web app

TOFIX:

- Mobile !
- Finish autocomplete search
- Import `localStorage` from json file
- Add completed transactions to drawer
- xx-YY locale support
- Fix background gradient with RTL locales

## Design Caveats

- There is at times an error about a className missmatch when running `yarn run dev`, does not seem to effect production. See e.g., https://github.com/mui-org/material-ui/issues/18018 and https://github.com/mui-org/material-ui/pull/27088
- Most of the app is wrapped in `NoSsr` because `Next.js` does not currently support `i18n` static `export`. The main implication is that only the English version of the page is built during `export` and translations are loaded dynamically.
- Because of this limitation, the language pages are implemented using `react-router-dom` `HashRouter` rather than `next` router's `usePath` or domain endpoints, which is less than ideal for SEO but in my view is better than the alternative (no static export).
- The hosting environment (IPFS) can't produce responsive headers so that limits some interaction options. For example, the app can't perform an [Accept-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language)/[Content-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language) negotiation or respond to [Clear-Site-Data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data).

## Thank You

Huge thanks to both [@aulneau](https://github.com/aulneau) and [@hstove](https://github.com/hstove) for helping get these elements working together nicely. Many thanks also to the countless others on the Interwebs, too numerous to individually cite, links to whom I tried to remember to embed within comments of the relevant area of the codebase.
