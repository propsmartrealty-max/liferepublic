const fs = require('fs');
let file = 'src/components/ui/GlobalErrorBoundary.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /public static getDerivedStateFromError\(_: Error\): State {\n    return { hasError: true };\n  }/g,
    \`public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }\`
);

content = content.replace(
    /interface State {\n  hasError: boolean;\n}/g,
    \`interface State {
  hasError: boolean;
  error?: Error;
}\`
);

content = content.replace(
    /We\.ve encountered a temporary architectural glitch: \{this\.state\.error\?\.message \|\| this\.state\.error\?\.toString\(\)\} /g,
    \`We.ve encountered a temporary architectural glitch: {this.state.error?.message || 'Unknown Error'}\`
);

fs.writeFileSync(file, content);
