
interface ColumnStatusProps {
  status?: string;
}

export default function Approve({ status }: ColumnStatusProps) {
  switch (status) {
    case "pending":
      return (
        <>
          <div className="relative bg-red950/20 uppercase text-red950 flex items-center justify-center rounded-full w-24">
          <span className="absolute top-1.2 left-1 z-1 size-2 rounded-full bg-red950 inline">
              <span className="absolute -z-1 inline-flex size-full animate-ping rounded-full bg-red opacity-85"></span>
            </span>
            {status}
          </div>
        </>
      );
    case "approved":
      return (
        <>
          <div className="bg-primary/20 uppercase text-primary flex items-center justify-center rounded-full w-24">
            {status}
          </div>
        </>
      );
    default:
      return status;
  }
}
