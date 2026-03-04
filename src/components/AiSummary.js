export default function AiSummary({ summary }) {
  if (!summary) return null;

  return (
    <div className="mt-6 bg-gray-200 text-black p-4 rounded-lg shadow max-w-xl w-full">
      <h3 className="text-lg font-bold mb-2">
        🤖 AI Audience Sentiment
      </h3>

      <p className="whitespace-pre-line">
        {summary}
      </p>
    </div>
  );
}