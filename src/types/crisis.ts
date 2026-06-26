export interface RescueTask {
  time: string;
  task: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium';
  duration: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface Resource {
  title: string;
  type: 'Video' | 'Article' | 'Template' | 'Tool';
  url: string;
  reason: string;
}

export interface CrisisOutput {
  crisisTitle: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium';
  urgencyScore: number;
  timeRemaining: string;
  missionStatus: 'Recoverable' | 'At Risk' | 'Critical';
  missionObjective: string;
  immediateAction: string;
  rescuePlan: RescueTask[];
  successProbability: {
    withoutPlan: number;
    withPlan: number;
  };
  resources: Resource[];
}
