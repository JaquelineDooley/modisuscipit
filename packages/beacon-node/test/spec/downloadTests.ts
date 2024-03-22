import {downloadTests} from "@lodestar/spec-test-util";
import {SPEC_TEST_LOCATION, SPEC_TEST_VERSION, SPEC_TEST_REPO_URL} from "./specTestVersioning.js";

/* eslint-disable no-console */

downloadTests(
  {
    specVersion: SPEC_TEST_VERSION,
    outputDir: SPEC_TEST_LOCATION,
    specTestsRepoUrl: SPEC_TEST_REPO_URL,
  },
  console.log
).catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
