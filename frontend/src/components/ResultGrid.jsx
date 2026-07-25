import ResultCard from './ResultCard';

export default function ResultGrid({ results }) {
  if (!results) return null;

  const isFast = results.responseTime < 1500;
  const isHealthyStatus = results.httpStatus === 200;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. HTTP Status */}
      <ResultCard
        title="HTTP Status"
        value={`${results.httpStatus} ${isHealthyStatus ? 'OK' : 'Response'}`}
        valueColor={isHealthyStatus ? 'text-emerald-400' : 'text-amber-400'}
        badge={
          isHealthyStatus
            ? { label: '✓ Success', bg: 'rgba(6, 78, 59, 0.4)', text: '#34D399', border: 'rgba(52, 211, 153, 0.3)' }
            : { label: 'ⓘ Issue', bg: 'rgba(120, 53, 15, 0.4)', text: '#FBBF24', border: 'rgba(251, 191, 36, 0.3)' }
        }
        waveColor="#10B981"
      />

      {/* 2. Response Time */}
      <ResultCard
        title="Response Time"
        value={results.responseTime > 1000 ? `${(results.responseTime / 1000).toFixed(2)} s` : `${results.responseTime} ms`}
        valueColor={isFast ? 'text-white' : 'text-amber-400'}
        badge={
          isFast
            ? { label: '✓ Fast', bg: 'rgba(6, 78, 59, 0.4)', text: '#34D399', border: 'rgba(52, 211, 153, 0.3)' }
            : { label: '🕒 Slow', bg: 'rgba(120, 53, 15, 0.4)', text: '#FBBF24', border: 'rgba(251, 191, 36, 0.3)' }
        }
        subtitle={isFast ? 'Fast response time' : 'Network latency is high'}
        waveColor="#F59E0B"
      />

      {/* 3. Page Title */}
      <ResultCard
        title="Page Title"
        value={results.pageTitle || 'No page title found'}
        valueColor="text-[#60A5FA]"
        badge={
          results.pageTitle
            ? { label: 'ⓘ Title looks good', bg: 'rgba(30, 58, 138, 0.4)', text: '#93C5FD', border: 'rgba(147, 197, 253, 0.3)' }
            : { label: 'ⓘ Missing', bg: 'rgba(127, 29, 29, 0.4)', text: '#FCA5A5', border: 'rgba(252, 165, 165, 0.3)' }
        }
      />

      {/* 4. Meta Description */}
      <ResultCard
        title="Meta Description"
        value={results.metaDescription || 'No meta description found'}
        valueColor="text-white text-lg"
        badge={
          results.metaDescription
            ? { label: 'ⓘ Present', bg: 'rgba(30, 58, 138, 0.4)', text: '#93C5FD', border: 'rgba(147, 197, 253, 0.3)' }
            : { label: 'ⓘ Missing', bg: 'rgba(127, 29, 29, 0.4)', text: '#FCA5A5', border: 'rgba(252, 165, 165, 0.3)' }
        }
      />

      {/* 5. H1 Headings */}
      <ResultCard
        title="H1 Headings"
        value={results.h1Count}
        valueColor="text-white"
        watermark="H1"
        badge={{ label: '✓ Good', bg: 'rgba(30, 58, 138, 0.4)', text: '#93C5FD', border: 'rgba(147, 197, 253, 0.3)' }}
      />

      {/* 6. Images Missing Alt */}
      <ResultCard
        title="Images Missing Alt"
        value={results.imagesWithoutAlt}
        valueColor={results.imagesWithoutAlt === 0 ? 'text-white' : 'text-red-400'}
        badge={
          results.imagesWithoutAlt === 0
            ? { label: '✓ Excellent', bg: 'rgba(6, 78, 59, 0.4)', text: '#34D399', border: 'rgba(52, 211, 153, 0.3)' }
            : { label: 'ⓘ Needs Attention', bg: 'rgba(127, 29, 29, 0.4)', text: '#FCA5A5', border: 'rgba(252, 165, 165, 0.3)' }
        }
        subtitle="Add alt text to improve accessibility"
      />

      {/* 7. Word Count (Spans 2 columns on large screens to match reference layout) */}
      <div className="lg:col-span-2">
        <ResultCard
          title="Word Count"
          value={`${results.wordCount ? results.wordCount.toLocaleString() : 0} words`}
          valueColor="text-emerald-400"
          badge={{ label: '✓ Excellent', bg: 'rgba(6, 78, 59, 0.4)', text: '#34D399', border: 'rgba(52, 211, 153, 0.3)' }}
          subtitle="Good amount of content"
          sparkline={true}
        />
      </div>
    </div>
  );
}
