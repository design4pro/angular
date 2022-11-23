import { RawLoaderContent } from './types/page';

export async function rawLoad(content: RawLoaderContent): Promise<string> {
  return content instanceof Promise ? (await content).default : content;
}
