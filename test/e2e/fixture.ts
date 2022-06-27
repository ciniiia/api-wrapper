import { connectionRetries, dummyCredentials } from './config';
import { Connection, createConnection } from 'typeorm';
import { LabRating } from '../mocks/postgres/models/rating/rating.entity';
import { LocationEntities } from '../mocks/postgres/models/location';
import { TransactionRequest } from '../mocks/postgres/models/transaction-logging/transaction-request.entity';
import { DataStakingEvents } from '../mocks/postgres/models/bounty/data-staking-events.entity';
import { DataTokenToDatasetMapping } from '../mocks/postgres/models/bounty/data-token-to-dataset-mapping.entity';
import { EmailNotification } from '../mocks/postgres/models/database/email-notification.entity';
import { Country } from '../mocks/postgres/models/location/country.entity';
import { State } from '../mocks/postgres/models/location/state.entity';
import { City } from '../mocks/postgres/models/location/city.entity';
import { Reward } from '../mocks/postgres/models/reward/reward.entity';
import { EmrCategory } from '../mocks/postgres/models/category/emr.entity';
import { ServiceCategory } from '../mocks/postgres/models/category/service.entity';
import { SpecializationCategory } from '../mocks/postgres/models/category/specialization.entity';
import { DNACollectionProcess } from '../mocks/postgres/models/category/dna-collection-process.entity';
import { emrList } from '../mocks/postgres/models/category/emr.mock.data';
import { serviceList } from '../mocks/postgres/models/category/service.mock.data';
import { specializationList } from '../mocks/postgres/models/category/specialization.mock.data';
import { dnaCollectionProcessList } from "../mocks/postgres/models/category/dna-collection-process.data"

function initalPostgresConnection(): Promise<Connection> {
  return createConnection({
    ...dummyCredentials,
    database: 'postgres',
  });
}

