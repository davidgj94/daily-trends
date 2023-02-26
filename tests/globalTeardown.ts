import { closeDB } from "src/Contexts/Shared/infra/persistence/mongo/init";

export default async () => {
  closeDB();
};
