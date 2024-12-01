/* eslint-disable prettier/prettier */
export interface FxqlBlock {
currencyPair: string;
  buy: number;
  sell: number;
  cap: number;
}

export function parseFxqlStatement(statement: string): FxqlBlock[] {
  const blocks = statement.split(/\n\n/); // Split by double newline for each block
  const parsedData: FxqlBlock[] = [];

  for (const block of blocks) {
    const match = block.match(/^([A-Z]{3}-[A-Z]{3})\s*{\s*(.*)\s*}$/s);
    if (!match) {
      throw new Error(`Invalid block format: ${block}`);
    }

    const currencyPair = match[1];
    const content = match[2].trim();

    const buyMatch = content.match(/BUY\s+(\d+)/);
    const sellMatch = content.match(/SELL\s+(\d+)/);
    const capMatch = content.match(/CAP\s+(\d+)/);

    if (!buyMatch || !sellMatch || !capMatch) {
      throw new Error(`Missing required fields in block: ${block}`);
    }

    parsedData.push({
     currencyPair,
      buy: parseFloat(buyMatch[1]),
      sell: parseFloat(sellMatch[1]),
      cap: parseFloat(capMatch[1]),
    });
  }

  return parsedData;
}
