import { debioApiKey, debioTestUrl } from "../config";
import { emrList } from '../../mocks/postgres/models/category/emr.mock.data';
import { serviceList } from '../../mocks/postgres/models/category/service.mock.data';
import { specializationList } from '../../mocks/postgres/models/category/specialization.mock.data';
import { dnaCollectionProcessList } from "../../mocks/postgres/models/category/dna-collection-process.data";
import { specializationCategory, emrCategory, serviceCategory, dnaCollectionProcess } from "../../../src/endpoint/category" ;

describe('Specialization Category Storage API integration test', () => {
  it('endpoint should return', async () => {
    const result = await specializationCategory(debioTestUrl, debioApiKey, null);
    expect(result.status).toEqual(200);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: specializationList[0].category,
        }),
      ]),
    );
  })
})

describe('EMR Category Storage API integration test', () => {
  it('endpoint should return', async () => {
    const result = await emrCategory(debioTestUrl, debioApiKey, null);
    expect(result.status).toEqual(200);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: emrList[0].category,
        }),
      ]),
    );
  })
})

describe('Service Category Storage API integration test', () => {
  it(' endpoint should return', async () => {
    const result = await serviceCategory(debioTestUrl, debioApiKey, null);
    expect(result.status).toEqual(200);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          service_categories: serviceList[0].service_categories,
        }),
      ]),
    );
  })
})

describe('DNA Collection Process Storage API integration test', () => {
  it(' endpoint should return', async () => {
    const result = await dnaCollectionProcess(debioTestUrl, debioApiKey, null);
    expect(result.status).toEqual(200);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: dnaCollectionProcessList[0].name,
        }),
      ]),
    );
  })
})
