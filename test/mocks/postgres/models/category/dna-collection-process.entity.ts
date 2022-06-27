import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dna_collection_process' })
export class DNACollectionProcess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  collectionProcess: string;

  @Column()
  link: string;

  @Column()
  created_at: Date;
}
