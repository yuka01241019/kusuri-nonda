"use client";

type MedicationEditPageProps = {
  params: {
    id: string;
  };
};

const MedicationEditPage = ({ params }: MedicationEditPageProps) => {
  return (
    <div>
      <h1>薬を編集</h1>
      <p>薬のID：{params.id}</p>
    </div>
  );
};

export default MedicationEditPage;
