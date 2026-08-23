import { ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

type ConsultationStatus = "new" | "reviewing" | "closed";

function OperationsContent() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const consultations = trpc.consultations.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const updateStatus = trpc.consultations.updateStatus.useMutation({
    onSuccess: () => utils.consultations.list.invalidate(),
  });

  if (loading) return <div className="operations-state">Validating access…</div>;

  if (user?.role !== "admin") {
    return (
      <section className="operations-state operations-denied">
        <ShieldCheck size={22} aria-hidden="true" />
        <p>Operations access is limited to VeloLaunch administrators.</p>
        <a href="/" className="text-link"><ArrowLeft size={15} aria-hidden="true" /> Return to the public site</a>
      </section>
    );
  }

  return (
    <section className="operations-page" aria-labelledby="operations-title">
      <header className="operations-header">
        <div>
          <div className="section-index"><span className="section-index-dot" /><span>VL / Operations</span></div>
          <h1 id="operations-title">Conversation queue</h1>
          <p>Incoming discovery context is protected behind the operator role. Update status without exposing lead data on the public surface.</p>
        </div>
        <Button type="button" variant="outline" className="button-secondary" onClick={() => consultations.refetch()} disabled={consultations.isFetching}>
          <RefreshCw size={15} className={consultations.isFetching ? "spin" : ""} aria-hidden="true" /> Refresh
        </Button>
      </header>

      {consultations.isLoading ? <div className="operations-state">Loading the queue…</div> : null}
      {consultations.error ? <div className="operations-state">The queue could not be loaded. Try again shortly.</div> : null}
      {consultations.data?.length === 0 ? <div className="operations-state">No discovery requests have arrived yet.</div> : null}

      {consultations.data?.length ? (
        <div className="operations-table-wrap">
          <table className="operations-table">
            <thead><tr><th>Received</th><th>Contact</th><th>Context</th><th>Status</th></tr></thead>
            <tbody>
              {consultations.data.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td><strong>{item.name}</strong><a href={`mailto:${item.email}`}>{item.email}</a></td>
                  <td>{item.scope}</td>
                  <td>
                    <select
                      value={item.status}
                      aria-label={`Update status for ${item.name}`}
                      onChange={(event) => updateStatus.mutate({ id: item.id, status: event.target.value as ConsultationStatus })}
                      disabled={updateStatus.isPending}
                    >
                      <option value="new">New</option><option value="reviewing">Reviewing</option><option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default function Operations() {
  return <DashboardLayout><OperationsContent /></DashboardLayout>;
}
