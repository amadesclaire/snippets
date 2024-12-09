import { parse, stringify } from "@std/yaml";

function yamlToJson(yaml: string): string {
  const jsonObject = parse(yaml);
  return JSON.stringify(jsonObject, null, 2);
}

function jsonToYaml(json: string): string {
  const jsonObject = JSON.parse(json);
  return stringify(jsonObject);
}

async function main() {
  const args = Deno.args;

  if (args.length < 2) {
    console.error("Usage: yamljson [yaml-to-json|json-to-yaml] <file>");
    Deno.exit(1);
  }

  const [command, filePath] = args;

  try {
    const fileContent = await Deno.readTextFile(filePath);

    let result;
    if (command === "yaml-to-json") {
      result = yamlToJson(fileContent);
    } else if (command === "json-to-yaml") {
      result = jsonToYaml(fileContent);
    } else {
      throw new Error(`Unknown command: ${command}`);
    }

    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("An unknown error occurred");
    }

    Deno.exit(1);
  }
}

await main();
