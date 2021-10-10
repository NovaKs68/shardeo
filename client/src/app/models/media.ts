export class Media {
  id_media!: number;
  title!: string;
  name_file!: string;
  description_media!: string;
  upload_date!: Date;
  number_view!: number;
  number_like!: number;
  id_user!: number;
  themes?: string[];
}
