import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'text' })
  chords: string;

  @Column({ type: 'text' })
  lyrics: string;
}
