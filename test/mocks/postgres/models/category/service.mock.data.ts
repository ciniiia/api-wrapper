import { ServiceCategory } from './service.entity';

export const serviceList: ServiceCategory[] = [
  {
    id: 1,
    service_categories: 'Single Gene',
    name: 'Single Gene',
    ticker: '$SNGL',
    created_at: new Date(),
    service_type: 'Genetic Testing',
  },
  {
    id: 2,
    service_categories: 'SNP Microarray',
    name: 'SNP Microarray',
    ticker: '$SNPM',
    created_at: new Date(),
    service_type: 'Genetic Testing',
  },
  {
    id: 3,
    service_categories: 'Targeted Gene Panel Sequencing',
    name: 'Targeted Gene Panel Sequencing',
    ticker: '$TGPS',
    created_at: new Date(),
    service_type: 'Genetic Testing',
  },
  {
    id: 4,
    service_categories: 'Whole Exome Sequencing',
    name: 'Whole Exome Sequencing',
    ticker: '$WES',
    created_at: new Date(),
    service_type: 'Genetic Testing',
  },
  {
    id: 5,
    service_categories: 'Whole Genome Sequencing',
    name: 'Whole Genome Sequencing',
    ticker: '$GENE',
    created_at: new Date(),
    service_type: 'Genetic Testing',
  },
  {
    id: 6,
    service_categories: 'Whole Transcriptome Sequencing',
    name: 'Whole Transcriptome Sequencing',
    ticker: '$WTS',
    created_at: new Date(),
    service_type: 'Genetic Testing',
  },
  {
    id: 7,
    service_categories: 'Pharmacogenomics',
    name: 'Pharmacogenomics',
    ticker: '$PHRM',
    created_at: new Date(),
    service_type: 'Genetic Testing',
  },
];
