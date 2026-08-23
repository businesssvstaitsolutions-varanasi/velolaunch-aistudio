import { FormEvent, useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function BookingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [selected, setSelected] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelected(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setDate("");
      setTime("10:00");
      setSelected(false);
    }
    onOpenChange(nextOpen);
  };

  return <Dialog open={open} onOpenChange={handleOpenChange}>
    <DialogContent className="booking-dialog" aria-describedby="booking-copy">
      <div className="booking-dialog-kicker"><CalendarDays size={16} aria-hidden="true" /> Call planning</div>
      <DialogTitle>Book a Call</DialogTitle>
      <p id="booking-copy">Choose a preferred date and time window. This is a planning preview; a call is confirmed only after the VeloLaunch team follows up.</p>
      {selected ? <div className="booking-selection" role="status"><strong>Preferred time selected.</strong><span>{date ? `${date} at ${time}` : `Preferred time: ${time}`}</span><a href="#contact" onClick={() => handleOpenChange(false)}>Continue to project enquiry <ArrowUpRight size={14} aria-hidden="true" /></a></div> : <form onSubmit={submit}>
        <label htmlFor="booking-date"><span>Date</span><input id="booking-date" type="date" value={date} onChange={event => setDate(event.target.value)} required /></label>
        <label htmlFor="booking-time"><span>Preferred time</span><select id="booking-time" value={time} onChange={event => setTime(event.target.value)}><option value="09:00">09:00</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option></select></label>
        <Button type="submit" className="button-ink"><CalendarDays size={15} aria-hidden="true" />Choose this time</Button>
      </form>}
    </DialogContent>
  </Dialog>;
}
