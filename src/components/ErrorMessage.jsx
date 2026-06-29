export default function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center py-16 text-center gap-2">
      <span className="text-3xl">⚠️</span>
      <p className="text-red-600 font-medium">{message || 'Something went wrong.'}</p>
    </div>
  );
}
