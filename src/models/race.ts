import { model, Document, Schema } from 'mongoose';

type DBRace = {
  purse: number | null;
  type: string | null;
  raceNumber: number | null;
  raceName: string | null;
  url: string;
  date: string;
  meetingNumber: number | null;
  meetingName: string | null;
  runnersCount: number | null;
} & Document;

const RaceSchema = new Schema<DBRace>({
  purse: { type: Number },
  type: { type: String },
  raceNumber: { type: Number },
  date: { type: Date },
  raceName: { type: String },
  url: { type: String },
  meetingNumber: { type: Number },
  meetingName: { type: String },
  runnersCount: { type: Number },
});

export const RaceModel = model<DBRace>('Race', RaceSchema);
