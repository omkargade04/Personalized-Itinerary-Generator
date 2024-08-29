import { KeyService } from "../services/key.service";

export class KeyController {
  private keyService: KeyService;

  constructor() {
    this.keyService = new KeyService();
  }

  async keyGenerate(req: any, res: any) {
    const user_id = req.user._id;
    try {
      const data = await this.keyService.generateKeyRateLimit(user_id);
      return res
        .status(201)
        .json({ message: data.message, success: true, data: data.data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error creating API Key", success: false });
    }
  }

  async rateLimiting(req: any, res: any) {
    const user_id = req.user._id;
    try {
      const data = await this.keyService.rateLimitKey(user_id);
      if(data.status === 429) {
        return res
        .status(429)
        .json({ message: data.message, success: true, status: data.status });
      }
      return res
        .status(201)
        .json({ message: data.message, success: true, data: data.data });
    } catch (err: any) {
      console.log("Error: ", err);
      res.status(500).json({ message: "Error rate limit", success: false });
    }
  }
}
