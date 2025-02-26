const data: Record<string, { code: string; char: string }> = await fetch(
  "https://raw.githubusercontent.com/ryanoasis/nerd-fonts/refs/heads/master/glyphnames.json",
).then((r) => r.json());

const categories: Record<
  string,
  { code: string; char: string; name: string }[]
> = {};

for (const [k, v] of Object.entries(data)) {
  const [cat, name] = k.split("-");
  if (undefined === name) continue;
  if (!(cat in categories)) {
    categories[cat] = [];
  }
  categories[cat].push({ ...v, name });
}

for (const [cat, chars] of Object.entries(categories)) {
  Deno.writeTextFile(
    `${cat}.csv`,
    `codepoint,character,name\n${chars
      .map((c) => `${c.code},${c.char},${c.name}`)
      .join("\n")}`,
  );
}

export {};
