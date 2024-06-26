import {JsonPath} from "@chainsafe/ssz";

/**
 * Serialize proof path to JSON.
 * @param paths `[["finalized_checkpoint", 0, "root", 12000]]`
 * @returns `['["finalized_checkpoint",0,"root",12000]']`
 */
export function querySerializeProofPathsArr(paths: JsonPath[]): string[] {
  return paths.map((path) => JSON.stringify(path));
}

/**
 * Deserialize JSON proof path to proof path
 * @param pathStrs `['["finalized_checkpoint",0,"root",12000]']`
 * @returns `[["finalized_checkpoint", 0, "root", 12000]]`
 */
export function queryParseProofPathsArr(pathStrs: string | string[]): JsonPath[] {
  if (Array.isArray(pathStrs)) {
    return pathStrs.map((pathStr) => queryParseProofPaths(pathStr));
  } else {
    return [queryParseProofPaths(pathStrs) as JsonPath];
  }
}

/**
 * Deserialize single JSON proof path to proof path
 * @param pathStr `'["finalized_checkpoint",0,"root",12000]'`
 * @returns `["finalized_checkpoint", 0, "root", 12000]`
 */
export function queryParseProofPaths(pathStr: string): JsonPath {
  const path = JSON.parse(pathStr) as JsonPath;

  if (!Array.isArray(path)) {
    throw Error("Proof pathStr is not an array");
  }

  for (let i = 0; i < path.length; i++) {
    const elType = typeof path[i];
    if (elType !== "string" && elType !== "number") {
      throw Error(`Proof pathStr[${i}] not string or number`);
    }
  }

  return path;
}
