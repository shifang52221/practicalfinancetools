const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];
const INDEX_EXTENSIONS = EXTENSIONS.map((ext) => `/index${ext}`);

function hasExtension(specifier) {
  const lastSlash = specifier.lastIndexOf("/");
  const lastDot = specifier.lastIndexOf(".");
  return lastDot > lastSlash;
}

async function tryResolveVariants(specifier, context, defaultResolve) {
  for (const ext of EXTENSIONS) {
    try {
      return await defaultResolve(`${specifier}${ext}`, context, defaultResolve);
    } catch {}
  }
  for (const suffix of INDEX_EXTENSIONS) {
    try {
      return await defaultResolve(`${specifier}${suffix}`, context, defaultResolve);
    } catch {}
  }
  return null;
}

export async function resolve(specifier, context, defaultResolve) {
  try {
    return await defaultResolve(specifier, context, defaultResolve);
  } catch (err) {
    if (specifier.startsWith(".") && !hasExtension(specifier)) {
      const resolved = await tryResolveVariants(specifier, context, defaultResolve);
      if (resolved) return resolved;
    }
    throw err;
  }
}

