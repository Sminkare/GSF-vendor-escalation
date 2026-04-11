import { Check } from "lucide-react";

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface WorkflowStepperProps {
  steps: WorkflowStep[];
  currentStep: number;
}

export function WorkflowStepper({ steps, currentStep }: WorkflowStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center size-10 rounded-full border-2 transition-all ${
                  step.completed
                    ? "bg-green-600 border-green-600 text-white"
                    : currentStep === step.id
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {step.completed ? (
                  <Check className="size-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm">{step.title}</div>
                <div className="text-xs text-muted-foreground">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 ${
                  step.completed ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}