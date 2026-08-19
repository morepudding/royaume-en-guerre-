import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

import { validateMissionDefinitions } from "../app/game/mission-validator.mjs";

async function loadMissionDefinitions() {
  const source = await readFile(new URL("../app/page.js", import.meta.url), "utf8");
  const match = source.match(/let n = ([\s\S]*?),\n  a = \{/);
  assert.ok(match, "mission definitions remain discoverable at the top of page.js");
  const sandbox = {};
  vm.runInNewContext(`let n = ${match[1]}; globalThis.result = s;`, sandbox);
  return sandbox.result;
}

test("all fifteen mission definitions have valid ids, roads and references", async () => {
  const missions = await loadMissionDefinitions();
  assert.equal(missions.length, 15);
  assert.deepEqual(validateMissionDefinitions(missions), []);
});
