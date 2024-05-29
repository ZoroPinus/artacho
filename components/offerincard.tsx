import { ReactElement } from 'react';// Import Card component if not already imported
import { Card } from './ui/card';
type OfferingType = "tithes" | "thanksgivingOffering" | "birthdayOffering" | "others";

interface OfferingCardProps {
  title: string;
  offeringType: OfferingType;
  renderOfferingInputs: (type: OfferingType) => ReactElement[];
  renderTotalAmount: (type: string) => JSX.Element;
}

const OfferingCard: React.FC<OfferingCardProps> = ({ title, offeringType, renderOfferingInputs, renderTotalAmount }) => {
  return (
    <Card className="border-black rounded-lg text-center w-full p-4 mb-4">
      <h1 className="mb-4">{title}</h1>
      {renderOfferingInputs(offeringType)}
      {renderTotalAmount(offeringType)}
    </Card>
  );
}

export default OfferingCard;
