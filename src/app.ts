import express, { Express } from "express";
import { Server } from 'http'

export class App {
  app: Express
  server: Server
  port: number;
  constructor() {
    this.app = express();
    this.port = 8000;
  }

  useRouter() {
    // this.app.use('/users', {})
  }


  public async init() {
    this.useRouter();

    this.server = this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`)
    });

  }

}