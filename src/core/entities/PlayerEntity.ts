import { Body, BoxShape, Vec2, World } from "planck";
import type { User } from "../domain/user/User";
import type { Car } from "../domain/car/Car";
import type { PlayerStatus } from "../domain/race/PlayerStatus";
import type { PlayerRaceInfo } from "../domain/race/PlayerRaceInfo";
import type { PlayerData } from "../domain/race/PlayerData";

export interface PlayerEntityProps {
  socketId: string;
  user: User;
  world: World;
}

export class ServerPlayerEntity {
  private socketId: string;
  private user: User;
  private car: Car;
  private status: PlayerStatus;
  private playerRaceInfo: PlayerRaceInfo;
  private world: World;
  private body: Body;

  constructor(props: PlayerEntityProps) {
    this.socketId = props.socketId;
    this.world = props.world;
    this.body = this.world.createBody({
      type: 'dynamic',
      position: Vec2(0, 0),
      angle: 0,
      linearDamping: 0.5
    });
    this.body.createFixture({
      shape: new BoxShape(32, 32),
    });
    this.playerRaceInfo = {
      acceleration: 0,
      angle: -(Math.PI / 2),
      bestLapTime: 0,
      currentCheckpoint: 0,
      currentCheckpointTime: 0,
      currentLap: 0,
      currentLapTime: 0,
      position: { x: 200, y: 300 },
      racePosition: 0,
      velocity: 0,
    };
    this.status = "lobby";
    this.user = props.user;
    this.car = {
      color: "red",
      id: this.user.id!, // TODO: map car
      userId: this.user.id!,
    }
  }

  public getData(): PlayerData {
    // this.playerRaceInfo.angle = this.body.getAngle() * 180 / Math.PI;
    // this.playerRaceInfo.position.x = this.body.getPosition().x;
    // this.playerRaceInfo.position.y = this.body.getPosition().y;
    return {
      name: this.user.name,
      socketId: this.socketId,
      status: this.status,
      playerRaceInfo: this.playerRaceInfo,
    };
  }

  public getUserId(): number {
    return this.user.id!;
  }

  public getSocketId(): string {
    return this.socketId;
  }

  public setStatus(status: PlayerStatus) {
    this.status = status;
  }

  public getStatus(): PlayerStatus {
    return this.status;
  }

  public accelerate() {
    // const cosx = Math.cos(this.body.getAngle());
    // const sinx = Math.sin(this.body.getAngle());
    // const acc = 26;
    // this.body.applyLinearImpulse(
    //   Vec2(cosx * acc, sinx * acc),
    //   this.body.getWorldCenter(),
    // )
    const dx = Math.cos(this.playerRaceInfo.angle);
    const dy = Math.sin(this.playerRaceInfo.angle);
    this.playerRaceInfo.position.x += 5 * dx;
    this.playerRaceInfo.position.y += 5 * dy;
  }

  public turnLeft() {
    // const currentAngle = this.body.getAngle();
    // this.body.setAngle(currentAngle - 0.05);
    this.playerRaceInfo.angle -= 0.05;
  }

  public turnRight() {
    // const currentAngle = this.body.getAngle();
    // this.body.setAngle(currentAngle + 0.05);
    this.playerRaceInfo.angle += 0.05;
  }
}