export interface FormInputProps {
  image: string;
  tags: Array<TagProps>;
  description: string;
}

export interface TagProps {
  title: string;
  percentage: number;
}
