import express, { Router } from 'express';

export class MediaRoute {
  public path = '/media';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(
      this.path,
      express.static(process.env.FILE_UPLOADS_PATH, {
        cacheControl: true,
        maxAge: 259200000,
      }),
    );
  }
}
