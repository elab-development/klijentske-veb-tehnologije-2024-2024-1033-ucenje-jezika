export class SephoraProduct {
  public brandName: string;
  public displayName: string;
  public altImage: string;
  public heroImage: string;
  public url: string;

  constructor(
    brandName: string,
    displayName: string,
    altImage: string,
    heroImage: string,
    url: string
  ) {
    this.brandName = brandName;
    this.displayName = displayName;
    this.altImage = altImage;
    this.heroImage = heroImage;
    this.url = url;
  }
}
