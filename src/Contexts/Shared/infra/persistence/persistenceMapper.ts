export type PersistenceDataMapper<DomainType, PersistenceType> = (
  data: PersistenceType
) => DomainType;
