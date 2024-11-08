import { Cloudy } from "lucide-react";

type HeaderProps = {
  label: string;
};

export const K8sHeader = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex-col items-center justify-center">
      <h1 className="flex text-3xl font-semibold">
        <Cloudy className="mr-2 h-8 w-8" />
        k8s Testing Tools
      </h1>
      <p className="text-muted-foreground text-sm pt-2">{label}</p>
    </div>
  );
};

export default K8sHeader;
