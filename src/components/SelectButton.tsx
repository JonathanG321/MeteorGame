type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected: boolean;
  title: string;
};

export default function SelectButton({ isSelected, onClick, title }: Props) {
  return (
    <button className="mr-2 flex w-31 justify-end" onClick={onClick}>
      {isSelected && <div className="w-1/12">{">"}</div>}
      <div className="w-11/12">{title}</div>
    </button>
  );
}
