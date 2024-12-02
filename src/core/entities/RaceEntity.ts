import { World } from "planck";
import { ServerPlayerEntity } from "./PlayerEntity";
import type { RaceStatus } from "../domain/race/RaceStatus";
import type { ChatMessage } from "../domain/race/ChatMessage";
import crypto from "node:crypto";
import type { RaceData } from "../domain/race/RaceData";
import type { User } from "../domain/user/User";
import type { PlayerData } from "../domain/race/PlayerData";
import type { Checkpoint } from "../domain/race/Checkpoint";

const RACE_ITERATION_TIME = 1000 / 30;

export class RaceEntity {
  private id: string;
  private maxPlayers: number;
  private createdAt: Date;
  private status: RaceStatus;
  private chats: ChatMessage[];
  private world: World;
  private players: Record<string, ServerPlayerEntity>;
  private statusListener: Array<any>;
  private raceTimer: any;
  private checkpoints!: Checkpoint[];
  private laps: number = 3;

  constructor() {
    this.id = this.generateId();
    this.maxPlayers = 4;
    this.players = {};
    this.createdAt = new Date();
    this.status = "lobby";
    this.world = new World();
    this.chats = [];
    this.statusListener = [];
    this.createCheckpoints();
  }

  public getId() {
    return this.id;
  }

  public getData(): RaceData {
    return {
      id: this.id,
      maxPlayers: this.maxPlayers,
      players: this.getPlayersData(),
      createdAt: this.createdAt,
      status: this.status,
      chats: this.chats,
      checkpoints: this.checkpoints
    };
  }

  public hasUserId(userId: number): boolean {
    return Object.values(this.players).some((player) => player.getUserId() === userId);
  }

  public addPlayer(socketId: string, user: User) {
    const player = new ServerPlayerEntity({
      socketId,
      user,
      world: this.world,
    });
    this.players[socketId] = player;
  }

  public removePlayerByUserId(userId: number) {
    Object.keys(this.players).forEach((key) => {
      if (this.players[key].getUserId() === userId) {
        delete this.players[key];
      }
    });
  }

  public getPlayersCount(): number {
    return Object.keys(this.players).length;
  }

  public getPlayerBySocketId(socketId: string): ServerPlayerEntity | undefined {
    return this.players[socketId];
  }

  public getPlayerByUserId(userId: number): ServerPlayerEntity | undefined {
    for (const player of Object.values(this.players)) {
      if (player.getUserId() === userId) {
        return player;
      }
    }
  }

  public addChatMessage(message: ChatMessage) {
    this.chats.push(message);
  }

  public checkPlayersReady() {
    const playersReady = Object.values(this.players).every((player) => player.getStatus() === "ready");
    if (playersReady) {
      this.status = "ready";
    }
  }

  public checkPlayersInRace() {
    const playersReady = Object.values(this.players).every((player) => player.getStatus() === "inRace");
    if (playersReady) {
      this.status = "countdown";
    }
  }

  public checkPlayersRunning() {
    const playersReady = Object.values(this.players).every((player) => player.getStatus() === "running");
    if (playersReady) {
      this.status = "running";
    }
  }

  public getStatus(): RaceStatus {
    return this.status;
  }

  public iterate() {
    this.world.step(1 / 30);
  }

  private generateId(): string {
    return crypto.randomUUID();
  }

  private getPlayersData(): Record<string, PlayerData> {
    const playersData: Record<string, PlayerData> = {};
    Object.keys(this.players).forEach((key) => {
      playersData[key] = this.players[key].getData();
    });
    return playersData;
  }

  public startRace() {

    this.raceTimer = setInterval(() => {
      Object.values(this.players).forEach((player, index) => {

        // player.moveAll();
        player.move();

        this.validateCheckpointOverlap(player);
        // this.validatePositions()
      });

      this.notifyStatusChange();
    }, RACE_ITERATION_TIME);
  }

  public stopRace() {
    clearInterval(this.raceTimer);
  }

  public addStatusListener(callback: any) {
    this.statusListener.push(callback);
  }

  public notifyStatusChange() {
    this.statusListener.forEach((callback) => callback(this.getData()));
  }

