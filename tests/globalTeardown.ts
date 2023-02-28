import { closeDB } from "Shared/infra/persistence/mongo/init";

export default async () => {
  closeDB();
};
