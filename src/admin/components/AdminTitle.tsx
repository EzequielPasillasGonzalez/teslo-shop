interface Props {
  title: string;
  subttitle: string;
}

export const AdminTitle = ({ subttitle, title }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subttitle}</p>
    </div>
  );
};