  private createCheckpoints() {
    this.checkpoints = [
      { x: 100, y: 500, width: 170, height: 20, id: 0 },
      { x: 400, y: 70, width: 20, height: 140, id: 1 },
      { x: 750, y: 300, width: 170, height: 20, id: 2 },
      { x: 500, y: 600, width: 140, height: 20, id: 3 },
      { x: 750, y: 800, width: 170, height: 20, id: 4 },
      { x: 500, y: 800, width: 20, height: 140, id: 5 }
    ]
  }

  private validateCheckpointOverlap(player: ServerPlayerEntity) {
    for (let i = 0; i < this.checkpoints.length; i++) {
      if (
        player.getData().playerRaceInfo.position.x >= this.checkpoints[i].x &&
        player.getData().playerRaceInfo.position.x <= this.checkpoints[i].x + this.checkpoints[i].width &&
        player.getData().playerRaceInfo.position.y >= this.checkpoints[i].y &&
        player.getData().playerRaceInfo.position.y <= this.checkpoints[i].y + this.checkpoints[i].height
      ) {
        const id = this.checkpoints[i].id;

        // si el car pasa por el mismo checkpoint que ya esta, no hace nada
        if (id === player.getData().playerRaceInfo.currentCheckpoint) {
          return;
        }

        // si el car pasa por un checkpoint inmediatamente superior, avanza
        if (player.getData().playerRaceInfo.currentCheckpoint + 1 === id) {
          player.getData().playerRaceInfo.currentCheckpoint = id;
          player.getData().playerRaceInfo.currentCheckpointTime = new Date().getTime();
          return;
        }

        // si el car pasa por un checkpoint inmediatamente inferior, retrocede
        if (player.getData().playerRaceInfo.currentCheckpoint - 1 === id && id > 0) {
          player.getData().playerRaceInfo.currentCheckpoint = id;
          player.getData().playerRaceInfo.currentCheckpointTime = new Date().getTime();
          return;
        }

        // si el car pasa por la meta, y venia con el ultimo check, avanza de lap
        if (id === 0 && player.getData().playerRaceInfo.currentCheckpoint === this.checkpoints.length - 1) {
          player.getData().playerRaceInfo.currentLap++;
          player.getData().playerRaceInfo.currentCheckpoint = 0;
          player.getData().playerRaceInfo.currentCheckpointTime = new Date().getTime();

          if (player.getData().playerRaceInfo.currentLap >= this.laps) {
            player.setStatus('finished');
            // race.podium.push(car);
            if (this.status === "running") {
              this.status = "finished";
            }
          }

          // ACA TENEMOS QUE PONER LA CONDICION DE CORTE
          // if (race.podium.length === race.cars.length) {
          //   callback();
          // }

          return;
        }

        if (id === 0 && player.getData().playerRaceInfo.currentCheckpoint === 1) {
          player.getData().playerRaceInfo.currentLap -= 1;
          player.getData().playerRaceInfo.currentCheckpoint = this.checkpoints.length - 1;
          player.getData().playerRaceInfo.currentCheckpointTime = new Date().getTime();
          return;
        }

        const position = this.getCheckpointPosition(player.getData().playerRaceInfo.currentCheckpoint);
        player.getData().playerRaceInfo.position.x = position.x;
        player.getData().playerRaceInfo.position.y = position.y;
      }
    }
  }

  private getCheckpointPosition(currentCheckpoint: number) {
    return {
      x: this.checkpoints[currentCheckpoint].x,
      y: this.checkpoints[currentCheckpoint].y
    }
  }

  private validatePositions() {
    const players = Object.values(this.players);
    players.sort((b, a) => {
      return (a.getData().playerRaceInfo.currentLap - b.getData().playerRaceInfo.currentLap === 0 ?
        ((a.getData().playerRaceInfo.currentCheckpoint - b.getData().playerRaceInfo.currentCheckpoint) === 0
          ? b.getData().playerRaceInfo.currentCheckpointTime - a.getData().playerRaceInfo.currentCheckpointTime
          : a.getData().playerRaceInfo.currentCheckpoint - b.getData().playerRaceInfo.currentCheckpoint)
        : a.getData().playerRaceInfo.currentLap - b.getData().playerRaceInfo.currentLap);
    });
    players.forEach((player, index) => {
      player.getData().playerRaceInfo.racePosition = index;
    });
  }


}

