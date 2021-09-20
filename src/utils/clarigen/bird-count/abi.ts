import { ClarityAbi } from '@clarigen/core';

// prettier-ignore
export const BirdCountInterface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [],
      "name": "decrement",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [],
      "name": "increment",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-counter",
      "outputs": {
        "type": "uint128"
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "variable",
      "name": "counter",
      "type": "uint128"
    }
  ]
};
