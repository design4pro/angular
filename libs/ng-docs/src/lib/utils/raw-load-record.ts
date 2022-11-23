import { rawLoad } from './raw-load';
import { DocsExample } from './types/page';

export async function rawLoadRecord(
  example: DocsExample
): Promise<Record<string, string>> {
  const processedContent: Record<string, string> = {};

  for (const [key, content] of Object.entries(example)) {
    if (content) {
      processedContent[key] = await rawLoad(content);
    }
  }

  return processedContent;
}
