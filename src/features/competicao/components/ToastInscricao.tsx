type ToastInscricaoProps = {
  mensagem: string;
};

export function ToastInscricao({ mensagem }: ToastInscricaoProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] rounded-xl bg-[#166534] px-5 py-4 text-sm font-semibold text-white shadow-lg sm:bottom-6 sm:right-6"
    >
      {mensagem}
    </div>
  );
}
