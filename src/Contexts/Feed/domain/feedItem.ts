export const ItemSourceValues = ["elPais", "elMundo"] as const;
export type ItemSource = typeof ItemSourceValues[number];

export class FeedItem {
  constructor(
    public id: string,
    public url: string,
    public source: ItemSource,
    public images: string[],
    public date: Date,
    public description?: string
  ) {}
}
