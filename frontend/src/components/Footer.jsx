export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Built for Digital Heroes Training Task
          </p>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
          >
            digitalheroesco.com
          </a>
        </div>
      </div>
    </footer>
  );
}
