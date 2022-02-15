import { UrlApi } from "src/assets/enums/url.enum";
import { environment } from "src/environments/environment";

export class CreateUrlComic{

  public static characterComidId(characterId: number) {
    return `${UrlApi.url}/${characterId}/comics?`
  }

}
