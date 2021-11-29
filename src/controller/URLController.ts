import { config } from "../config/Constants";
import { Request, Response } from "express";
import shortId from "shortid";
import { URLModel } from "../database/model/URL";

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;
    const url = await URLModel.findOne({ originURL });
    if (url) {
      res.json(url);
      return;
    }
    const hash = shortId.generate();
    const shortURL = `${config.API_URI}/${hash}`;
    const newURL = await URLModel.create({ hash, shortURL, originURL });
    res.json({ newURL });
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;
    const url = await URLModel.findOne({ hash });

    if (url) {
      res.redirect(url.originURL);
      return;
    }

    res.status(400).json({ error: "Url not found" });
  }
}
