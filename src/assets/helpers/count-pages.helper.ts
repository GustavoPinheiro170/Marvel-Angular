export class CountPages {

  public static countPage(total: number) : number {
    return Math.ceil(total / 12)
  }
}