module.exports = async () => {
  // Wait for database to open connection.
  console.log('Waiting for debio-postgres to resolve ⏰...');
  const mainConnection: Connection = await connectionRetries(
    initalPostgresConnection,
    40,
  );
  console.log('debio-postgres resolved! ✅');

  console.log('Building databases 🏗️...');
  await mainConnection.query(`CREATE DATABASE db_postgres;`);
  await mainConnection.query(`CREATE DATABASE db_location;`);
  await mainConnection.close();
  console.log('Database created successfully! 🏢');

  console.log('Beginning `db_postgres` migrations 🏇...');
  const dbPostgresMigration = await createConnection({
    ...dummyCredentials,
    database: 'db_postgres',
    entities: [
      Reward,
      LabRating,
      TransactionRequest,
      DataStakingEvents,
      DataTokenToDatasetMapping,
      EmailNotification,
      EmrCategory,
      ServiceCategory,
      SpecializationCategory,
      DNACollectionProcess,
    ],
    synchronize: true,
  });

  console.log('Injecting `EMR Category` into debio-postgres 💉...');

  await dbPostgresMigration
    .createQueryBuilder()
    .insert()
    .into(EmrCategory)
    .values(emrList)
    .execute();
  console.log('`EMR Category` data injection successful! ✅');

  console.log('Injecting `Service Category` into debio-postgres 💉...');
  await dbPostgresMigration
    .createQueryBuilder()
    .insert()
    .into(ServiceCategory)
    .values(serviceList)
    .execute();
  console.log('`Service Category` data injection successful! ✅');

  console.log('Injecting `Specialization Category` into debio-postgres 💉...');

  await dbPostgresMigration
    .createQueryBuilder()
    .insert()
    .into(SpecializationCategory)
    .values(specializationList)
    .execute();
  console.log('`Specialization Category` data injection successful! ✅');

  console.log('Injecting `DNA Collection Process List` into debio-postgres 💉...');

  await dbPostgresMigration
    .createQueryBuilder()
    .insert()
    .into(DNACollectionProcess)
    .values(dnaCollectionProcessList)
    .execute();
  console.log('`DNA Collection Process List` data injection successful! ✅');
  

  console.log('Injecting `Transaction Log` into debio-postgres 💉...');
  await dbPostgresMigration
    .createQueryBuilder()
    .insert()
    .into(TransactionRequest)
    .values({
      id: BigInt(1),
      address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      currency: 'DBIO',
      transaction_type: 4,
      amount: 50000,
      transaction_status: 20,
      created_at: new Date(),
      ref_number: '5FjqD9WgAS3DvxuZYNT7LX8jpPca3yfQXMWMtkmvN8kvFaSs',
      parent_id: BigInt(0),
      transaction_hash: '',
    })
    .execute();
  console.log('`Transaction Log` data injection successful! ✅');

  console.log('Injecting `Reward` into debio-postgres 💉...');
  await dbPostgresMigration
    .createQueryBuilder()
    .insert()
    .into(Reward)
    .values({
      address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      ref_number: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      reward_amount: 2,
      reward_type: 'Registered User',
      currency: 'DBIO',
      created_at: new Date(),
    })
    .execute();
  console.log('`Reward` data injection successful! ✅');

  console.log('Injecting `EmailNotification` into debio-postgres 💉...');
  await dbPostgresMigration
    .createQueryBuilder()
    .insert()
    .into(EmailNotification)
    .values({
      ref_number: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      notification_type: 'LabRegister',
      is_email_sent: false,
      created_at: new Date(),
      sent_at: new Date(),
    })
    .execute();
  console.log('`EmailNotification` data injection successful! ✅');

  await dbPostgresMigration.close();
  console.log('`db_postgres` migration successful! 🙌');

  console.log('Beginning `db_location` migrations 🏇...');
  const dbLocationMigration = await createConnection({
    name: 'dbLocation',
    ...dummyCredentials,
    database: 'db_location',
    entities: [...LocationEntities],
    synchronize: true,
  });

  console.log('Injecting `Country` into debio-postgres 💉...');
  await dbLocationMigration
    .createQueryBuilder()
    .insert()
    .into(Country)
    .values({
      id: 15,
      name: 'Burkina Faso',
      region: 'Africa',
      subregion: 'Western Africa',
      iso3: 'BFA',
      iso2: 'BF',
      latitude: 13.0,
      longitude: -2.0,
      numeric_code: 854,
      phone_code: '226',
      capital: 'Ouagadougou',
      currency: 'XOF',
      currency_symbol: 'CFA',
      tld: '.bf',
      native: 'Burkina Faso',
      timezones:
        '[{zoneName:"Africa/Ouagadougou",gmtOffset:0,gmtOffsetName:"UTCu00b100",abbreviation:"GMT",tzName:"Greenwich Mean Time"}]',
      emoji: '🇧🇫',
      emojiu: 'U+1F1E7 U+1F1EB',
    })
    .execute();
  console.log('`Country` data injection successful! ✅');

  console.log('Injecting `State` into debio-postgres 💉...');
  await dbLocationMigration
    .createQueryBuilder()
    .insert()
    .into(State)
    .values({
      id: 15,
      name: 'Bam Province',
      country_id: 15,
      country_code: 'BAM',
      state_code: '2',
      latitude: 47.1537165,
      longitude: 16.2688797,
    })
    .execute();
  console.log('`State` data injection successful! ✅');

  console.log('Injecting `City` into debio-postgres 💉...');
  await dbLocationMigration
    .createQueryBuilder()
    .insert()
    .into(City)
    .values({
      id: 1,
      name: 'Warmbad-Judendorf',
      state_id: 2057,
      state_code: '2',
      country_id: 15,
      country_code: 'BF',
      latitude: 46.60126,
      longitude: 13.82241,
    })
    .execute();
  console.log('`City` data injection successful! ✅');

  await dbLocationMigration.close();
  console.log('`db_location` migration successful! 🙌');
};
