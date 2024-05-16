export type DashboardPageProps = {
  state: {
    name: string;
  };
  setState: (id: string, state: any) => void;
};

export function DashboardPage({ state }: DashboardPageProps) {
  return <div>{state.name}</div>;
}
