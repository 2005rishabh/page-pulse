import ResultCard from './ResultCard';
import {
  Gauge,
  Clock,
  FileText,
  Heading1,
  Image,
  Type,
  AlertCircle
} from 'lucide-react';

export default function ResultGrid({ results }) {
  const getStatusColor = (status) => {
    if (status === 200) return 'green';
    if (status >= 300 && status < 400) return 'orange';
    if (status >= 400) return 'red';
    return 'blue';
  };

  const getResponseTimeColor = (time) => {
    if (time < 500) return 'green';
    if (time < 1500) return 'orange';
    return 'red';
  };

  const getAltBadge = (count) => {
    if (count === 0) {
      return {
        text: 'Excellent',
        color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
      };
    }
    return {
      text: 'Needs Attention',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
    };
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slideUp">
        {/* HTTP Status */}
        <ResultCard
          icon={Gauge}
          title="HTTP Status"
          value={results.httpStatus}
          color={getStatusColor(results.httpStatus)}
        />

        {/* Response Time */}
        <ResultCard
          icon={Clock}
          title="Response Time"
          value={`${results.responseTime}ms`}
          color={getResponseTimeColor(results.responseTime)}
        />

        {/* Page Title */}
        <ResultCard
          icon={FileText}
          title="Page Title"
          value={results.pageTitle || 'No title found'}
          color="blue"
        />

        {/* Meta Description */}
        <ResultCard
          icon={Type}
          title="Meta Description"
          value={results.metaDescription || 'No meta description found'}
          color="blue"
        />

        {/* H1 Count */}
        <ResultCard
          icon={Heading1}
          title="H1 Headings"
          value={results.h1Count}
          color="blue"
        />

        {/* Images without Alt */}
        <ResultCard
          icon={Image}
          title="Images Missing Alt"
          value={results.imagesWithoutAlt}
          badge={getAltBadge(results.imagesWithoutAlt)}
          color={results.imagesWithoutAlt === 0 ? 'green' : 'orange'}
        />

        {/* Word Count */}
        <ResultCard
          icon={AlertCircle}
          title="Word Count"
          value={`${results.wordCount} words`}
          color="blue"
        />
      </div>
    </div>
  );
}
