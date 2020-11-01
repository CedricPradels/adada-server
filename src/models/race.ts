import { model, Document, Schema } from 'mongoose';

type DBRace = {
  allocation: number;
  discipline: string;
  raceNumber: number;
  raceName: string;
  meetingNumber: number;
  meetingName: string;
} & Document;

const RaceSchema = new Schema<DBRace>({
  allocation: { type: String },
  discipline: { type: String },
  raceNumber: { type: Number },
  raceName: { type: String },
  meetingNumber: { type: Number },
  meetingName: { type: String },
});

export const RaceModel = model<DBRace>('Race', RaceSchema);
