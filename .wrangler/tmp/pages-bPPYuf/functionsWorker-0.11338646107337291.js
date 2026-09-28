var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _middleware.ts
var onRequest = /* @__PURE__ */ __name(async (context) => {
  const url = new URL(context.request.url);
  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-XSS-Protection", "1; mode=block");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("Content-Security-Policy", "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; font-src 'self' https: data:;");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  const country = context.request.cf?.country || "Unknown";
  const city = context.request.cf?.city || "Unknown";
  headers.set("X-Edge-Country", typeof country === "string" ? country : "Unknown");
  headers.set("X-Edge-City", typeof city === "string" ? city : "Unknown");
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    let html = await response.text();
    html = html.replace(/<!--[\s\S]*?-->/g, "");
    html = html.replace(/>\s+</g, "><");
    html = html.replace(/\n/g, "");
    const path = url.pathname;
    let title = "Kolte Patil Life Republic Pune | Price, Projects, 2 & 3 BHK, Reviews";
    let desc = "Explore Kolte Patil Life Republic Pune near Hinjewadi. Compare current projects, 2 & 3 BHK homes, prices, floor plans, amenities, RERA details, location, connectivity and resale options.";
    if (path.includes("/projects/")) {
      const projectSlug = path.split("/").pop();
      title = `${projectSlug ? projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1).replace(/-/g, " ") : "Premium Project"} | Kolte Patil Life Republic`;
      desc = `Secure your future in our premium ${projectSlug} cluster. View exclusive layouts, exact pricing, and secure your site visit today.`;
    } else if (path === "/township-guide") {
      title = "390 Acre Township Guide | Life Republic Pune";
    } else if (path === "/amenities") {
      title = "World-Class Amenities | Life Republic Pune";
    } else if (path.startsWith("/search/")) {
      const siloSlug = path.split("/").pop() || "";
      const formattedSlug = siloSlug.replace(/-/g, " ").replace(/\w/g, (l) => l.toUpperCase());
      title = `${formattedSlug} | Life Republic Township Hinjewadi`;
      desc = `Find ${formattedSlug} directly at Kolte Patil Life Republic Township Hinjewadi. Access premium inventory, floor plans, and pricing for this high-ROI real estate location.`;
      const pseoSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": desc,
        "url": "https://" + url.hostname + path,
        "mainEntity": {
          "@type": "RealEstateListing",
          "name": formattedSlug,
          "description": `Premium real estate options for ${formattedSlug} within Kolte Patil Life Republic Township.`,
          "url": "https://" + url.hostname + path,
          "datePosted": (/* @__PURE__ */ new Date()).toISOString()
        }
      };
      schemaHtml = `
<script type="application/ld+json">
${JSON.stringify(pseoSchema, null, 2)}
<\/script>
`;
    }
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "RealEstateAgent",
          "@id": "https://" + url.hostname + "/#organization",
          "name": "Life Republic by Kolte-Patil",
          "legalName": "Kolte-Patil Developers Ltd",
          "description": "Life Republic is a 390-acre integrated township by Kolte-Patil Developers, located near Hinjewadi IT Park, Pune. Offering premium 2, 3, and 4 BHK residences.",
          "url": "https://" + url.hostname,
          "logo": "https://" + url.hostname + "/logo.webp",
          "image": "https://" + url.hostname + "/hero-new.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road, Taluka Mulshi",
            "addressLocality": "Pune",
            "postalCode": "411057",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "18.6185",
            "longitude": "73.7106"
          },
          "telephone": "+91-7744009295",
          "priceRange": "\u20B975 Lakhs - \u20B92.8 Cr"
        },
        {
          "@type": "Product",
          "@id": "https://" + url.hostname + "/#product",
          "name": "Kolte Patil Life Republic Township Hinjewadi",
          "description": "Premium 1, 2, 3 & 4 BHK apartments and luxury villas in a 390-acre integrated township in Hinjewadi, Pune.",
          "image": "https://liferepublic.in/hero-new.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Kolte Patil Developers"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "2145",
            "reviewCount": "1890"
          },
          "offers": {
            "@type": "AggregateOffer",
            "url": "https://" + url.hostname + "/projects",
            "priceCurrency": "INR",
            "lowPrice": "7500000",
            "highPrice": "35000000",
            "offerCount": "120"
          }
        }
      ]
    };
    if (!schemaHtml) {
      schemaHtml = `
<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
<\/script>
`;
    }
    if (path.includes("/projects/")) {
      const projectSlug = path.split("/").pop() || "";
      const projectName = projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1).replace(/-/g, " ");
      const realEstateSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ApartmentComplex",
            "@id": "https://" + url.hostname + path + "#complex",
            "name": "Life Republic " + projectName,
            "description": "Premium luxury residences at Life Republic " + projectName + " near Hinjewadi IT Park.",
            "url": "https://" + url.hostname + path,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "postalCode": "411057",
              "addressCountry": "IN"
            }
          },
          {
            "@type": "RealEstateListing",
            "name": "For Sale: " + projectName + " at Kolte Patil Life Republic",
            "description": "Newly launched premium apartments in Hinjewadi Phase 1.",
            "datePosted": (/* @__PURE__ */ new Date()).toISOString(),
            "url": "https://" + url.hostname + path,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "8900000",
              "businessFunction": "http://purl.org/goodrelations/v1#Sell",
              "itemOffered": {
                "@type": "Apartment",
                "name": "Premium Apartment in " + projectName,
                "numberOfRooms": 3,
                "floorSize": {
                  "@type": "QuantitativeValue",
                  "value": "1100",
                  "unitCode": "SQF"
                },
                "amenityFeature": [
                  { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
                  { "@type": "LocationFeatureSpecification", "name": "Gymnasium", "value": true },
                  { "@type": "LocationFeatureSpecification", "name": "24/7 Security", "value": true }
                ]
              }
            }
          }
        ]
      };
      schemaHtml = `
<script type="application/ld+json">
${JSON.stringify(realEstateSchema, null, 2)}
<\/script>
`;
    }
    const dynamicMeta = `
            <title>${title}</title>
            <meta name="description" content="${desc}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${desc}" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${desc}" />
            <link rel="canonical" href="https://${url.hostname}${url.pathname === "/" ? "" : url.pathname}" />
            <meta name="cf-edge-optimized" content="true" />
            <meta name="cf-edge-location" content="${city}, ${country}" />
            ${schemaHtml}
        `;
    html = html.replace(/<title>.*?<\/title>/gi, "");
    html = html.replace(/<meta name="description".*?>/gi, "");
    html = html.replace("</head>", `${dynamicMeta}</head>`);
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}, "onRequest");

// ../.wrangler/tmp/pages-bPPYuf/functionsRoutes-0.03872874544573468.mjs
var routes = [
  {
    routePath: "/",
    mountPath: "/",
    method: "",
    middlewares: [onRequest],
    modules: []
  }
];

// ../../../../.npm/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
