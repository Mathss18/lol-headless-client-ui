export type DashboardPageProps = {
  state: {
    name: string;
  };
  setState: (id: string, state: any) => void;
};

export function DashboardPage({ state }: DashboardPageProps) {
  const sendMessage = async () => {
        // @ts-expect-error api is defined in preload
    const a = await window.api.LHCSendMessage({ message: "teste", jid: "49f9f9af-1f50-5427-a386-915b9914e8e2@br1.pvp.net/RC-1780326642" });
  };
  return (
    <div>
      {state.name}
      <button className="btn btn-primary" onClick={sendMessage}>
        SEND MESSAGE
      </button>
    </div>
  );
}
